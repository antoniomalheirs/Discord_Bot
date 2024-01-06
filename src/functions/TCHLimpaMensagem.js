module.exports = async function b() {
  try {
    const canalEspecifico = await this.client.channels.fetch(
      process.env.CHANNEL_TWITCH
    );

    try {
      const messages = await canalEspecifico.messages.fetch({ limit: 100 });

      if (messages.size > 1) {
        await canalEspecifico.bulkDelete(messages); // Corrigido aqui
        await canalEspecifico.send("Limpando lives de ontem!"); // Corrigido aqui
      }
    } catch (error) {
      console.log(
        `\x1b[1m\x1b[90m[Limpeza De Canais]\x1b[0m`,
        `Limpeza em Execução, na proxima execução iremos limpa-las.`
      );
    }
    // Verifica se há mensagens para excluir
  } catch (error) {
    console.error("Canal não encontrado.!.!.!", error);
  }

  // Configura o próximo intervalo
  setTimeout(() => b.call(this), 24 * 60 * 60 * 1000); // Corrigido aqui
};
