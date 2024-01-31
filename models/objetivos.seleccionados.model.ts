
import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";
import { Goals } from "./objetivos.model";


export interface GoalsSelectedModel extends Model {
    id: number,
    creado: Date,
    modificado: Date,
    estado: string,
    objetivo: string,
}



export const GoalsSelected = db.define<GoalsSelectedModel>('app_objetivos_seleccionados', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement:true
    },
    creado:DataTypes.DATE,
    modificado:DataTypes.DATE,
    estado: DataTypes.STRING,
    id_objetivo:DataTypes.BIGINT,
    id_paciente :DataTypes.BIGINT,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_objetivos_seleccionados'
}
);

GoalsSelected.belongsTo(Goals, {
    foreignKey: 'id_objetivo',
  });
