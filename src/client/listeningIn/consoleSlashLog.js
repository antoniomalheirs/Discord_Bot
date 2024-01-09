const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Obtém a guilda da interação
    const guild = interaction.guild;

    // Aqui você pode usar guild para realizar operações específicas da guilda
    console.log(`Comando slash recebido na guilda: ${guild.name}`);

    // ... (Seu código de manipulação de comandos slash)
  },
};
