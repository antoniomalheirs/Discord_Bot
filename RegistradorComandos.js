const { REST, Routes } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path"); // 1. Importe o módulo 'path'

const commands = [];
// 2. Crie o caminho absoluto para a pasta de comandos
const commandsPath = path.join(__dirname, "src", "slash");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  // 3. Crie o caminho absoluto para cada arquivo de comando
  const filePath = path.join(commandsPath, file);
  const command = require(filePath); // 4. Use o caminho completo e correto
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[AVISO] O comando em ${filePath} não possui a propriedade "data" ou "execute".`);
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Iniciando o registro de ${commands.length} comandos (/) globais.`);

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: commands,
      }
    );

    console.log(`Sucesso! ${data.length} comandos (/) globais foram registrados.`);
  } catch (error) {
    console.error(error);
  }
})();