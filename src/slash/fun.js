// Importa os construtores necessários do discord.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Importa nossa lista de piadas do arquivo JSON
const piadas = require("./piadas.json");

module.exports = {
  // Configuração do comando
  data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription("Envia uma piada aleatória para você rir!"), // Descrição melhorada

  // Lógica de execução do comando
  async execute(interaction) { // Corrigido de "interation" para "interaction"
    try {
      // Escolhe uma piada aleatória do nosso array
      const piadaAleatoria = piadas[Math.floor(Math.random() * piadas.length)];

      // Cria um Embed para uma resposta visualmente mais interessante
      const embed = new EmbedBuilder()
        .setColor("#FFC300") // Uma cor amarela divertida
        .setTitle("🤣 Hora da Piada!")
        .setDescription(`${interaction.user}, aqui vai uma:\n\n**${piadaAleatoria}**`) // Usa a piada no corpo do embed e menciona o usuário
        .setImage("https://i.giphy.com/media/3o6vY6fT3kSStA1nna/giphy.gif") // Adiciona um GIF para deixar mais engraçado (opcional)
        .setTimestamp()
        .setFooter({ text: "Piada de qualidade duvidosa." });

      // Responde à interação com o embed
      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      // Em caso de erro, loga no console e avisa o usuário de forma privada
      console.error("Erro ao executar o comando /fun:", error);
      await interaction.reply({
        content: "Ops! O saco de piadas rasgou. Tente novamente mais tarde.",
        ephemeral: true, // A mensagem só será visível para quem usou o comando
      });
    }
  },
};