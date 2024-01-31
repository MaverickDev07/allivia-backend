import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface MedicalBackgroundModel extends Model {
    id:                 bigint,
    genero:             string,
    fecha_nacimiento:   string,
    id_paciente:        bigint,
    fuma:               number,
    alcohol :           number,
    cafeina :           number,
    ejercicio :         number,
    drogas :            number,
    testifico :         boolean,
    mini_mental_test:   any,
    cabeza:             any,
    cuello:             any,
    torax_anterior:     any,
    torax_posterior:    any,
    abdomen:            any,
    sistema_nervioso_perfiferico:any,
    sistema_nervioso_motor:any,
    extremidades:any,
    categorizacion_paciente:string,
    app_paciente:any
  }



  export const MedicalBackground = db.define<MedicalBackgroundModel>('app_antecedente_medico', {
  id: {
       type: DataTypes.BIGINT,
       primaryKey: true,
       autoIncrement:true
      },
    genero:DataTypes.TEXT,
    fecha_nacimiento:DataTypes.TEXT,
    id_paciente:DataTypes.BIGINT,
    fuma:DataTypes.INTEGER,
    alcohol :DataTypes.INTEGER,
    cafeina :DataTypes.INTEGER,
    ejercicio :DataTypes.INTEGER,
    drogas :DataTypes.INTEGER,
    testifico :DataTypes.BOOLEAN,
    mini_mental_test:DataTypes.JSON,
    cabeza:DataTypes.JSON,
    cuello:DataTypes.JSON,
    torax_anterior:DataTypes.JSON,
    torax_posterior:DataTypes.JSON,
    abdomen:DataTypes.JSON,
    sistema_nervioso_perfiferico:DataTypes.JSON,
    sistema_nervioso_motor:DataTypes.JSON,
    extremidades:DataTypes.JSON,
    categorizacion_paciente:DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_medico'
  }
);


