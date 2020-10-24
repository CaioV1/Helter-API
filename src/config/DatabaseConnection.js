const mongoose = require("mongoose");

class DatabaseConnection {

    constructor(){

        this.host = process.env.HOST;
        this.port = process.env.PORT;
        this.database = process.env.DATABASE;
        this.connectionString = `mongodb://${this.host}:${this.port}/${this.database}`

    }

    async connectDatabase(){

        try {

            await mongoose.connect(this.connectionString, {useNewUrlParser : true});
            this.connection = mongoose.connection;

            this.connection.once("open", () => console.log("\nConectado ao banco de dados"));
            
        } catch (error) {

            console.log("Erro na conexão com o banco")
            console.log(error)
            
        }

    }

}

module.exports = new DatabaseConnection();