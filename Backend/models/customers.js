import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "roles" },
  dbstatus: Boolean,
  registerDate: { type: Date, default: Date.now },
});

const customers = mongoose.model("customers", customersSchema);

export default customers;
