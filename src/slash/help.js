const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Exibe informações sobre todos os comandos disponíveis."),

  async execute(interaction) {
    try {
      // Busca todos os comandos globais registrados para a sua aplicação
      const commands = await interaction.client.application.commands.fetch();
      const filteredCommands = commands.filter(cmd => cmd.name !== "help");
      
      // Constrói a base do nosso Embed
      const helpEmbed = new EmbedBuilder()
        .setColor("#dc143c")
        .setTitle("🤖 Central de Ajuda do Bot")
        .setDescription(`Olá ${interaction.user}! Aqui está a lista de todos os comandos que você pode usar.\nClique em um comando para autocompletar!`)
        // --- AQUI ESTÁ A LINHA QUE ADICIONA A IMAGEM DO SERVIDOR AO LADO ---
        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }));

      // Mapeia cada comando para um objeto de campo (field)
      const commandFields = filteredCommands.map((command) => {
        const options = command.options?.length 
          ? command.options.map(opt => `\`${opt.name}\``).join(", ") 
          : "Nenhum";
          
        return {
          name: `</${command.name}:${command.id}>`,
          value: `**Descrição:** ${command.description}\n**Parâmetros:** ${options}`,
          inline: false,
        };
      });
      
      if (commandFields.length > 0) {
        helpEmbed.addFields(commandFields);
      } else {
        helpEmbed.setDescription(`Olá ${interaction.user}! Parece que não há outros comandos para exibir no momento.`);
      }

      await interaction.reply({ embeds: [helpEmbed] });

    } catch (error) {
      console.error("Erro ao executar o comando /help:", error);
      await interaction.reply({
        content: "Ocorreu um erro ao tentar buscar as informações de ajuda.",
        ephemeral: true,
      });
    }
  },
};