const { Events } = require("discord.js");
const mongoose = require("mongoose");
const GuildsRepository = require("../../database/mongoose/GuildsRepository");
const GuildSchema = require("../../database/schemas/GuildSchema");
mongoose.model("Guilds", GuildSchema);

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    try {
      // Aqui você pode usar a instância de GuildRepository para realizar operações específicas da guilda no banco de dados
      const guildRepo = new GuildsRepository(mongoose, "Guilds");

      console.log(`Bot entrou na guilda: ${guild.name} (ID: ${guild.id})`);

      const projection = {
        guildID: guild.id,
        guildName: guild.name,
        youtubenotify: 1,
      };

      if (await guildRepo.findOne(guild.id, projection)) {
        return;
        
      } else {
        await guildRepo.add(projection);
      }
    } catch (error) {
      console.error("Erro ao processar o evento GuildCreate:", error);
    }
  },
};
