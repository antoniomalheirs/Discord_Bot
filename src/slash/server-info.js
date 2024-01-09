const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Obtém informações sobre o servidor."),
  async execute(interaction) {
    try {
      // Informações sobre o servidor
      const serverName = interaction.guild.name;
      const serverCreationDate =
        interaction.guild.createdAt.toLocaleDateString();
      const totalMembers = interaction.guild.memberCount;
      const totalChannels = interaction.guild.channels.cache.size;

      // Informações sobre mensagens
      const totalServerMessages = await getTotalServerMessages(interaction);

      // Informações sobre voz
      const totalVoiceTime = getTotalVoiceTime(interaction);

      const content = `**Informações sobre o servidor ${serverName}** \`\`\`
 - Data de criação: ${serverCreationDate}
 - Número total de membros: ${totalMembers}
 - Número total de canais: ${totalChannels}
 - Número total de mensagens no servidor: ${totalServerMessages}
 - Tempo total em chamadas de voz: ${totalVoiceTime} minutos \`\`\``;

      const embed = new EmbedBuilder()
        .setColor("#dc143c") // Cor da Embed
        .setTitle("Informações do Servidor")
        .setDescription(content);

      await interaction.reply({ embeds: [embed.toJSON()] });
    } catch (error) {
      console.error("Erro ao obter informações do servidor:", error);
      await interaction.reply(
        "Ocorreu um erro ao obter informações do servidor."
      );
    }
  },
};

async function getTotalServerMessages(interaction) {
  let totalServerMessages = 0;

  const textChannels = interaction.guild.channels.cache.filter(
    (channel) => channel.type === "GUILD_TEXT"
  );

  for (const channel of textChannels.values()) {
    try {
      const messages = await channel.messages.fetch();
      totalServerMessages += messages.size;
    } catch (error) {
      console.error(`Erro ao obter mensagens do canal ${channel.name}:`, error);
    }
  }

  return totalServerMessages;
}

function getTotalVoiceTime(interaction) {
  let totalVoiceTime = 0;
  const voiceStates = interaction.guild.voiceStates.cache;
  for (const voiceState of voiceStates.values()) {
    if (voiceState.channel) {
      // Calcular a diferença entre o tempo atual e o tempo em que o membro entrou no canal de voz
      const timeInVoiceChannel = Date.now() - voiceState.joinedTimestamp;

      // Converter o tempo de milissegundos para minutos
      const timeInMinutes = Math.floor(timeInVoiceChannel / (1000 * 60));

      // Adicionar o tempo ao total
      totalVoiceTime += timeInMinutes;
    }
  }

  return totalVoiceTime;
}
