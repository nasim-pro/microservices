import Product from '../models/product.model';
import Logger from '../utils/logger';
import { Request, Response } from 'express';
import createLogger from '../utils/logger';
import eh from '../utils/errorHandler';

const logger = createLogger('ProductController');

interface IProduct {
    name: string;
    price: number;
    description: string;
    category?: string;
    stock?: number;
}
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, description, category, stock } = req.body as IProduct
        const product = new Product({ name, price, description, category, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error: any) {
        res.status(eh(error).statusCode).send(eh(error));
    }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw 404
        res.status(200).json(product);
    } catch (error: any) {
        logger.error(`Failed to get product: ${error.message}`);
        res.status(eh(error).statusCode).send(eh(error));
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            throw 404;
            return;
        }
        res.status(200).json(product);
    } catch (error: any) {
        logger.error(`Failed to update product: ${error.message}`);
        res.status(eh(error).statusCode).send(eh(error));
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) throw 404
        res.status(204).send();
    } catch (error: any) {
        logger.error(`Failed to delete product: ${error.message}`);
        res.status(eh(error).statusCode).send(eh(error));
    }
};

export const productList = async (req: Request, res: Response): Promise<void> => {
    try {
    const { page, pageSize } = req.query as any;
    const skip: number = (page - 1) * pageSize;
    const limit = pageSize;
    const products = await Product
        .find()
        .skip(skip)
        .limit(limit)
        .lean()
        .sort({ createdAt: -1 });
        res.status(200).send(products);
    } catch (err) {
        res.status(eh(err).statusCode).send(eh(err));
    }
}