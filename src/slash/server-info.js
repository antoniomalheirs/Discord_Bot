const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const UsersRepository = require("../database/mongoose/UsersRepository");
const UserSchema = require("../database/schemas/UserSchema");
mongoose.model("Users", UserSchema);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Obtém informações sobre o servidor."),
  async execute(interaction) {
    try {
      // Deferir a resposta para evitar timeouts
      await interaction.deferReply();

      const serverName = interaction.guild.name;
      const serverCreationDate = interaction.guild.createdAt.toLocaleDateString();
      const totalMembers = interaction.guild.memberCount;
      const totalChannels = interaction.guild.channels.cache.size;

      // Informações sobre voz e mensagens
      const totalServerStats = await getTotalServerStats();

      // Construir a mensagem
      const content = `**Informações sobre o servidor ${serverName}** \`\`\`
 - Data de criação: ${serverCreationDate}
 - Número total de membros: ${totalMembers}
 - Número total de canais: ${totalChannels}
 - Número total de mensagens no servidor: ${totalServerStats.totalMessages}
 - Tempo total em chamadas de voz: ${totalServerStats.totalVoiceTime} minutos \`\`\``;

      const embed = new EmbedBuilder()
        .setColor("#dc143c") // Cor da Embed
        .setTitle("Informações do Servidor")
        .setDescription(content);

      // Enviar a resposta final após a deferral
      await interaction.editReply({ embeds: [embed.toJSON()] });
    } catch (error) {
      console.error("Erro ao obter informações do servidor:", error);
      await interaction.followUp(
        "Ocorreu um erro ao obter informações do servidor."
      );
    }
  },
};

async function getTotalServerStats() {
  let totalVoiceTime = 0;
  let totalMessages = 0;

  try {
    // Obter informações de todos os usuários do banco de dados
    const userRepo = new UsersRepository(mongoose, "Users");
    const allUsers = await userRepo.findAll();

    // Somar o número total de mensagens e tempo de voz de todos os usuários
    for (const user of allUsers) {
      if (user.voiceTime != null) {
        totalVoiceTime += user.voiceTime;
      }

      if (user.totalMessages != null) {
        totalMessages += user.totalMessages;
      }
    }
  } catch (error) {
    console.error("Erro ao obter informações de usuários do banco de dados:", error);
  }

  return { totalVoiceTime, totalMessages };
}
