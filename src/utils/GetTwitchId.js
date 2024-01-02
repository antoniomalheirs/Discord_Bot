const axios = require("axios");

module.exports = async function (accessToken, channelName, clientId) {
  try {
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
  } catch (error) {
    console.error(`Erro ao buscar informações do canal: ${error.message}`);
    throw error;
  }
};
