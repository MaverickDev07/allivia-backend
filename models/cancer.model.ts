import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface CancerModel extends Model {
    id:          number,
    descripcion: string,
    eliminado:   boolean,
  }



  export const Cancer = db.define<CancerModel>('app_cancer', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement:true,
    field: "id"
  },
  descripcion: DataTypes.TEXT,
  eliminado:DataTypes.BOOLEAN,
  }, {
    timestamps:true,
    freezeTableName: true,
    tableName: 'app_cancer'
  }
);


