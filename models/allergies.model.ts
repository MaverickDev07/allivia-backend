import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface AllergiesModel extends Model {
    id:          string,
    descripcion: string,
    eliminado:   boolean,
  }



  export const Allergies = db.define<AllergiesModel>('app_alergia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  descripcion: DataTypes.TEXT,
  eliminado:DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_alergia'
  }
);


