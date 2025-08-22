const { REST, Routes } = require("discord.js");
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
      console.log("Started deleting all application (/) commands.");
  
      // Para comandos baseados em guilda
      await rest
        .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
        .then(() => console.log("Successfully deleted all guild commands."))
        .catch((error) =>
          console.error("Error deleting all guild commands:", error)
        );
  
      // Para comandos globais
      await rest
        .put(Routes.applicationCommands(clientId), { body: [] })
        .then(() => console.log("Successfully deleted all application commands."))
        .catch((error) =>
          console.error("Error deleting all application commands:", error)
        );
  
      console.log("Finished deleting all application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
