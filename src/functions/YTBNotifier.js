const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const YTBWARN = require("../utils/YTBWARN.js");
const PesquisaYTBVideo = require("./PesquisaYTBVideo.js");
const RegistradorYTBVideo = require("./RegistradorYTBVideo.js");
const VideosRepository = require("../database/mongoose/VideosRepository.js");
const VideoSchema = require("../database/schemas/VideoSchema.js");
const videoRepository = new VideosRepository(mongoose, "Videos");
const GuildsRepository = require("../database/mongoose/GuildsRepository.js");
const GuildSchema = require("../database/schemas/GuildSchema.js");
const guildRepository = new GuildsRepository(mongoose, "Guilds");
const discordBot = require("../Client");

mongoose.model("Videos", VideoSchema);
mongoose.model("Guilds", GuildSchema);

module.exports = async function s() {
  try {
    // Busque todas as guildas com YOUTUBENOTIFY definido como true
    const guildasComNotify = await guildRepository.verifyYouTubeNotify();
    
    // Para cada guilda, execute a lógica principal
    for (const guilda of guildasComNotify) {
      const guildId = guilda.guildID;

      const allYoutubeAttributes =
        await videoRepository.getChannelsWithVideosByGuildId(guildId);

      const channelsId = allYoutubeAttributes;
      //console.log(channelsId);
      for (const channelId of channelsId) {
        const newVideo = {
          youtube: channelId.youtube,
          channel: null,
          lastVideo: channelId.lastVideo,
          lastPublish: null,
          message: null,
          notifyGuild: guildId,
          // ... outros campos do vídeo
        };
        console.log(newVideo);
        try {
          const result = await YTBWARN.bind(this)(newVideo.youtube);

          if (result.lastVideo != null) {
            const resultf = await PesquisaYTBVideo.bind(this)(result);
            console.log(resultf);

            if (resultf) {
              await RegistradorYTBVideo.bind(this)(result);

              const [titulo, link] = result.lastVideo.split(" || ");

              const embed = new EmbedBuilder()
                .setTitle(
                  "**" +
                    result.channel +
                    "** acabou de postar um novo vídeo!!! **Confira **" +
                    link
                )
                .setThumbnail(result.message)
                .setURL(link)
                .setColor("#3498db");

              let canalEspecifico = await discordBot.channels.fetch(
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
            }
          }
        } catch (error) {
          console.error("Erro ao chamar YTBWARN:", error);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao obter guildas com YOUTUBENOTIFY:", error);
  }

  // Intervalo entre a re-chamada
  setTimeout(() => s.call(discordBot), 2 * 60 * 60 * 1000);
};