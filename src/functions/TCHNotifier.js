const axios = require("axios");
const Token = require("../utils/GetToken.js");
const TwitchID = require("../utils/GetTwitchId.js");

const clientId = process.env.TWITCH_CLIENTID;
const clientSecret = process.env.TWITCH_SECRETID;
const channelNames = ["gaules", "yayahuz", "coelho"];

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
    const accessToken = await Token(clientId, clientSecret);

    const canalEspecifico = await this.client.channels.fetch(
      process.env.CHANNEL_LOGS_TWITCH
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
