const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rollingdice")
    .setDescription("Responde com uma mensagem aleatória ao usuário"),

  async execute(interaction) {
    await interaction.reply({
      content:
        "Atualmente o Rei Macaco está de férias. Então vai caçar o que fazer demoro!!!",
      files: [
        "https://ogimg.infoglobo.com.br/economia/13519928-9af-bfc/FT1086A/0temp.jpg",
      ],
    });
  },
};
