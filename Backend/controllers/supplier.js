import supplier from "../models/supplier.js";

const registerSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete Data");

  const existingSupplier = await supplier.findOne({ name: req.body.name });
  if (existingSupplier)
    return res.status(400).send("Error: The supplier alrady exist");

  const supplierSchema = new supplier({
    name: req.body.name,
    adress: req.body.address,
  });

  const result = await supplierSchema.save();
  if (!result) return res.status(400).send("Failed to register supplier");

  return res.status(200).send({ result });
};

const listSupplier = async (req, res) => {
  const supplierSchema = await supplier.find();
  if (!supplierSchema || supplierSchema.length == 0)
    return res.status(400).send({ Error: "Empty supplier list" });
  return res.status(200).send({ supplierSchema });
};

const findSupplier = async (req, res) => {
  const supplierId = await supplier.findById({ _id: req.params["_id"] });
  return !supplierId
    ? res.status(400).send("No search results")
    : res.status(200).send({ supplierId });
};

const updateSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete data");

  const existingSupplier = await supplier.findOne({ name: req.body.name });
  if (existingSupplier)
    return res.status(400).send("Error: The supplier alrady exist");

  const supplierUpdate = await supplier.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    adress: req.body.address,
  });
};
const deleteSupplier = async (req, res) => {
  const supplierDelete = await supplier.findByIdAndDelete({
    _id: req.params["_id"],
  });

  return !supplierDelete
    ? res.status(400).send("Supplier no found")
    : res.status(200).send("Supplier deleted");
};
export default {
  registerSupplier,
  listSupplier,
  findSupplier,
  updateSupplier,
  deleteSupplier,
};
