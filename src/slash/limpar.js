const { SlashCommandBuilder } = require("discord.js");
const discordBot = require("../Client"); // Certifique-se de importar corretamente o objeto discordBot

module.exports = {
  data: new SlashCommandBuilder()
    .setName("limpa")
    .setDescription("Limpa o canal em que o comando foi inserido")
    .addIntegerOption((option) =>
      option
        .setName("quant")
        .setDescription("Número de mensagens a serem excluídas")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      // Obtém o ID do canal em que o comando foi inserido
      const canalAtualID = interaction.channelId;
      //console.log(canalAtualID);

      // Verifica se o canal é válido
      const canalAtual = await discordBot.channels.fetch(canalAtualID);
      

      // Obtém o número de mensagens a serem excluídas do parâmetro
      const quantidade = interaction.options.getInteger("quant");

      // Verifica se o valor está dentro do limite permitido (1 a 100)
      if (quantidade < 1 || quantidade > 100) {
        return interaction.reply(
          "Por favor, forneça um número entre 1 e 100 para a quantidade de mensagens a serem excluídas."
        );
      }

      // Obtém as mensagens no canal (limitado pelo número fornecido)
      const mensagens = await canalAtual.messages.fetch({ limit: Math.min(quantidade + 1, 100) });

      // Verifica se há mensagens para excluir
      if (mensagens.size > 1) {
        await canalAtual.bulkDelete(mensagens);
        await interaction.reply(`Foram excluídas ${quantidade} mensagens no canal.`);
      } else {
        await interaction.reply("Nenhuma mensagem para limpar.");
      }
    } catch (error) {
      console.error("Erro ao limpar canal:", error);
      await interaction.reply("Ocorreu um erro ao limpar o canal.");
    }
  },
};
