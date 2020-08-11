exports.connect = () => {

    const mongoose = require("mongoose");

    const connectionString = "mongodb://localhost:27017/db_visualupload";

    mongoose.connect(connectionString, {useNewUrlParser : true});
    const database = mongoose.connection;

    database.on("error", () => console.log("\nErro na conexão com o banco"));
    database.once("open", () => console.log("\nConectado ao banco de dados"));

}