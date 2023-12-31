module.exports = class Ready {
  constructor(client) {
    this.client = client;
  }

  async ON() {
    console.log(`\x1b[1m\x1b[91m[CLIENTE]\x1b[0m`, `Cliente Conectado.`);

    await this.client.user.setActivity(`Coded by R3V01T7Z ☠️🏴‍☠️☠️🏴‍☠️`);

    await this.client.user.setStatus("Online");
  }
};
