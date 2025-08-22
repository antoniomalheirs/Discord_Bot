const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const UsersRepository = require("../database/mongoose/UsersRepository");
const UserSchema = require("../database/schemas/UserSchema");
mongoose.model("Users", UserSchema);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("📊 Mostra informações detalhadas sobre o servidor."),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const guild = interaction.guild;

      const serverName = guild.name;
      const serverIcon = guild.iconURL({ dynamic: true, size: 1024 });
      const serverCreationDate = guild.createdAt.toLocaleDateString("pt-BR");
      const totalMembers = guild.memberCount;
      const totalChannels = guild.channels.cache.size;

      // Estatísticas armazenadas no banco
      const totalServerStats = await getTotalServerStats();

      // Construindo o embed
      const embed = new EmbedBuilder()
        .setColor("#5865F2") // Roxo padrão Discord
        .setTitle(`📌 Informações do servidor: ${serverName}`)
        .setThumbnail(serverIcon) // Ícone do servidor
        .addFields(
          { name: "📅 Criado em", value: serverCreationDate, inline: true },
          { name: "👥 Membros", value: `${totalMembers}`, inline: true },
          { name: "📂 Canais", value: `${totalChannels}`, inline: true },
          { name: "💬 Mensagens registradas", value: `${totalServerStats.totalMessages}`, inline: true },
          { name: "🎙️ Tempo em chamadas", value: `${totalServerStats.totalVoiceTime} minutos`, inline: true },
        )
        .setFooter({ text: `ID do Servidor: ${guild.id}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error("Erro ao obter informações do servidor:", error);
      await interaction.reply({
        content: "❌ Ocorreu um erro ao obter informações do servidor.",
        ephemeral: true,
      });
    }
  },
};

async function getTotalServerStats() {
  let totalVoiceTime = 0;
  let totalMessages = 0;

  try {
    const userRepo = new UsersRepository(mongoose, "Users");
    const allUsers = await userRepo.findAll();

    for (const user of allUsers) {
      if (user.voiceTime != null) totalVoiceTime += user.voiceTime;
      if (user.totalMessages != null) totalMessages += user.totalMessages;
    }
  } catch (error) {
    console.error("Erro ao obter informações de usuários do banco:", error);
  }

  return { totalVoiceTime, totalMessages };
}
