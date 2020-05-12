import { Router } from 'express';
import usersRouter from './users.routes';
import orderServicesRouter from './orderServices.routes';
import productsRouter from './products.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/order-services', orderServicesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
