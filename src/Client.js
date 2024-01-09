const { Client, Collection, GatewayIntentBits } = require("discord.js");
const {
  EventLoader,
  DatabaseLoader,
  FunctionLoader,
  SlashLoader,
} = require("./loaders");

class DiscordBot extends Client {
  constructor() {
    super({
      intents: 8,
      failIfNotExists: false,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.commands = new Collection();
  }

  async start() {
    await new EventLoader(this).call(); // Carrega os Eventos
    await new DatabaseLoader(this).call(); // Carrega a Database
    await new FunctionLoader(this).call();
    const commands = await new SlashLoader(this).call(); // Carrega os comandos
    this.setCommands(commands);

    // Adicione outros inicializadores aqui, se necessário

    console.log("Bot está pronto para ser iniciado!");
    this.login(process.env.TOKEN);
  }

  setCommands(commands) {
    this.commands = commands;
  }

  getCommands() {
    return this.commands;
  }
}

const discordBot = new DiscordBot();

module.exports = discordBot;
