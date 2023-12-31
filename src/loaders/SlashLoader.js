const path = require("node:path");
const fs = require("node:fs");
const { Collection, Events } = require("discord.js");

module.exports = class SlashLoader {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
  }

  async call() {
    try {
      await this.loadSlashCommands();
    } catch (err) {
      console.log(err);
    }

    console.log(
      `\x1b[1m\x1b[94m[SLASH COMANDOS]\x1b[0m`,
      `Comandos Slash Carregados e Operando.`
    );
  }

  async loadSlashCommands() {
    const commandsPath = path.join(__dirname, "../slash");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    //console.log(commandFiles);

    this.client.commands = new Collection();

    for (const comando of commandFiles) {
      const filePath = path.join(commandsPath, comando);
      const comand = require(filePath);
      //console.log(comand);

      if ("data" in comand && "execute" in comand) {
        this.commands.set(comand.data.name, comand);
      } else {
        console.log("Comando Errado");
      }

      this.client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if (!command) {
          console.log("Comando não encontrado");
          return;
        }

        try {
          await command.execute(interaction);
        } catch (error) {
          console.error(error);
          await interaction.reply("Erro, o comando falhou !!!");
        }
      });
    }
  }
};
