const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");
const VideoSchema = require("../database/schemas/VideoSchema.js");
const VideosRepository = require("../database/mongoose/VideosRepository.js");
const CHANNELTOID = require("../utils/CHANNELTOID.js");
const RegistradorYTBVideo = require("../functions/RegistradorYTBVideo.js");
mongoose.model("Videos", VideoSchema);
// Array para armazenar os canais do YouTube
let youtubeChannels = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adicionaryoutube")
    .setDescription("Adiciona um canal do YouTube para receber notificações no canal de videos")
    .addStringOption((option) =>
      option
        .setName("canal")
        .setDescription("nome do canal do YouTube")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Obter o valor do parâmetro 'canal' fornecido pelo usuário
    const channelInput = interaction.options.getString("canal");

    const videoRepository = new VideosRepository(mongoose, "Videos");

    if (channelInput != null) {
      // Exemplo de uso da função findOne
      const videoId = channelInput; // Substitua pelo seu ID real
      const projection = {
        youtube: 1,
        channel: 1,
        lastVideo: 1,
        lastPublish: 1,
        message: 1,
      }; // Substitua pelos campos desejados

      const noBanco = await videoRepository.findByChannel(videoId, projection);

      if (noBanco != null) {
        return interaction.reply(
          "Esse canal já foi adicionado anteriormente, Por favor, informe outro canal!"
        );
      } else {
        const result = await CHANNELTOID.bind(this)(videoId);
        console.log(result);
        await RegistradorYTBVideo.bind(this)(result);
        return interaction.reply(
          `O canal ${result.channel} foi listado. Fica suave, vamos tocar no radin quando sair videozao novo!`
        ); // Retorna false quando não existe
      }
    }
  },
};
