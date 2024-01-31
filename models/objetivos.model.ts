import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/connection";


export interface GoalsModel extends Model {
    id: number,
    creado: Date,
    modificado: Date,
    estado: string,
    objetivo: string,
}



export const Goals = db.define<GoalsModel>('app_objetivos', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    creado: DataTypes.DATE,
    modificado: DataTypes.DATE,
    estado: DataTypes.STRING,
    objetivo: DataTypes.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_objetivos'
}
);


