require("dotenv").config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });
const express = require("express");
const cors = require("cors");

const corsConfig = require('../middleware/corsConfig.js');
const DatabaseConnection = require("./DatabaseConnection");

class Server {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware(){
    this.app.use(cors());
    this.app.use(express.static(__dirname.replace("/src/config", "") + "/public"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(corsConfig);

    const databaseConnection = new DatabaseConnection();
    databaseConnection.connectDatabase();
  }

  setupRoutes(){
    this.app.use(
      require("../routes/userRoute.js").router,
      require("../routes/audioRoute.js").router,
      require("../routes/bandRoute.js").router,
      require("../routes/artistRoute.js").router,
      require("../routes/recordRoute.js").router
    );
  }
}

module.exports = new Server();