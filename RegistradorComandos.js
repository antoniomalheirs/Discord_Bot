const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commandsPath = "./src/slash/";
const commandFiles = require("fs")
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];
for (const file of commandFiles) {
  const command = require(`${commandsPath}/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    const response = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");

    // Imprima os IDs e nomes dos comandos
    const commandInfo = response.map((command) => ({
      id: command.id,
      name: command.name,
    }));
    console.log("Command IDs and Names:", commandInfo);
  } catch (error) {
    console.error(error);
  }
})();
