import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface VaccineModel extends Model {
    id:          number,
    descripcion: string,
    eliminado:   boolean,
  }



  export const Vaccine = db.define<VaccineModel>('app_vacuna', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement:true
  },
  descripcion: DataTypes.TEXT,
  eliminado:DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_vacuna'
  }
);


