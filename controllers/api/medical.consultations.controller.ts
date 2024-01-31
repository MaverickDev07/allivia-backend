
import { Request, Response } from "express"
import db from "../../database/connection";
import Doctor from "../../models/doctor.model";
import { User } from "../../models/user.model";


export const getWaitingRoom = async (req: Request, res: Response) => {

    const { uid } = req.body;
   
    try {
        const user = await User.findByPk(uid);
        const doctor = await Doctor.findOne({where:{usuario_id:user?.usuario_id}});
        const data = await db.query("SELECT * FROM sala_espera_emr where id_doctor="+doctor?.id+" order by fecha limit 6",);
        res.json(data); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error inesperado"
        });
    }
    
}