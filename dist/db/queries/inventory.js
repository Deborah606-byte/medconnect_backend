"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChpsInventory = exports.deleteChpsInventory = exports.fetchChpsInventory = exports.fetchInventoryById = exports.fetchInventories = exports.createInventory = void 0;
const inventory_1 = require("../models/inventory");
const createInventory = async (data) => await inventory_1.Inventory.create(data);
exports.createInventory = createInventory;
const fetchInventories = async (chpsId) => await inventory_1.Inventory.find({ chpsCompoundId: chpsId });
exports.fetchInventories = fetchInventories;
const fetchInventoryById = async (id) => await inventory_1.Inventory.findById(id);
exports.fetchInventoryById = fetchInventoryById;
const fetchChpsInventory = async (chpsId, id) => await inventory_1.Inventory.findOne({ chpsCompoundId: chpsId, _id: id });
exports.fetchChpsInventory = fetchChpsInventory;
const deleteChpsInventory = async (chpsId, id) => await inventory_1.Inventory.findOneAndDelete({ chpsCompoundId: chpsId, _id: id });
exports.deleteChpsInventory = deleteChpsInventory;
const updateChpsInventory = async (chpsId, id, data) => await inventory_1.Inventory.findOneAndUpdate({ chpsCompoundId: chpsId, _id: id }, data, {
    new: true,
});
exports.updateChpsInventory = updateChpsInventory;
