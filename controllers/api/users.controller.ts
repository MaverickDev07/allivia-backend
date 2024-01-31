import { Request, Response } from "express"
import { validationResult } from "express-validator";
import {User} from "../../models/user.model"
const bcript = require("bcrypt");


export const getUsers = async (req: Request, res: Response) => {

    try {
        const { limit = 2, page = 1 } = req.query;
        const [total, users] = await Promise.all([
            User.count(),
            User.findAll()
        ])
        res.json({ total, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado!"
        })
    }


}


export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
  
    const users = await User.findByPk(id);
    if (users) {
        res.json(users)
    } else {
        res.status(404).json({
            msg: "No existe el usuario : " + id
        })
    }

}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        
        const salt = bcript.genSaltSync();
        let { username, email, password,state} = body;
        password= bcript.hashSync(password, salt);
        const user = await User.create({ username, email, password,state});
        user.save();
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}


export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password,...cleanBody } = req.body;

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }

        
        if (password) {
            const salt = bcript.genSaltSync();
            cleanBody.password = bcript.hashSync(password, salt);
        }
       
        const user = await User.findByPk(id);
        user?.update(cleanBody);

        res.json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }




}


export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
    
        const user = await User.findByPk(id);
        await user!.update({ state: false });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



}

