const server = require("./src/config/server.config");

const app = server.app;

app.get("/api", (_request, response) => {
  response.status(200).json({msg: "The server is running"});
});

app.listen(process.env.APP_PORT, () => {
  console.log("\nThe server is running on port 5000");
});
