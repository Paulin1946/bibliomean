import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  supplierId: { type: mongoose.Schema.ObjectId, ref: "supplier" },
  dbstatus: Boolean,
  registerDate: { type: Date, default: Date.now },
});


const customers = mongoose.model("customers", customersSchema);

export default customers;
