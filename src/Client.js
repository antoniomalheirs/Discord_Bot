const { Client } = require("discord.js");
const {
  EventLoader,
  DatabaseLoader,
  CommandLoader,
  FunctionLoader,
  SlashLoader,
} = require("./loaders");

module.exports = class DISCORDBOT extends Client {
  constructor() {
    super({
      intents: 8,
      failIfNotExists: false,
    });
  }

  login() {
    super.login(process.env.TOKEN);
  }

  IniciarBOTFUNCOES() {
    new EventLoader(this).call(); // Carrega os Eventos
    new DatabaseLoader(this).call(); // Carrega a  Database
    new CommandLoader(this).call(); // Carrega os Comandos
    new FunctionLoader(this).call();
    new SlashLoader(this).call();

    return this;
  }
};
