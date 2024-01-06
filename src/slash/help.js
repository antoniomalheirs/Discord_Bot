const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Exibe informações sobre todos os comandos"),

  async execute(interaction) {
    try {
      const userMention = interaction.user.toString();

      // Obtém todos os comandos registrados no servidor (guild)
      const guildId = interaction.guildId;
      const commands = await interaction.client.guilds.cache
        .get(guildId)
        .commands.fetch();

      // Construir a mensagem com informações sobre os comandos
      let message = `Aqui a lista de comandos para A Divina Liricidade ${userMention}!\n __**Comandos Disponíveis**__\n\n`;

      commands.forEach((command) => {
        message +=
          `**Comando: /${command.name}**\n` +
          `**Descrição:** ${command.description}\n` +
          `**Parâmetros:** ${
            command.options
              ? command.options
                  .map((option) => `${option.name}: ${option.description}`)
                  .join(", ")
              : "Nenhuma"
          }\n\n`;
      });

      // Construir o MessageEmbed com base no conteúdo da variável message
      const embed = new EmbedBuilder()
        .setColor("#dc143c") // Cor da Embed
        .setTitle("Comandos Disponíveis")
        .setDescription(message);

      // Responder ao usuário com o MessageEmbed
      await interaction.reply({ embeds: [embed.toJSON()] });
    } catch (error) {
      console.error("Erro ao exibir informações de ajuda:", error);
      await interaction.reply(
        "Ocorreu um erro ao exibir informações de ajuda."
      );
    }
  },
};
