const { Collection } = require("discord.js");
const { FileUtils } = require("../utils");

module.exports = class CommandLoader {
  constructor(client) {
    this.client = client;

    this.commands = new Collection();
  }

  async call() {
    try {
      await this.loadCommands();

      this.client.commands = this.commands;
    } catch (err) {
      console.log(err);
    }

    console.log(
      `\x1b[1m\x1b[96m[COMANDOS]\x1b[0m`,
      `Comandos Carregados e Operando.`
    );
  }

  async loadCommands() {
    FileUtils({ dir: "src/commands" }, (error, Command) => {
      if (error) console.log(error);

      const command = new Command(this.client);

      this.commands.set(command.name, command);
    });
  }
};
