import { Server } from "socket.io";
import Connection from "./database/db.js";
import { getDocument, updateDocument } from "./controller/document-controller.js";

const PORT = 9000;

Connection();

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000", // Corrected origin URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-documents", async (documentId) => {
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    // Listen for 'send-changes' event
    socket.on("send-changes", (delta) => {
      // Broadcasting changes to other clients
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // Listen for 'save-document' event within the context of the current documentId
    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
