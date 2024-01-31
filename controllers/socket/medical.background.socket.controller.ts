import * as socketio from "socket.io";
import db from "../../database/connection";
import { Allergies } from "../../models/ allergies.model";
import { BaseDisease } from "../../models/base_disease.model";
import { Cancer, CancerModel } from "../../models/cancer.model";
import { MedicalBackground } from "../../models/medical_background.model";
import { AllergyBackground, AllergyBackgroundModel, DiseaseBackground, DiseaseBackgroundModel, FamilyBackground, FamilyBackgroundModel, SurgeryBackground, SurgeryBackgroundModel, VaccineBackground, VaccineBackgroundModel } from "../../models/medical_background_relations";
import { Surgery } from "../../models/surgery.model";
import { UserModel } from "../../models/user.model";
import { Vaccine } from "../../models/vaccines.model";



export const medicalBackgroundCLinicHistoryUpdateSocket = async (payload: any, socket: socketio.Socket, user: UserModel | null) => {
    const t = await db.transaction();

    try {
        const { medical_background } = payload;

        const vaccines: VaccineBackgroundModel[] = medical_background.app_antecedente_vacunas;
        const allergies: AllergyBackgroundModel[] = medical_background.app_antecedente_alergia;
        const baseDiseases: DiseaseBackgroundModel[] = medical_background.app_antecedente_enfermedad_bases;
        const surgeries: SurgeryBackgroundModel[] = medical_background.app_antecedente_cirugia;
        const familyBackground: FamilyBackgroundModel[] = medical_background.app_antecedente_familia;
        const nuevas_alergias = medical_background.nuevas_alergias;
        const nuevas_cirugia = medical_background.nuevas_cirugia;
        const nuevas_enfermedad_bases = medical_background.nuevas_enfermedad_bases;
        const nuevas_vacunas = medical_background.nuevas_vacunas;
        const medicalBackgroundDB = await MedicalBackground.findByPk(Number(medical_background.id));




        medicalBackgroundDB!.fecha_nacimiento = medical_background.fecha_nacimiento;
        medicalBackgroundDB!.genero = medical_background.genero;
        medicalBackgroundDB!.alcohol = medical_background.alcohol;
        medicalBackgroundDB!.fuma = medical_background.fuma;
        medicalBackgroundDB!.cafeina = medical_background.cafeina;
        medicalBackgroundDB!.ejercicio = medical_background.ejercicio;
        medicalBackgroundDB!.drogas = medical_background.drogas;
        await medicalBackgroundDB!.save({
            transaction: t
        });

        await VaccineBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });

        await AllergyBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });


        await SurgeryBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });

        await DiseaseBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });


        await FamilyBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            }
        });

        const [vaccinesNews, allergiesNews, surgeriesNews, baseDiseaseNews] = await Promise.all([
            Vaccine.bulkCreate(nuevas_vacunas, { transaction: t }),
            Allergies.bulkCreate(nuevas_alergias, { transaction: t }),
            Surgery.bulkCreate(nuevas_cirugia, { transaction: t }),
            BaseDisease.bulkCreate(nuevas_enfermedad_bases, { transaction: t }),
        ]);


        let vaccinesBackgroundNew: any[] = [];
        let allergiesBackgroundNew: any[] = [];
        let surgeriesBackgroundNew: any[] = [];
        let baseDiseaseBackgroundNew: any[] = [];

        vaccinesNews.forEach(element => {
            vaccinesBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_vacuna: element.id,
            });
        });


        allergiesNews.forEach(element => {
            allergiesBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_alergia: element.id,
            });
        });


        surgeriesNews.forEach(element => {
            surgeriesBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_cirugia: element.id,
            });
        });

        baseDiseaseNews.forEach(element => {
            baseDiseaseBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_enfermedad_base: element.id,
            });
        });

        let newCancer:any[]=[];
        familyBackground.forEach(element=>{
            if(element.nuevo_valor_cancer){
                newCancer.push({
                    descripcion:element.cancer,
                    eliminado:false
                })
            }
        });




        await Promise.all([
            VaccineBackground.bulkCreate(vaccines, { transaction: t }),
            AllergyBackground.bulkCreate(allergies, { transaction: t }),
            SurgeryBackground.bulkCreate(surgeries, { transaction: t }),
            DiseaseBackground.bulkCreate(baseDiseases, { transaction: t }),
            FamilyBackground.bulkCreate(familyBackground, { transaction: t }),
        ]);



        await Promise.all([
        VaccineBackground.bulkCreate(vaccinesBackgroundNew, { transaction: t }),
        AllergyBackground.bulkCreate(allergiesBackgroundNew, { transaction: t }),
        SurgeryBackground.bulkCreate(surgeriesBackgroundNew, { transaction: t }),
        DiseaseBackground.bulkCreate(baseDiseaseBackgroundNew, { transaction: t }),
        Cancer.bulkCreate(newCancer, { transaction: t }),
    ]);



        await t.commit();

        socket.emit("operation-state", {
            error: false,
        });



    } catch (error) {
        console.log(error);
        await t.rollback();
        socket.emit("operation-state", {
            error: true,
        });
    }




}




