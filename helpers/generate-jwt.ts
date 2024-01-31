 import * as jwt from'jsonwebtoken';




const generateJWT=(id:number,username:string)=>{

    return new Promise((resolve,rejected)=>{
        const payload={id,username};
        const key:string=process.env.SECRETJWT || "";
        jwt.sign(payload,key,{expiresIn:'24h'},(err,token)=>{
            if(err){
                console.log(err);
                rejected("No se pudo generar token")
            }else{
                resolve(token);
            }

        });
    })

}


export default generateJWT;