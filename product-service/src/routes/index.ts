import { Router } from 'express';
import  userRoutes  from './product.routes'
import authenticate from '../middleware/auth';
const mainRouter = Router();

mainRouter.use('/products', authenticate, userRoutes);

export default mainRouter;