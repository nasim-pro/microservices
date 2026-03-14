import Product from '../models/product.model';
import Logger from '../utils/logger';
import { Request, Response } from 'express';
import createLogger from '../utils/logger';
import eh from '../utils/errorHandler';

const logger = createLogger('UserController');

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        throw new Error('This is custom error')
        const user = new Product(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        res.status(eh(error).statusCode).send(eh(error));
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await Product.findById(req.params.id);
        if (!user) throw 404
        res.status(200).json(user);
    } catch (error: any) {
        logger.error(`Failed to get user: ${error.message}`);
        res.status(eh(error).statusCode).send(eh(error));
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            throw 404;
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        logger.error(`Failed to update user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await Product.findByIdAndDelete(req.params.id);
        if (!user) throw 404
        res.status(204).send();
    } catch (error: any) {
        logger.error(`Failed to delete user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
