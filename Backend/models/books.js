import mongoose from "mongoose";

const booksSchema = new mongoose.Schema ({
    name: String,
    author: String,
    yearPublication: String,
    pages: String,
    gender:String,
    price: Number,
    registerDate: { type: Date, default: Date.now }
});

const books = mongoose.model("books", booksSchema);

export default books