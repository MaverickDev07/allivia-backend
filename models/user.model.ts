import { DataTypes, Model} from "sequelize";
import db from "../database/connection";
import Doctor from "./doctor.model";

export interface UserModel extends Model {
  usuario_id:number
  usuario:string,
  descricpion: string,
  email:   string,
  nombre:  string,
  pin_password:string,
  nombrearchivo:string
  }



  export const User = db.define<UserModel>('app_usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  descricpion: DataTypes.TEXT,
  email:   DataTypes.TEXT,
  nombre:  DataTypes.TEXT,
  apellido: DataTypes.TEXT,
  carnet: DataTypes.TEXT,
  fecha_nacimiento: DataTypes.TEXT,
  path: DataTypes.TEXT,
  usuario: DataTypes.TEXT,
  pin_password: DataTypes.TEXT,
  estado: DataTypes.TEXT,
  creado:  DataTypes.DATE,
  creado_por: DataTypes.TEXT,
  modificado: DataTypes.DATE,
  modificado_por:DataTypes.TEXT,
  reestablecer_password:DataTypes.BOOLEAN,
  grupo_id: DataTypes.INTEGER,
  fecha_fin: DataTypes.DATE,
  tipo_autenticacion_id:DataTypes.INTEGER,
  password_valido_hasta: DataTypes.DATE,
  genero: DataTypes.CHAR,
  direccion:DataTypes.TEXT,
  telefono: DataTypes.TEXT,
  nombrearchivo:DataTypes.TEXT,
  id_device:  DataTypes.TEXT,
  revision: DataTypes.BOOLEAN,
  token: DataTypes.TEXT
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_usuario'
  }
);

User.hasOne(Doctor, {  
  foreignKey: {
    name: 'usuario_id'
  }
});



