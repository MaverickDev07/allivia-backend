import express, { Application } from 'express';
import userRoutes from '../routes/users.routes';
import authRoutes from '../routes/auth.routes';
import medicalConsultationsRoutes from '../routes/medical.consultations.routes';
import cors from 'cors';
import db from '../database/connection';
import {socketController} from '../controllers/socket/socket.controller';

class ServerApp {

    private app: Application;
    private io:any;
    private http:any;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
        medical_consultations: '/api/medical-consultation'
    }

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.sequelizeConnectionDb();
        this.middleware();
        this.routes();

        this.http = require("http").Server(this.app);
        this.io = require("socket.io")(this.http,{
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
              }
        });
    }

  


    async sequelizeConnectionDb() {
        try {
            await db.authenticate();
            console.log("Base de datos conectada");
        } catch (error) {
            console.log(error);
        }
    }


    middleware() {
        //CORS
        this.app.use(cors({}));
        //Lectura del body
        this.app.use(express.json());
        // Carpeta publica
        this.app.use(express.static("public"));
    }


    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.medical_consultations, medicalConsultationsRoutes);
    }

    listen() {

     this.io.on('connection', socketController );
    

     this.http.listen(this.port, () => {
            console.log("Servidor corriendo en puerto: " + this.port)
        });
    }



}


export default ServerApp;