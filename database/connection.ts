import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
/* "development": {
        "username": "fgolbnwqpeapxi",
        "password": "f0af243ca4dfa0c25dd2d45051603d651f21b8f563ef0f2759ef2f1a33c69131",
        "database": "da7taf9mh7td8a",
        "host": "ec2-52-200-188-218.compute-1.amazonaws.com",
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }*/


const db = new Sequelize(process.env.DB as string, process.env.USERDB as string, process.env.PASSWORD as string, {
    host: process.env.HOST as string,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
     },
});

export default db;
