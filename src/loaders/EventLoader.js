const { promises } = require("fs");

module.exports = class EventLoader {
  constructor(client) {
    this.client = client;
  }

  async call() {
    console.log(`\x1b[1m\x1b[92m[EVENTOS]\x1b[0m`, `Eventos Carregados.`);

    this.loadEvents("./src/client/listeningIn");
  }

  async loadEvents(path) {
    const files = await promises.readdir(path);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const event = new (require(`../../${path}/${file}`))(this.client);

      this.client.on(file.split(".")[0], (...args) => event.ON(...args));
    }
  }
};
