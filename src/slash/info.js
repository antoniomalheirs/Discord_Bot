const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    // DESCRIÇÃO TRADUZIDA
    .setDescription('Fornece informações sobre o bot.'),
    
  async execute(interaction) {
    const { client } = interaction;

    const ping = client.ws.ping;
    
    // LÓGICA DE UPTIME MELHORADA
    const totalSeconds = os.uptime();
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const uptimeFormatted = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      // TÍTULO TRADUZIDO
      .setTitle('ℹ️ Informações do Bot')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        // CAMPOS TRADUZIDOS
        { name: 'Nome do Bot', value: client.user.username, inline: false },
        { name: 'Ping', value: `\`${ping}ms\``, inline: false },
        { name: 'Tempo de Atividade', value: uptimeFormatted, inline: false },
        { name: 'Versão do Node.js', value: process.version, inline: false },
        { name: 'Plataforma', value: `${os.platform()} (${os.arch()})`, inline: false }
      )
      // TEXTO DO FOOTER TRADUZIDO
      .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};