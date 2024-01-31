import { validationResult } from "express-validator";
import * as express from "express"



const appMiddleware = (req: express.Request, res: express.Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    }

    next();
}



export default appMiddleware;