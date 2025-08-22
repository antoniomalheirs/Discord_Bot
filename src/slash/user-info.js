const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const UsersRepository = require("../database/mongoose/UsersRepository");
const UserSchema = require("../database/schemas/UserSchema");

// Registra o schema apenas uma vez
if (!mongoose.models.Users) {
  mongoose.model("Users", UserSchema);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Exibe informações detalhadas sobre o seu perfil."),

  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const projection = {
        codigouser: 1,
        voiceTime: 1,
        totalMessages: 1,
      };

      // Repositório de usuários
      const userRepo = new UsersRepository(mongoose, "Users");
      const userData = await userRepo.findOne(userId, projection);

      // Garantir dados mesmo se não existir no banco
      const totalMessages = userData?.totalMessages || 0;
      const totalVoiceTime = userData?.voiceTime || 0;

      // Informações do membro no servidor
      const member = interaction.member;
      const userRoles =
        member.roles.cache
          .filter((role) => role.name !== "@everyone")
          .map((role) => role.name)
          .join(", ") || "Nenhum cargo";

      const userJoinDate = member.joinedAt
        ? member.joinedAt.toLocaleDateString("pt-BR")
        : "Não disponível";

      // Embed visualmente mais elegante
      const embed = new EmbedBuilder()
        .setColor("#5865F2") // Azul padrão do Discord
        .setAuthor({
          name: `${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("📊 Informações do Usuário")
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .addFields(
          { name: "👤 Usuário", value: `${interaction.user}`, inline: true },
          { name: "🆔 ID", value: `\`${interaction.user.id}\``, inline: true },
          { name: "📅 Entrada no servidor", value: userJoinDate, inline: false },
          { name: "🏷️ Cargos", value: userRoles, inline: false },
          { name: "💬 Mensagens enviadas", value: `${totalMessages.toLocaleString("pt-BR")}`, inline: true },
          { name: "🎙️ Tempo em voz", value: `${totalVoiceTime.toLocaleString("pt-BR")} minutos`, inline: true },
        )
        .setFooter({
          text: `Solicitado por ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      // Responde ou edita conforme necessário
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({ embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);

      const errorMsg = {
        content:
          "⚠️ Ocorreu um erro ao buscar suas informações. Tente novamente mais tarde.",
        ephemeral: true,
      };

      if (interaction.deferred || interaction.replied) {
        await interaction.followUp(errorMsg);
      } else {
        await interaction.reply(errorMsg);
      }
    }
  },
};
