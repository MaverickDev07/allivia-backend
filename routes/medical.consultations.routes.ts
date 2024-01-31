import { Router } from "express";
import { getWaitingRoom } from "../controllers/api/medical.consultations.controller";
import jwtValidation from "../middleware/jwt.middleware";

const router = Router();


router.get("/waiting-room",[
    jwtValidation,
], getWaitingRoom);


export default router;