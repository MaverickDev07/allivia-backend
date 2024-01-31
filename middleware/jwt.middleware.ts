import * as jwt from'jsonwebtoken';
import { Request, Response } from "express"
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';



const jwtValidation=(req: Request, res: Response, next: any) => {


    let bearerToken=req.header("authorization");

    if(bearerToken){
       bearerToken=bearerToken.split(" ")[1];
    }else{
        res.status(401).json(
            {
                msg:"no hay token en la peticion"
            }
        ); 
    }
   
  
  
    try {

    const data:JwtPayload =jwt.verify(bearerToken!,process.env.SECRETJWT || "") as JwtPayload;
    if(data.id){
        req.body.uid=data.id;
        req.params.uid=data.id;
    }
    
    
    next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json(
            {
                msg:"token no valido"
            }
        );
    }
    


}



export const jwtSocketValidation=(bearerToken='') => {

    try {

    const data:JwtPayload =jwt.verify(bearerToken!,process.env.SECRETJWT || "") as JwtPayload;
    return User.findByPk(data.id); 
    
    } catch (error) {
        return null;
    }
    


}


export default jwtValidation;