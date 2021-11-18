import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import role from "./router/role.js"
import books from "./router/books.js";
import customers from "./router/customers.js";
import supplier from "./router/supplier.js";
dotenv.config();

const app = express();


app.use(express.json());

app.use(cors());
app.use("/api/books", books);
app.use("/api/role", role);
app.use("/api/customers", customers);
app.use("/api/supplier", supplier);

app.listen(process.env.PORT, () => console.log("Backend server running on port: " + process.env.PORT));

db.dbConnection();