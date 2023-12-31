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
    // Incrementa o total de mensagens do usuário
    await updateUserMessageCount(message.author.id);
  },
};

// Função para incrementar o total de mensagens do usuário no UsersRepository
async function updateUserMessageCount(userId) {
  try {
    const userRepo = new UsersRepository(mongoose, "Users");
    // Obtém as informações do usuário do banco de dados
    const user = await userRepo.get(userId);

    // Incrementa o total de mensagens
    user.totalMessages = (user.totalMessages || 0) + 1;

    // Atualiza as informações do usuário no banco de dados
    await userRepo.update(userId, { totalMessages: user.totalMessages });
  } catch (error) {
    console.error("Erro ao atualizar o total de mensagens do usuário:", error);
  }
}
