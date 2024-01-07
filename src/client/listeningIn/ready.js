const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,

  execute(client) {
    console.log(`\x1b[1m\x1b[91m[CLIENTE]\x1b[0m`, `Cliente Conectado.`);

    client.user.setActivity(`/help`);
    //Coded by R3V01T7Z ☠️🏴‍☠️☠️🏴‍☠️
    client.user.setStatus("Online");
  },
};
