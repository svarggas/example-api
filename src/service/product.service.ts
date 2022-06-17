import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../model/product.model"

export const createProduct = (
    input: ProductInput
) => {
    return ProductModel.create(input);
}

export const findProduct = (
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
) => {
    return ProductModel.findOne(query, {}, options);
}

export const findAndUpdateProduct = (
    query: FilterQuery<ProductDocument>,
    updated: UpdateQuery<ProductDocument>, 
    options: QueryOptions,
) => {
    return ProductModel.findOneAndUpdate(query, updated, options);
}

export const deleteProduct = (
    query: FilterQuery<ProductDocument>,
) => {
    return ProductModel.deleteOne(query);
}