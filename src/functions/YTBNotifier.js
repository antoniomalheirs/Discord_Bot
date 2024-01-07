const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const YTBWARN = require("../utils/YTBWARN.js");
const PesquisaYTBVideo = require("./PesquisaYTBVideo.js");
const RegistradorYTBVideo = require("./RegistradorYTBVideo.js");
const VideosRepository = require("../database/mongoose/VideosRepository.js");
const VideoSchema = require("../database/schemas/VideoSchema.js");
const videoRepository = new VideosRepository(mongoose, "Videos");
mongoose.model("Videos", VideoSchema);

module.exports = async function s() {
  const allYoutubeAttributes =
    await videoRepository.getAllUniqueYoutubeAttributes();

  const channelsId = allYoutubeAttributes;
  //client = this.client;

  for (const channelId of channelsId) {
    const newVideo = {
      youtube: channelId,
      channel: null,
      lastVideo: null,
      lastPublish: null,
      message: null, // Substitua isso com os dados reais do vídeo
      // ... outros campos do vídeo
    };

    try {
      const result = await YTBWARN.bind(this)(newVideo.youtube);

      if (result.lastVideo != null) {
        const resultf = await PesquisaYTBVideo.bind(this)(result);
        console.log(resultf);
        if (!resultf) {
          await RegistradorYTBVideo.bind(this)(result);

          const [titulo, link] = result.lastVideo.split(" || ");

          // Construir uma Embed com informações do vídeo usando EmbedBuilder
          const embed = new EmbedBuilder()
            .setTitle(
              "**" +
                result.channel +
                "** acabou de postar um novo vídeo!!! **Confira **" +
                link
            )
            .setThumbnail(result.message)
            .setURL(link) // Correção aqui
            .setColor("#3498db"); // Cor da Embed (opcional)

          // Enviar a Embed no canal específico (substitua 'ID_DO_CANAL' pelo ID real do canal)
          let canalEspecifico = await this.client.channels.fetch(
            process.env.CHANNEL_LOGS
          );

          canalEspecifico.send(
            "**" +
              result.channel +
              "** acabou de postar um novo vídeo!!! **Confira **" +
              link
          );
          const separador =
            "https://tenor.com/view/rainbow-color-line-colorful-change-color-gif-17422882";
          canalEspecifico.send(separador);

          //canalEspecifico.send({ embeds: [embed.toJSON()] });
        }
      }
    } catch (error) {
      console.error("Erro ao chamar YTBWARN:", error);
    }
  }
  // Intervalo entre a re-chamada
  setTimeout(() => s.call(this), 2 * 60 * 60 * 1000);
};