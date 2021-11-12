import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection with MongoDB: OK");
    } catch(e) {
        console.log("Error connection to MongoDB: \n" + e);
    }
};

export default { dbConnection };