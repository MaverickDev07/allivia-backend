import { Router } from 'express';
import { check } from 'express-validator';
import { postLogin, renewToken } from '../controllers/api/auth.controller';
import appMiddleware from '../middleware/app.middleware';
import jwtValidation from '../middleware/jwt.middleware';


const router = Router();


router.post("/login", [
    check("email", "No pueden haber campos vacios en el formulario").notEmpty(),
    check("password", "No pueden haber campos vacios en el formulario").notEmpty(),
    appMiddleware
],postLogin);


router.post("/renew", [
    jwtValidation,
    appMiddleware
],renewToken);


export default router;