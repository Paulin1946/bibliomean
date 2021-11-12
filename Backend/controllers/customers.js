import customers from "../models/customers.js";

const registerCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete Data");

  const existingCustomers = await customers.findOne({ name: req.body.name });
  if (existingCustomers)
    return res.status(400).send("Error: The customers alrady exist");

  const customersSchema = new customers({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dbstatus: true,
  });

  const result = await customersSchema.save();
  if (!result) return res.status(400).send("Failed to register customer");

  return res.status(200).send({ result });
};
const listCustomers = async (req, res) => {
  const customersSchema = await customers.find();
  if (!customersSchema || customersSchema.length == 0)
    return res.status(400).send({ Error: "Empty customers list" });
  return res.status(200).send({ customersSchema });
};
const findCustomers = async (req, res) => {
  const customersId = await customers.findById({ _id: req.params["_id"] });
  return !customersId
    ? res.status(400).send("No search results")
    : res.status(200).send({ customersId });
};
const updateCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  const existingCustomers = await customers.findOne({ name: req.body.name });
  if (existingCustomers)
    return res.status(400).send("Error: The customers alrady exist");

  const customersUpdate = await customers.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
};

const deleteCustomers = async (req, res) => {
  const booksCustomers = await customers.findByIdAndDelete({
    _id: req.params["_id"],
  });

  return !customersDelete
    ? res.status(400).send("Customers no found")
    : res.status(200).send("Customers deleted");
};

export default {
  registerCustomers,
  listCustomers,
  findCustomers,
  updateCustomers,
  deleteCustomers,
};
