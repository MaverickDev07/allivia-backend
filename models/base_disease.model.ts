import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface BaseDiseaseModel extends Model {
    id:          number,
    descripcion: string,
    eliminado:   boolean,
  }



  export const BaseDisease = db.define<BaseDiseaseModel>('app_enfermedad_base', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement:true,
    field: "id"
  },
  descripcion: DataTypes.TEXT,
  eliminado:DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_enfermedad_base'
  }
);


