import { Request, Response } from "express"
import {User} from "../../models/user.model"
import Doctor from "../../models/doctor.model"
import generateJWT from "../../helpers/generate-jwt";
import db from "../../database/connection";
import { urlDoctorPhotoServer } from "../../helpers/url";


export const postLogin = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const { email, password} = body;
        const user = await User.findOne({where:{email},include: [{
			model: Doctor,
		}]});

    
        if(!user){
            res.status(400).json({
                token:null,
                user:null,
                ok:false,
                errors: [
                    {
                        "msg": "Credenciales incorrectas",
                        "param": null,
                    }
                ]
            });
            return;  
        }
        const data:any = await db.query("select pin_password = crypt(CAST('"+password+"' AS TEXT), pin_password) as authentication FROM app_usuario WHERE email='"+email+"'",);
        
        const validPassword=data[0][0].authentication;
        if(!validPassword){
            res.status(400).json({
                token:null,
                user:null,
                ok:false,
                errors: [
                    {
                        "msg": "Credenciales incorrectas",
                        "param": null,
                    }
                ]
            });
            return;   
        }
    
        const token=await generateJWT(user!.usuario_id,user!.usuario);
        const ok=true;

        user.nombrearchivo=urlDoctorPhotoServer()+"/"+user.nombrearchivo;
        console.log(user.nombrearchivo);

        res.json({ok,token,user})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}


export const renewToken = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        const { uid} = body;
        const user = await User.findByPk(uid);

        if(!user){
            res.status(404).json({
                errors: [
                    {
                        "msg": "Usuario no encontrado",
                        "param": null,
                    }
                ]
            })  
        }

        const token=await generateJWT(user!.usuario_id,user!.usuario);
        res.json({user,token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}