const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("fun").setDescription("Faz vc rir"),

  async execute(interation) {
    await interation.reply("Burro");
  },
};