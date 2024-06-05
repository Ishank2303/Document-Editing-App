import mongoose from "mongoose";

const Connection = async (password = "documenteditingapp") => {
    const URL = `mongodb+srv://ishanksharma:${password}@document-editing-app.klpvbsl.mongodb.net/?retryWrites=true&w=majority&appName=document-Editing-App`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected to Mongoose");
    } catch (error) {
        console.log('Error connecting to database Server', error);
    }
};

export default Connection;
