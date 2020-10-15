const server = require("./src/config/Server");

const app = server.app;

//Rota padrão para verificar se o servidor está rodando
app.get("/api", (request, response) => {
  response.send("Servidor está rodando");
});

//Inicia o servidor
app.listen(5000, () => {
  console.log("\nO servidor está rodando na porta 5000");
});
