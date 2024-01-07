const { Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = class SlashLoader {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
  }

  async call() {
    try {
      await this.loadSlashCommands("../slash");
      console.log(
        `\x1b[1m\x1b[94m[SLASH COMANDOS]\x1b[0m`,
        `Comandos Slash Carregados e Operando.`
      );
      return this.commands;  // Retorna a coleção de comandos
    } catch (err) {
      console.log(err);
      return new Collection();  // Retorna uma coleção vazia em caso de erro
    }
  }

  async loadSlashCommands(pathh) {
    const commandsPath = path.join(__dirname, pathh);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const comando of commandFiles) {
      const filePath = path.join(commandsPath, comando);
      const comand = require(filePath);

      if ("data" in comand && "execute" in comand) {
        this.commands.set(comand.data.name, comand);
      } else {
        console.log("Comando Errado");
      }
    }
  }
};
