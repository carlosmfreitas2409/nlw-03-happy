import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import AuthController from './controllers/AuthController';
import RestrictController from './controllers/RestrictController';

import { authMiddleware } from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.delete('/orphanages/:id', OrphanagesController.delete);

routes.post('/auth/register', AuthController.register);
routes.post('/auth/authenticate', AuthController.authenticate);

routes.get('/dashboard', [authMiddleware], RestrictController.hello);

export default routes;