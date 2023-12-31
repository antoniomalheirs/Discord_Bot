require("dotenv").config();

const Client = require("./src/Client");
const client = new Client();

client.IniciarBOTFUNCOES().login();

process
  .on("uncaughtException", (err) => console.log(err))

  .on("unhandledRejection", (err) => console.log(err));
