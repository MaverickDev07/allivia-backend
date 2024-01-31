import dotenv from 'dotenv';
import ServerApp from './server/server';

//Configuracion dotenv
dotenv.config();


const server = new ServerApp();


server.listen();
