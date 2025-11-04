import Product, { IProduct } from "../models/Product";
import { AppError } from "../utils/AppError";

export const getAllProducts = async (
  category?: string
): Promise<IProduct[]> => {
  const query = category ? { category } : {};
  return Product.find(query);
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(404, `Product with ID ${id} not found.`);
  }
  return product;
};
