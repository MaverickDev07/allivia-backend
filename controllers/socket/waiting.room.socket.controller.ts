import * as socketio from "socket.io";
import db from "../../database/connection";
import { dateTimeNowInitDay } from "../../helpers/date.helper";
import { urlPatientPhotoServer } from "../../helpers/url";
import { Allergies } from "../../models/ allergies.model";
import { AgendaCita } from "../../models/agenda.cita.model";
import { BaseDisease } from "../../models/base_disease.model";
import { Cancer } from "../../models/cancer.model";
import Doctor from "../../models/doctor.model";
import {   MedicalBackground} from "../../models/medical_background.model";
import { AllergyBackground, DiseaseBackground, FamilyBackground, SurgeryBackground, VaccineBackground } from "../../models/medical_background_relations";
import { Goals } from "../../models/objetivos.model";
import { GoalsSelected } from "../../models/objetivos.seleccionados.model";
import { Paciente } from "../../models/paciente.model";
import { Surgery } from "../../models/surgery.model";
import { User, UserModel } from "../../models/user.model";
import { Vaccine } from "../../models/vaccines.model";


export const waitingRoomRequestSocket = async (payload: any,socket: socketio.Socket,user:UserModel | null) => {
  
  try {
    const {limit}=payload;  
    const now=dateTimeNowInitDay();
    const doctor = await Doctor.findOne({where:{usuario_id:user?.usuario_id}});
    const rawQuery="SELECT id, CONCAT('"+urlPatientPhotoServer()+"/', foto) as foto,foto as path, nombre, edad, tipocita, fecha,fecha_fin, estadoconsulta, id_paciente, id_doctor, id_tipo_cita, id_antecedente_medico  FROM public.sala_espera_emr where id_doctor="+doctor?.id+" and id_tipo_cita=2 and estadoconsulta='Confirmada' and fecha>'"+now+"' order by fecha limit "+limit;
    const data = await db.query(rawQuery,);

    socket.emit("waiting-room",{
         data:data[0],
      });
  } catch (error) {
    console.log(error);
    socket.emit("waiting-room",{
        data:[]
     });
  }  
  

  

}




export const clinicHistoryRequestSocket = async (payload: any,socket: socketio.Socket,user:UserModel | null) => {

  try {
    const {medical_background_id,id_agenda}=payload;  
    

    const appointmentAgenda=await AgendaCita.findByPk(id_agenda);

    const medicalBackground=await MedicalBackground.findByPk(medical_background_id,{
      include:[
        {
          model:AllergyBackground
        },
        {
          model:VaccineBackground
        },
        {
          model:DiseaseBackground
        },
        {
          model:SurgeryBackground
        },
        {
          model:FamilyBackground
        }
      ]
    });

    const vaccines=await Vaccine.findAll({
      where:{
        eliminado:false
      }
    });

    const surgeries=await Surgery.findAll({
      where:{
        eliminado:false
      }
    });

    const allergies=await Allergies.findAll({
      where:{
        eliminado:false
      }
    });

    const baseDisease=await BaseDisease.findAll({
      where:{
        eliminado:false
      }
    });

    const cancer=await Cancer.findAll({
      where:{
        eliminado:false
      }
    });

  const goals=await Goals.findAll();
    
  const goalsSelected=await GoalsSelected.findAll({
     where:{
      id_paciente:BigInt(medicalBackground!.id_paciente)
     },
      include:[
        {
          model:Goals,
        },
      ]
    });

    
    const paciente=await Paciente.findByPk(Number(medicalBackground!.id_paciente),{
      include:[
        {
          model:User
        }
      ]
    });


    paciente!.app_usuario!.nombrearchivo=urlPatientPhotoServer()+"/"+paciente!.app_usuario.nombrearchivo;


    socket.emit("clinic-history-data",{
      medicalBackground,
      vaccines,
      surgeries,
      allergies,
      baseDisease,
      goals,
      goalsSelected,
      paciente,
      cancer,
      appointmentAgenda
      });

  } catch (error) {
    console.log(error);
    socket.emit("clinic-history-data",{
        data:[]
     });

  }  
  

  

}