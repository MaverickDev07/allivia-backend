import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


interface DoctorModel extends Model {
  id:number,
  usuario_id: number,
  descripcion: string,
  pais:string,
  adjunto:string,
  recomendacion:string,
  biografia:string,
  pacientes:string,
  experiencia: string,
  path: string,
  nombrearchivo:string,
  tipo_doctor:string
  }



const Doctor = db.define<DoctorModel>('app_doctor', {
  id:  {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  usuario_id: DataTypes.INTEGER,
  descripcion: DataTypes.TEXT,
  pais:DataTypes.TEXT,
  adjunto: DataTypes.TEXT,
  recomendacion:DataTypes.TEXT,
  biografia:DataTypes.TEXT,
  pacientes:DataTypes.TEXT,
  experiencia: DataTypes.TEXT,
  path: DataTypes.TEXT,
  nombrearchivo:DataTypes.TEXT,
  tipo_doctor:DataTypes.TEXT
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'app_doctor'
}
);

export default Doctor;