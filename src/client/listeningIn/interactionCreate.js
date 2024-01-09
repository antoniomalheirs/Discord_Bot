const { Events } = require("discord.js");
const discordBot = require("../../Client");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const commands = discordBot.getCommands();
    //console.log("Commands:", commands);

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(`Não existe nenhum comando com nome de: ${interaction.commandName}`);
      return;
    }

    try {
      console.log(`Executando comando: ${command.data.name}`);
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Erro ao executar comando",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Erro ao executar comando",
          ephemeral: true,
        });
      }
    }
  },
};
