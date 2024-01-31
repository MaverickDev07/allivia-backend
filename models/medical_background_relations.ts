import { DataTypes, Model } from "sequelize";
import db from "../database/connection";
import { MedicalBackground } from "./medical_background.model";
import { Paciente } from "./paciente.model";


export interface AllergyBackgroundModel extends Model {
    id:          BigInt,
    id_antecedente_medico:  BigInt,
    id_alergia: BigInt,
  }



  export const AllergyBackground = db.define<AllergyBackgroundModel>('app_antecedente_alergia', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  id_antecedente_medico:  DataTypes.BIGINT,
  id_alergia: DataTypes.BIGINT,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_alergia'
  }
);

export interface VaccineBackgroundModel extends Model {
    id:          BigInt,
    id_antecedente_medico:  BigInt,
    id_vacuna: BigInt,
    
  }



  export const VaccineBackground = db.define<VaccineBackgroundModel>('app_antecedente_vacuna', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  id_antecedente_medico:  DataTypes.BIGINT,
  id_vacuna: DataTypes.BIGINT,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_vacuna'
  }
);


export interface SurgeryBackgroundModel extends Model {
    id:          BigInt,
    id_antecedente_medico:  BigInt,
    id_cirugia: BigInt,
  }



  export const SurgeryBackground = db.define<SurgeryBackgroundModel>('app_antecedente_cirugia', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  id_antecedente_medico:  DataTypes.BIGINT,
  id_cirugia: DataTypes.BIGINT,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_cirugia'
  }
);

export interface DiseaseBackgroundModel extends Model {
    id:          BigInt,
    id_antecedente_medico:  BigInt,
    id_enfermedad_base: BigInt,
  }



  export const DiseaseBackground = db.define<DiseaseBackgroundModel>('app_antecedente_enfermedad_base', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  id_antecedente_medico:  DataTypes.BIGINT,
  id_enfermedad_base: DataTypes.BIGINT,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_enfermedad_base'
  }
);



export interface FamilyBackgroundModel extends Model {
    id:          BigInt,
    nombre:      string,
    diabetes :   number,
    cancer:string
    "enfemedadCorazon":boolean,
    hipertension:boolean,
    id_antecedente_medico:bigint,
    enfemedad_corazon:boolean,
    nuevo_valor_cancer?:     boolean;
  }



  export const FamilyBackground = db.define<FamilyBackgroundModel>('app_antecedente_familia', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre:DataTypes.TEXT,
  diabetes :DataTypes.INTEGER,
  cancer:DataTypes.TEXT,
  "enfemedadCorazon":DataTypes.BOOLEAN,
  hipertension:DataTypes.BOOLEAN,
  id_antecedente_medico:DataTypes.BIGINT,
  enfemedad_corazon:DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_familia'
  }
);




MedicalBackground.hasMany(VaccineBackground, {
    foreignKey: 'id_antecedente_medico'
  });


MedicalBackground.hasMany(AllergyBackground, {
    foreignKey: 'id_antecedente_medico'
});

MedicalBackground.hasMany(DiseaseBackground, {
    foreignKey: 'id_antecedente_medico'
  });

  
MedicalBackground.hasMany(SurgeryBackground, {
    foreignKey: 'id_antecedente_medico'
  });

MedicalBackground.hasMany(FamilyBackground, {
    foreignKey: 'id_antecedente_medico'
  });


MedicalBackground.belongsTo(Paciente, {
    foreignKey: 'id_paciente'
  });

