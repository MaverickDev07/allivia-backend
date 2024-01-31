import { UserModel } from "../../models/user.model";
import * as socketio from "socket.io";
import Doctor from "../../models/doctor.model";
import { urlPatientPhotoServer } from "../../helpers/url";
import db from "../../database/connection";

export const CalendarRequestSocket = async (payload: any,socket: socketio.Socket,user:UserModel | null) => {
   
    try {
        const {limit}=payload;  
        const doctor = await Doctor.findOne({where:{usuario_id:user?.usuario_id}});
        const data = await db.query("SELECT id, CONCAT('"+urlPatientPhotoServer()+"/', foto) as foto,foto as path, nombre, edad, tipocita, fecha,fecha_fin, estadoconsulta, id_paciente, id_doctor, id_tipo_cita, id_antecedente_medico  FROM public.sala_espera_emr where id_doctor="+doctor?.id+" and id_tipo_cita=2 and estadoconsulta='Confirmada' ",);
      
        socket.emit("calendar-data",{
             data:data[0],
          });
      } catch (error) {
        console.log(error);
        socket.emit("calendar-data",{
            data:[]
         });
      }  
}