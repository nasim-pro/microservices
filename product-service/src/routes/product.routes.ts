import { Router } from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, productList } from '../controllers/product.controller';

const router = Router();

// Define user routes
router.post('/', createProduct);
router.get('/:id', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', productList)

export default router;
