import * as socketio from "socket.io";
import { MedicalBackground } from "../../models/medical_background.model";
import { UserModel } from "../../models/user.model";


export const physicalTestUpdateSocket =async (payload: any,socket: socketio.Socket,user:UserModel | null) => {

  try {
  const {medical_background,}=payload;  

  const medicalBackgroundDB=await MedicalBackground.findByPk(Number(medical_background.id));
  medicalBackgroundDB!.cabeza=medical_background.cabeza,
  medicalBackgroundDB!.mini_mental_test=medical_background.mini_mental_test
  medicalBackgroundDB!.cuello=medical_background.cuello,
  medicalBackgroundDB!.torax_anterior=medical_background.torax_anterior,
  medicalBackgroundDB!.torax_posterior=medical_background.torax_posterior,
  medicalBackgroundDB!.abdomen=medical_background.abdomen,
  medicalBackgroundDB!.sistema_nervioso_perfiferico=medical_background.sistema_nervioso_perfiferico,
  medicalBackgroundDB!.sistema_nervioso_motor=medical_background.sistema_nervioso_motor,
  medicalBackgroundDB!.extremidades=medical_background.extremidades
  await medicalBackgroundDB!.save();

  socket.emit("operation-state",{
    error:false,
  });

  } catch (error) {
      console.log(error);
      socket.emit("operation-state",{
        error:true,
      });
  }
 


 

}