const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const YTBWARN = require("../utils/YTBWARN.js");
const PesquisaYTBVideo = require("./PesquisaYTBVideo.js");
const RegistradorYTBVideo = require("./RegistradorYTBVideo.js");
const VideoSchema = require("../database/schemas/VideoSchema.js");
mongoose.model("Videos", VideoSchema);

module.exports = async function s() {
  const channelsId = ["UCt16NSYjauKclK67LCXvQyA", "UC8hU4ttIQnmmxywv9qrRfqw", "UCFPWJA3H5uEtlR32IUbnjAg", "UCOVzRGlVSRUb0ItTmTXLKaw", "UCq84Cr94cQ2RIFjyyBOdy3Q", "UCSZwSipmufiBGjFk9q3rD-A" ];
  client = this.client;

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

          const [titulo, link] = result.lastVideo.split(' || ');

          // Construir uma Embed com informações do vídeo usando EmbedBuilder
          const embed = new EmbedBuilder()
            .setTitle("**" + result.channel + "** acabou de postar um novo vídeo!!! **Confira **" + link)
            .setThumbnail(result.message)
            .setURL(link) // Correção aqui
            .setColor("#3498db") // Cor da Embed (opcional)
          
          
          // Enviar a Embed no canal específico (substitua 'ID_DO_CANAL' pelo ID real do canal)
          let canalEspecifico = await this.client.channels.fetch(
            process.env.CHANNEL_LOGS
          );
          
          
          canalEspecifico.send("**" + result.channel + "** acabou de postar um novo vídeo!!! **Confira **" + link);
          //canalEspecifico.send({ embeds: [embed.toJSON()] });
        }
      }
    } catch (error) {
      console.error("Erro ao chamar YTBWARN:", error);
    }
  }
  setInterval(() => s.bind(this)(), 2 * 60 * 60 * 1000);
};