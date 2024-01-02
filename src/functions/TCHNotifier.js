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
  const accessToken = await Token.bind(this)(clientId, clientSecret);

  const canalEspecifico = await this.client.channels.fetch(
    process.env.CHANNEL_LOGS_TWITCH
  );

  for (const channelName of channelNames) {
    try {
      const channelId = await TwitchID.bind(this)(
        accessToken,
        channelName,
        clientId
      );
      const isLive = await isChannelLive(accessToken, channelId);

      if (isLive) {
        const twitchLink = `https://www.twitch.tv/${channelName}`;
        //console.log(`** ${channelName} ** está em live! Assista em: _** ${twitchLink} **_`);

        canalEspecifico.send(
          `** ${channelName.toUpperCase()}** está em live! Confira em ${twitchLink}`
        );
        console.log(`${channelName} está em live.`);
      }
    } catch (error) {
      console.error(
        `Erro para o canal ${channelName}: ${error.message || error}`
      );
    }
  }
  setInterval(() => p(), 2 * 60 * 60 * 1000);
};

// Configurar o intervalo apenas uma vez fora da função main
