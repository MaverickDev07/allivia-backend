import { UserModel } from "../../models/user.model";
import * as socketio from "socket.io";
import Doctor from "../../models/doctor.model";
import { urlPatientPhotoServer } from "../../helpers/url";
import db from "../../database/connection";

export const PatientsRequestSocket = async (payload: any,socket: socketio.Socket,user:UserModel | null) => {
   
    try {
        const {limit}=payload;  
        const doctor = await Doctor.findOne({where:{usuario_id:user?.usuario_id}});
        const data = await db.query("SELECT id_paciente, CONCAT('"+urlPatientPhotoServer()+"/', foto) as foto,foto as path, nombre,edad,id_doctor,id_antecedente_medico,ultimo_diagnostico   FROM public.doctor_paciente where id_doctor="+doctor?.id+"  ",);
      
        socket.emit("patients-data",{
             data:data[0],
          });
      } catch (error) {
        console.log(error);
        socket.emit("patients-data",{
            data:[]
         });
      }  
}