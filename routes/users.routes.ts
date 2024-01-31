import { Router } from "express";
import { check } from "express-validator";
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/api/users.controller";
import { existEmail, existUserId } from "../helpers/users-validators";
import appMiddleware from "../middleware/app.middleware";
import jwtValidation from "../middleware/jwt.middleware";


const router = Router();


router.get("/",[
    jwtValidation,
], getUsers);

router.get("/:id",[
    jwtValidation,
], getUser);


router.post("/", [
    jwtValidation,
    check("username", "El nombre es obligatorio").notEmpty(),
    check("password", "El password debe ser de mas de 6 letras").isLength({ min: 6 }),
    check("email").custom(existEmail),
    appMiddleware
], postUser);


router.put("/:id", [
    jwtValidation,
    check("email", "El campo debe ser un email valido").isEmail(),
    check("id").custom(existUserId),
    appMiddleware
], putUser);



router.delete("/:id", [
    jwtValidation,
    check("id").custom(existUserId),
    appMiddleware
], deleteUser);



export default router;