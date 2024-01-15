const mongoose = require("mongoose");
const VideoSchema = require("../database/schemas/VideoSchema.js");
const VideosRepository = require("../database/mongoose/VideosRepository.js");
mongoose.model("Videos", VideoSchema); // Certifique-se de registrar o modelo

module.exports = async function (channel) {
  // Criar a instância do VideosRepository
  const videoRepository = new VideosRepository(mongoose, "Videos");

  if (channel != null) {
    // Exemplo de uso da função findOne
    const videoId = channel.lastVideo;
    const guild = channel.notifyGuild; // Substitua pelo seu ID real
    const projection = {
      youtube: 1,
      channel: 1,
      lastVideo: 1,
      lastPublish: 1,
      message: 1,
      notifyGuild: 1,
    }; // Substitua pelos campos desejados

    const result = await videoRepository.findByLastVideoAndGuildId(videoId,guild, projection);


    if (result != null) {
      return result; // Retorna o vídeo quando existe
    } else {
      return false; // Retorna false quando não existe
    }
  } else {
    return false; // Canal é nulo, consideramos que o vídeo não existe
  }
};
