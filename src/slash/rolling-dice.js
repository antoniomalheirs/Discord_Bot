// Importa os construtores necessários do discord.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Importa os dados do nosso arquivo JSON
const frases = require("./frases.json");

module.exports = {
  // Configuração do comando com SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName("rollingdice") // Nome do comando atualizado para ser mais descritivo
    .setDescription("Envia uma frase e imagem aleatória para alegrar seu dia!"),

  // Lógica de execução do comando
  async execute(interaction) {
    try {
      // Escolhe um índice aleatório do array de frases
      const indiceAleatorio = Math.floor(Math.random() * frases.length);
      const itemSorteado = frases[indiceAleatorio];

      // Cria um Embed para uma resposta mais bonita e organizada
      const embed = new EmbedBuilder()
        .setColor("#0099ff") // Define uma cor para a barra lateral do embed (opcional)
        .setTitle("✨ Frase do Dia ✨")
        .setDescription(`${interaction.user}, ${itemSorteado.frase}`) // Menção ao usuário e a frase
        .setImage(itemSorteado.imagem) // Define a imagem principal do embed
        .setTimestamp() // Adiciona um rodapé com a hora que o comando foi executado
        .setFooter({ text: "Espero que tenha gostado!" });

      // Responde à interação com o embed criado
      await interaction.reply({ embeds: [embed] });
      
    } catch (error) {
      // Em caso de erro, loga no console e avisa o usuário
      console.error("Erro ao executar o comando /frase:", error);
      await interaction.reply({
        content: "Ops! Ocorreu um erro ao tentar executar este comando. Tente novamente mais tarde.",
        ephemeral: true, // A mensagem de erro só será visível para o usuário que executou o comando
      });
    }
  },
};