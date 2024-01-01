const axios = require('axios');

const clientId = 'p8lnw3zsggwdbeh2pfdjthgcdyj6n7';
const clientSecret = 'x7mtj4vo6ph524frc63tac379uzj5z';
const channelNames = ['gaules', 'yayahuz', 'coelho']; // Adicione os nomes dos canais desejados

async function getAccessToken() {
  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    },
  });

  return response.data.access_token;
}

async function getChannelId(accessToken, channelName) {
  const response = await axios.get('https://api.twitch.tv/helix/users', {
    params: {
      login: channelName,
    },
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data.data[0].id;
}

async function isChannelLive(accessToken, channelId) {
  const response = await axios.get('https://api.twitch.tv/helix/streams', {
    params: {
      user_id: channelId,
    },
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data.data.length > 0;
}

async function main() {
  try {
    const accessToken = await getAccessToken();

    for (const channelName of channelNames) {
      const channelId = await getChannelId(accessToken, channelName);
      const isLive = await isChannelLive(accessToken, channelId);

      if (isLive) {
        console.log(`${channelName} está em live!`);
      } else {
        console.log(`${channelName} não está em live.`);
      }
    }
  } catch (error) {
    console.error(error.message || error);
  }
}

main();
