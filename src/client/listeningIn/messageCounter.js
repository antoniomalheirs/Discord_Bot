const { Events } = require("discord.js");
const mongoose = require("mongoose");
const UsersRepository = require("../../database/mongoose/UsersRepository");
const UserSchema = require("../../database/schemas/UserSchema");
mongoose.model("Users", UserSchema);

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Verifica se a mensagem é de um bot
    if (message.author.bot) {
      return;
    }

    const server = message.guild.id;
    const name = message.author.username;

    // Incrementa o total de mensagens do usuário
    await updateUserMessageCount(message.author.id, server, name);
  },
};

// Função para incrementar o total de mensagens do usuário no UsersRepository
async function updateUserMessageCount(userId, server, name) {
  try {
    const userRepo = new UsersRepository(mongoose, "Users");

    // Obtém as informações do usuário do banco de dados
    const user = await userRepo.getByUserIdAndGuildId(userId, server);
   
    if (user.idguild !== server) {
      // Se o usuário não existir no banco de dados, cria um novo registro
      const newUser = {
        codigouser: userId,
        idguild: server,
        username: name,
        totalMessages: 1,
        // ... outros campos do usuário
      };

      await userRepo.add(newUser);
      console.log("Novo usuário adicionado ao banco de dados.");
    } else {
      // Se o usuário já existir, incrementa o total de mensagens
      user.totalMessages = (user.totalMessages || 0) + 1;

      // Atualiza as informações do usuário no banco de dados
      await userRepo.updateByUserIdAndGuildId(userId, server, {
        codigouser: userId,
        totalMessages: user.totalMessages,
        username: name,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar o total de mensagens do usuário:", error);
  }
}
