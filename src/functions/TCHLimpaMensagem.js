const discordBot = require("../Client");

module.exports = async function b() {
  // Função para realizar a limpeza
  const limparCanal = async () => {
    try {
      const canalEspecifico = await discordBot.channels.fetch(
        process.env.CHANNEL_TWITCH
      );

      try {
        const messages = await canalEspecifico.messages.fetch({ limit: 100 });

        if (messages.size > 1) {
          await canalEspecifico.bulkDelete(messages);
          await canalEspecifico.send("Limpando lives de ontem!");
        }
      } catch (error) {
        console.log(
          `\x1b[1m\x1b[90m[Limpeza De Canais]\x1b[0m`,
          `Limpeza em Execução, na próxima execução iremos limpa-las.`
        );
      }
    } catch (error) {
      //console.error("Canal não encontrado.!.!.!", error);
    }
    setTimeout(() => limparCanal.call(discordBot), 24 * 60 * 60 * 1000);
  };


  limparCanal();
};
