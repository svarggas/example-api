"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.findAndUpdateProduct = exports.findProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../model/product.model"));
const createProduct = (input) => {
    return product_model_1.default.create(input);
};
exports.createProduct = createProduct;
const findProduct = (query, options = { lean: true }) => {
    return product_model_1.default.findOne(query, {}, options);
};
exports.findProduct = findProduct;
const findAndUpdateProduct = (query, updated, options) => {
    return product_model_1.default.findOneAndUpdate(query, updated, options);
};
exports.findAndUpdateProduct = findAndUpdateProduct;
const deleteProduct = (query) => {
    return product_model_1.default.deleteOne(query);
};
exports.deleteProduct = deleteProduct;
