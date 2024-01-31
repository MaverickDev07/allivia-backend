import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface SurgeryModel extends Model {
    id:          number,
    descripcion: string,
    eliminado:   boolean,
  }



  export const Surgery = db.define<SurgeryModel>('app_cirugia', {
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
    tableName: 'app_cirugia'
  }
);


