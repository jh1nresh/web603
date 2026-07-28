const Inventory = require("../models/inventory.model");

function sendDatabaseError(res, message, error) {
  return res.status(500).json({
    message,
    error: error.message
  });
}

exports.createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create({
      prodname: req.body.prodname,
      qty: req.body.qty,
      price: req.body.price,
      status: req.body.status
    });

    return res.status(200).json(inventory);
  } catch (error) {
    return sendDatabaseError(res, "Failed to create inventory", error);
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).select("-__v");

    if (!inventory) {
      return res.status(404).json({
        message: `Inventory not found with id ${req.params.id}`
      });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: `Inventory not found with id ${req.params.id}`
      });
    }

    return sendDatabaseError(
      res,
      `Error retrieving inventory with id ${req.params.id}`,
      error
    );
  }
};

exports.inventories = async (_req, res) => {
  try {
    const inventoryItems = await Inventory.find().select("-__v");
    return res.status(200).json(inventoryItems);
  } catch (error) {
    return sendDatabaseError(res, "Error retrieving inventories", error);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.body._id,
      {
        prodname: req.body.prodname,
        qty: req.body.qty,
        price: req.body.price,
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    ).select("-__v");

    if (!inventory) {
      return res.status(404).json({
        message: `Inventory not found with id ${req.body._id}`
      });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: `Inventory not found with id ${req.body._id}`
      });
    }

    return sendDatabaseError(
      res,
      `Error updating inventory with id ${req.body._id}`,
      error
    );
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res.status(404).json({
        message: `Inventory not found with id ${req.params.id}`
      });
    }

    return res.status(200).json({});
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: `Inventory not found with id ${req.params.id}`
      });
    }

    return sendDatabaseError(
      res,
      `Error deleting inventory with id ${req.params.id}`,
      error
    );
  }
};
