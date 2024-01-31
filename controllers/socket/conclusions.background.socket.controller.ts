import * as socketio from "socket.io";
import db from "../../database/connection";
import { AgendaCita } from "../../models/agenda.cita.model";
import { ConclusionAgendaCita } from "../../models/conclusion_agenda_cita.model";
import { MedicalBackground } from "../../models/medical_background.model";
import { GoalsSelected } from "../../models/objetivos.seleccionados.model";
import { UserModel } from "../../models/user.model";



//fecha del dia actual
//finalizo sin exito finalizar

//app_conclusion_agenda_cita


export const conclusionBackgroundSocket =async (payload: any,socket: socketio.Socket,user:UserModel | null) => {
    const t = await db.transaction();
    const { conclusion }=payload;  
    try {

      
        const goalsSeleted:any[]=conclusion.customGoals as any[];
        const createObjects:any[]=[];

        await GoalsSelected.destroy({
        where: {
            id_paciente:BigInt(conclusion.id_paciente),
        },
        transaction:t
    });

        goalsSeleted.forEach(async element => {
            createObjects.push({
                creado: new Date(),
                modificado: new Date(),
                estado:element.estado,
                id_objetivo:BigInt(element.app_objetivo.id),
                id_paciente:BigInt(conclusion.id_paciente),
            })
        });

       await Promise.all([
        GoalsSelected.bulkCreate(createObjects, { transaction: t }),
         ]);

        const medicalBackgroundDB=await MedicalBackground.findByPk(Number(conclusion.id_antecendente));
        medicalBackgroundDB!.categorizacion_paciente=conclusion.state
        await medicalBackgroundDB!.save({
            transaction: t 
        });

        const agendaDb=await AgendaCita.findByPk(Number(conclusion.id_agenda_cita));
        agendaDb!.estadoconsulta='Finalizado';
        await agendaDb?.save({
            transaction: t 
        });

      const conclusionDb=await ConclusionAgendaCita.create({
            conclusion: conclusion.conclusion,
            estado_ingreso: conclusion.state_initial,
            estado_saliente: conclusion.state,
            id_agenda_cita: Number(conclusion.id_agenda_cita),
            id_antecedente_medico: Number(conclusion.id_antecendente),
        },{
            transaction: t 
        });

        await t.commit();
        socket.emit("operation-state",{
            error:false,
          });
    } catch (error) {
        await t.rollback();
        console.log(error,conclusion);
        socket.emit("operation-state",{
            error:true,
          });
    }
  
 

}