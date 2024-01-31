import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface SalaDeEsperaModel extends Model {
    id:             number,
    foto:           string,
    nombre:         string,
    edad:           number,
    tipocita:       string,
    fecha:          string,
    estadoconsulta: string,
    id_paciente:    number,
    id_doctor:      number
  }





