const { promises } = require("fs");

module.exports = class FunctionLoader {
  constructor(client) {
    this.client = client;
  }

  async call() {
    try {
      console.log(`\x1b[1m\x1b[93m[FUNÕES]\x1b[0m`, `Funções em Execução.`);
      await this.loadFunctions("./src/functions");
    } catch (error) {
      console.error("Error loading functions:", error.message);
    }
  }

  async loadFunctions(path) {
    try {
      const files = await promises.readdir(path);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        //console.log(`Loading function from: ${file}`);
        const loadedFunction = require(`../../${path}/${file}`);

        if (typeof loadedFunction === "function") {
          loadedFunction.bind(this)(); // Chame a função se necessário
          //console.log(`Function from: ${file} loaded successfully.`);
        } else {
          console.warn(`Skipping non-function file: ${file}`);
        }
      }
    } catch (error) {
      console.error("Error loading functions:", error.message);
    }
  }
};
