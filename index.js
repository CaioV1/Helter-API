//Módulo com recursos para auxiliar o desenvolvimento de aplicações WEB
const express = require("express");
//Módulo de conversão do corpo de uma requisição
const bodyParser = require("body-parser");
const app = express();

//Extende os tipos de dados aceitos no corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
//Converte o corpo da requisição em JSON
app.use(bodyParser.json());

//Módulo de conexão com o banco de dados Mongo
const database = require("./model/dbConnectModel.js");
database.connect();

//Usando módulo com as rotas da API
app.use(require("./routes/userRoute.js").router);
app.use(require("./routes/audioRoute.js").router);
app.use(require("./routes/bandRoute.js").router);
app.use(require("./routes/artistRoute.js").router);
app.use(require("./routes/recordRoute.js").router);

//Rota padrão para verificar se o servidor está rodando
app.get("/api", (request, response) => {
  response.send("Servidor está rodando");
});

//Inicia o servidor
const server = app.listen(5000, () => {
  console.log("\nO servidor está rodando na porta 5000");
});
