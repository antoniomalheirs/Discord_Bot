const axios = require("axios");
const TwitchToken = require("../utils/TwitchToken.js");
const discordBot = require("../Client");
const mongoose = require("mongoose");
const TwitchsRepository = require("../database/mongoose/TwitchsRepository.js");
const GuildsRepository = require("../database/mongoose/GuildsRepository.js");

const TwitchSchema = require("../database/schemas/TwitchSchema.js");
const GuildSchema = require("../database/schemas/GuildSchema.js");

mongoose.model("Twitchs", TwitchSchema);
mongoose.model("Guilds", GuildSchema);

const twitchRepository = new TwitchsRepository(mongoose, "Twitchs");
const guildRepository = new GuildsRepository(mongoose, "Guilds");

const clientId = process.env.TWITCH_CLIENTID;
const clientSecret = process.env.TWITCH_SECRETID;

async function isChannelLive(accessToken, channelId) {
  const response = await axios.get("https://api.twitch.tv/helix/streams", {
    params: {
      user_id: channelId,
    },
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data.length > 0;
}

module.exports = async function p() {
  try {
    const accessToken = await TwitchToken(clientId, clientSecret);
    const guildasComNotify = await guildRepository.verifyTwitchNotify();

    for (const guilda of guildasComNotify) {
      const guildId = guilda.guildID;
      const channelsend = guilda.channeltch;

      const allTwitchAttributes = await twitchRepository.findAllByGuildId(guildId);

      for (const twitch of allTwitchAttributes) {
        const channelTCH = {
          twitch: twitch.twitch,
          channel: twitch.channel,
          guildID: twitch.lastVideo,
          // ... outros campos do vídeo
        };

        try {
          const isLive = await isChannelLive(accessToken, channelTCH.twitch);

          if (isLive) {
            const twitchLink = `https://www.twitch.tv/${channelTCH.channel}`;
            const canalEspecifico = await discordBot.channels.fetch(channelsend);

            canalEspecifico.send(`** ${channelTCH.channel.toUpperCase()}** está em live! Confira em ${twitchLink}`);
            console.log(`${channelTCH.channel.toUpperCase()} está em live! Confira em ${twitchLink}`);

            const separador = "https://tenor.com/view/rainbow-color-line-colorful-change-color-gif-17422882";
            canalEspecifico.send(separador);
          }
        } catch (error) {
          console.error(`Erro ao obter token Twitch: ${error.message || error}`);
        }
        // Intervalo entre a re-chamada
      }
    }
  } catch (error) {
    console.error("Erro ao obter guildas com YOUTUBENOTIFY:", error);
  }
  setTimeout(p, 2 * 60 * 60 * 1000); // Call the function without 'call' method
};
