const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const UsersRepository = require("../database/mongoose/UsersRepository");
const UserSchema = require("../database/schemas/UserSchema");
mongoose.model("Users", UserSchema);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Obtém informações sobre o usuário."),
  async execute(interaction) {
    try {
      const codigouser = interaction.user.id;
      const projection = {
        codigouser: 1,
        voiceTime: 1,
        totalMessages: 1,
      };

      // Obter informações do usuário do banco de dados
      const userRepo = new UsersRepository(mongoose, "Users");
      const userData = await userRepo.findOne(codigouser, projection);

      // Informações sobre o usuário
      const userRoles =
        interaction.member.roles.cache.map((role) => role.name).join(", ") ||
        "Nenhum cargo";
      const userJoinDate =
        interaction.member.joinedAt?.toLocaleDateString() || "Não disponível";

      // Informações sobre mensagens e voz do banco de dados
      const totalMessages = userData.totalMessages || 0;
      const totalVoiceTime = userData.voiceTime || 0;

      const content = `**Informações sobre você ${interaction.user.toString()}** \`\`\`
 - Cargos: ${userRoles}
 - Data de entrada no servidor: ${userJoinDate}
 - Número total de mensagens enviadas: ${totalMessages}
 - Tempo total em chamadas de voz: ${totalVoiceTime} minutos \`\`\``;

      const embed = new EmbedBuilder()
        .setColor("#dc143c") // Cor da Embed
        .setTitle("Informações do Perfil")
        .setDescription(content);

      // Verificar se a interação já foi respondida
      if (interaction.deferred || interaction.replied) {
        // Editar a resposta original
        await interaction.editReply({ embeds: [embed.toJSON()] });
      } else {
        // Responder à interação
        await interaction.reply({ embeds: [embed.toJSON()] });
      }
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
      await interaction.followUp(
        "Ocorreu um erro ao obter informações do usuário."
      );
    }
  },
};
