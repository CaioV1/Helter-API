//require("dotenv").config();

require("dotenv").config({

    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"

});

//Módulo com recursos para auxiliar o desenvolvimento de aplicações WEB
const express = require("express");
//Módulo de conversão do corpo de uma requisição
const bodyParser = require("body-parser");
//Módulo para prover permissão de acesso
const cors = require("cors");
//Módulo de conexão com o banco de dados Mongo
const DatabaseConnection = require("./DatabaseConnection");

class Server {

    constructor() {

        this.app = express();

        this.setupMiddleware();
        this.setupRoutes();

    }

    setupMiddleware(){

        this.app.use(cors());

        //Prepara a aplicação para receber o corpo das requisições no formato x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //Prepara a aplicação para receber o corpo das requisições no formato JSON
        this.app.use(bodyParser.json());

        this.app.use((req, res, next) => {

            res.setHeader("Access-Control-Allow-Origin" , "*");
            res.setHeader("Access-Control-Allow-Methods" , "POST, PUT, GET, DELETE");
            res.setHeader("Access-Control-Allow-Headers" , "Content-Type");
            res.setHeader("Access-Control-Allow-Credentials" , true);
        
            next();
        
        });

        const databaseConnection = new DatabaseConnection();

        databaseConnection.connectDatabase();

    }

    setupRoutes(){

        //Usando módulo com as rotas da API
        this.app.use(require("../routes/userRoute.js").router);
        this.app.use(require("../routes/audioRoute.js").router);
        this.app.use(require("../routes/bandRoute.js").router);
        this.app.use(require("../routes/artistRoute.js").router);
        this.app.use(require("../routes/recordRoute.js").router);

    }

}

module.exports = new Server();