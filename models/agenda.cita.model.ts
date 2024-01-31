import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface AgendaCitaModel extends Model {
    id:          number,
    id_paciente: number,
    id_doctor : number,
    id_tipocita : number,
    id_pago: number,
    id_tipoconsulta: number,
    id_especialidad: number,
    fecha : string
    inicioconsulta: string
    finconsulta: string
    estadoconsulta : string
    motivoconsulta : string
    precio : number,
    motivocancelacion : string,
    tipoespecialidad : string,
    horario : string,
    reconsulta:boolean,
    fecharegistro: Date,
    nit_comprador: string,
    razon_social: string,
    tipo_agenda : string,
  }



  export const AgendaCita= db.define<AgendaCitaModel>('app_agendacita', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
    id_paciente: DataTypes.INTEGER,
    id_doctor : DataTypes.INTEGER,
    id_tipocita : DataTypes.INTEGER,
    id_pago: DataTypes.INTEGER,
    id_tipoconsulta: DataTypes.INTEGER,
    id_especialidad: DataTypes.INTEGER,
    fecha : DataTypes.STRING,
    inicioconsulta: DataTypes.STRING,
    finconsulta: DataTypes.STRING,
    estadoconsulta : DataTypes.STRING,
    motivoconsulta : DataTypes.STRING,
    precio : DataTypes.DOUBLE,
    motivocancelacion: DataTypes.STRING,
    tipoespecialidad : DataTypes.STRING,
    horario : DataTypes.STRING,
    reconsulta: DataTypes.BOOLEAN,
    fecharegistro: DataTypes.DATE,
    nit_comprador: DataTypes.STRING,
    razon_social : DataTypes.STRING,
    tipo_agenda : DataTypes.STRING,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_agendacita'
  }
);


