const axios = require("axios");
const TwitchToken = require("../utils/TwitchToken.js");
const TwitchID = require("../utils/TwitchID.js");

const clientId = process.env.TWITCH_CLIENTID;
const clientSecret = process.env.TWITCH_SECRETID;
const channelNames = [
  "gaules",
  "yayahuz",
  "thedarkness",
  "brksedu",
  "sofiaespanha",
  "zanfas_cenegal",
  "yoda",
  "smzinho",
];

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

    const canalEspecifico = await this.client.channels.fetch(
      process.env.CHANNEL_TWITCH
    );

    for (const channelName of channelNames) {
      try {
        const channelId = await TwitchID(accessToken, channelName, clientId);
        const isLive = await isChannelLive(accessToken, channelId);

        if (isLive) {
          const twitchLink = `https://www.twitch.tv/${channelName}`;
          canalEspecifico.send(
            `** ${channelName.toUpperCase()}** está em live! Confira em ${twitchLink}`
          );

          console.log(
            `${channelName.toUpperCase()}** está em live! Confira em ${twitchLink}`
          );

          const separador =
            "https://tenor.com/view/rainbow-color-line-colorful-change-color-gif-17422882";
          canalEspecifico.send(separador);
        }
      } catch (error) {
        console.error(`Erro para o canal ${channelName}: Nada encontrado`);
      }
    }
  } catch (error) {
    console.error(`Erro ao obter token Twitch: ${error.message || error}`);
  }

  // Intervalo entre a re-chamada
  setTimeout(() => p(), 2 * 60 * 60 * 1000);
};
