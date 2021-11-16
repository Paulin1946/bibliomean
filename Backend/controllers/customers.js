import customers from "../models/customers.js";
import supplier from "../models/supplier.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";


const registerCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete Data");

  const existingCustomers = await customers.findOne({ email: req.body.email });
  if (existingCustomers)
    return res.status(400).send({ message: "The customers alrady exist" });

  const hash = await bcrypt.hash(req.body.password, 10);

  const supplierName = await supplier.findOne({ name: "customers" });
  if (!supplier)
    return res.status(400).send({ message: "No  customers was assigned" });

  const customersRegister = new customers({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    supplierId: supplierName,
    dbstatus: true,
  });

  const result = await customersRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register customer" })
    : res.status(200).send({ result });
};
const listCustomers = async (req, res) => {
  const customersList = await customers.find();
  return customersList.length === 0
    ? res.status(400).send({ Error: "Empty customers list" })
    : res.status(200).send({ customersList });
};

const updateCustomers = async (req, res) => {
if (!req.body.name || !req.body.email || !req.body.supplierId)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const customersFind = await customers.findOne({ email: req.body.email });
    pass = customersFind.password;
  }

  const existingCustomers = await customers.findOne({
    name: req.body.name,
    email: req.body.email,
    supplierId: req.body.supplierId,
  });
  if (existingCustomers)
    return res.status(400).send({ message: "The customers alrady exist" });

  const customersUpdate = await customers.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    supplierId: req.body.supplierId,
  });

  return !customersUpdate
    ? res.status(400).send("Customers no found")
    : res.status(200).send("Customers deleted");
};

const deleteCustomers = async (req, res) => {
  const customersDelete = await customers.findByIdAndDelete({
    _id: req.params["_id"],
  });

  return !customersDelete
    ? res.status(400).send("Customers no found")
    : res.status(200).send("Customers deleted");
};

const findCustomers = async (req, res) => {
  const customersfind = await customers.findById({ _id: req.params["_id"] });
  return !customersfind
    ? res.status(400).send("No search results")
    : res.status(200).send({ customersfind });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const customersLogin = await customers.findOne({ email: req.body.email });
  if (!customersLogin)
    return res.status(400).send({ message: "wrong email or password" });
  const hash = await bcrypt.compare(req.body.password, customersLogin.password);

  if (!hash)
    return res.status(400).send({ message: "wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: customersLogin._id,
          name: customersLogin.name,
          supplierId: customersLogin.supplierId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};
export default {
  registerCustomers,
  listCustomers,
  findCustomers,
  updateCustomers,
  deleteCustomers,
  login,
};
