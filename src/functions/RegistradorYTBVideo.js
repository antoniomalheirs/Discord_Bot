const mongoose = require("mongoose");
const VideosRepository = require("../database/mongoose/VideosRepository.js");
const VideoSchema = require("../database/schemas/VideoSchema.js");
mongoose.model("Videos", VideoSchema);
// Registre o modelo 'Videos'

module.exports = async function (channel) {
  // Criar a instância do VideosRepository
  const videoRepository = new VideosRepository(mongoose, "Videos");

  if (channel != null) {
    try {
      // Supondo que você tenha um método chamado `addVideo` no seu VideosRepository
      const newVideo = {
        youtube: channel.youtube,
        channel: channel.channel,
        lastVideo: channel.lastVideo,
        lastPublish: channel.lastPublish,
        message: channel.message,
        notifyGuild: channel.notifyGuild, // Substitua isso com os dados reais do vídeo
        // ... outros campos do vídeo
      };

      // Adicionar o novo vídeo ao banco de dados
      const addedVideo = await videoRepository.add(newVideo);

      console.log("Canal adicionado com sucesso:", addedVideo);
    } catch (error) {
      console.error("Erro ao adicionar canal:", error.message);
    }
  }
};
