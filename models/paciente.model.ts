import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";
import { User, UserModel } from "./user.model";


export interface PacienteModel extends Model {
    id:          bigint,
    usuario_id :string,
    descripcion:string,
    app_usuario:UserModel;
  }



  export const Paciente = db.define<PacienteModel>('app_paciente', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  usuario_id:DataTypes.BIGINT,
  descripcion :DataTypes.STRING,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_paciente'
  }
);

Paciente.belongsTo(User, {
    foreignKey: 'usuario_id',
  });
