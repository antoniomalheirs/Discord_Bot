const { promises } = require("fs");
const pathh = require("node:path");
const fs = require("node:fs");

module.exports = class EventLoader {
  constructor(client) {
    this.client = client;
  }

  async call() {
    this.loadEvents("../client/listeningIn/");

    console.log(`\x1b[1m\x1b[92m[EVENTOS]\x1b[0m`, `Eventos Carregados.`);
  }

  async loadEvents(path) {
    const eventsPath = pathh.join(__dirname, path);
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = pathh.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this.client.once(event.name, (...args) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
};
