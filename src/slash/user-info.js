const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Obtém informações sobre o usuário."),
  async execute(interaction) {
    try {
      // Informações sobre o usuário
      const userRoles =
        interaction.member.roles.cache.map((role) => role.name).join(", ") ||
        "Nenhum cargo";
      const userJoinDate =
        interaction.member.joinedAt?.toLocaleDateString() || "Não disponível";

      // Informações sobre mensagens
      let totalMessages = 0;
      const guildChannels = interaction.guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_TEXT"
      );
      for (const channel of guildChannels.values()) {
        const messages = await channel.messages.fetch();
        totalMessages += messages.filter(
          (msg) => msg.author.id === interaction.user.id
        ).size;
      }

      // Informações sobre voz
      let totalVoiceTime = 0;
      const voiceStates = interaction.guild.voiceStates.cache.filter(
        (vs) => vs.member.id === interaction.user.id
      );
      for (const voiceState of voiceStates.values()) {
        totalVoiceTime += voiceState.channel
          ? voiceState.channel.members.size
          : 0;
      }

      const content = `**Informações sobre você ${interaction.user.toString()}** \`\`\`
 - Cargos: ${userRoles}
 - Data de entrada no servidor: ${userJoinDate}
 - Número total de mensagens enviadas: ${totalMessages}
 - Tempo total em chamadas de voz: ${totalVoiceTime} minutos \`\`\``;

      const embed = new EmbedBuilder()
        .setColor("#dc143c") // Cor da Embed
        .setTitle("Informações do Perfil")
        .setDescription(content);

      await interaction.reply({ embeds: [embed.toJSON()] });
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
      await interaction.reply(
        "Ocorreu um erro ao obter informações do usuário."
      );
    }
  },
};
