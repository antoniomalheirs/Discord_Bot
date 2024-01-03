module.exports = async function LimpaCanal() {
  const delay = 24 * 60 * 60 * 1000;
  try {
    const channelId = process.env.CHANNEL_LOGS_TWITCH;
    const channel = await this.client.channels.fetch(channelId);

    try {
      const messages = await channel.messages.fetch();

      // Verifica se há mensagens para excluir
      if (messages.size > 1) {
        await channel.bulkDelete(messages);
        await channel.send("Limpando lives de ontem.!");
      } else {
        console.log("Nenhuma mensagem para limpar.");
      }
    } catch (error) {
      console.error("Erro ao processar mensagens:");
    }
  } catch (error) {
    console.error("Erro ao buscar canal:", error);
  }

  // Configura o próximo intervalo
  setTimeout(() => LimpaCanal.bind(this)(), delay);
};
