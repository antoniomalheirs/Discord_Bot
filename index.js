require("dotenv").config();
const discordBot = require("./src/Client");

(async () => {
  try {
    await discordBot.start();
  } catch (error) {
    console.error("Erro ao iniciar o bot:", error);
  }
})();

// Tratamento de exceções não capturadas
process.on("uncaughtException", (err) => {
  console.error("Exceção não capturada:", err);
  process.exit(1);
});

// Tratamento de rejeições não tratadas
process.on("unhandledRejection", (err) => {
  console.error("Rejeição não tratada:", err);
  process.exit(1);
});
