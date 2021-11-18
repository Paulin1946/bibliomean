import customers from "../models/customers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import role from "../models/role.js";

const registerCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete Data");

  const existingCustomers = await customers.findOne({ email: req.body.email });
  if (existingCustomers)
    return res.status(400).send({ message: "The customers alrady exist" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const roleId = await role.findOne({ name: "customers" });
  if (!role)
    return res.status(400).send({ message: "No  customers was assigned" });

  const customersRegister = new customers({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: roleId,
    dbstatus: true,
  });

  const result = await customersRegister.save();

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: resultLogin._id,
          name: resultLogin.name,
          roleId: resultLogin.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Register error" });
  }
};

const registerAdminCustomers = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingUser = await customers.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send({ message: "The user is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userRegister = new customers({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  const result = await userRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register user" })
    : res.status(200).send({ result });
};
const listCustomers = async (req, res) => {
  const customersList = await customers.find();
  return customersList.length === 0
    ? res.status(400).send({ Error: "Empty customers list" })
    : res.status(200).send({ customersList });
};

const updateCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.roleId)
    return res.status(400).send({ message: "Incomplete data" });

  const changeEmail = await user.findById({ _id: req.body._id });
  if (req.body.email !== changeEmail.email)
    return res
      .status(400)
      .send({ message: "The email should never be changed" });

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
    roleId: req.body.roleId,
  });
  if (existingCustomers)
    return res.status(400).send({ message: "The customers alrady exist" });

  const customersUpdate = await customers.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
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
          roleId: customersLogin.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" },);
  }
};
export default {
  registerCustomers,
  registerAdminCustomers,
  listCustomers,
  findCustomers,
  updateCustomers,
  deleteCustomers,
  login,
};
