import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface ConclusionAgendaCitaModel extends Model {
  id: number,
  conclusion: string,
  estado_ingreso: string,
  estado_saliente: string,
  id_agenda_cita: number,
  id_antecedente_medico: number,
}



export const ConclusionAgendaCita = db.define<ConclusionAgendaCitaModel>('app_conclusion_agenda_cita', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement:true
  },
  conclusion: DataTypes.TEXT,
  estado_ingreso: DataTypes.TEXT,
  estado_saliente: DataTypes.TEXT,
  id_agenda_cita: DataTypes.BIGINT,
  id_antecedente_medico: DataTypes.BIGINT,
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'app_conclusion_agenda_cita'
}
);


