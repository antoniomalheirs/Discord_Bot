const { Command, ClientEmbed } = require("../../");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(
      {
        name: "ping",
        aliases: ["pinga"],
        category: "Developer",
        usage: "mensagem",
      },
      client
    );
  }

  async run({ message, author }) {
    message.reply(
      "Operando e Gerenciando funções, para obter suporte digite: '/dv help'"
    );
  }
};
