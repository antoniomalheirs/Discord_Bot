const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("limpa")
        .setDescription("Limpa mensagens do canal atual")
        .addIntegerOption(option =>
            option
                .setName("quant")
                .setDescription("Número de mensagens a excluir (1 a 100)")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        try {
            const quantidade = interaction.options.getInteger("quant");

            if (quantidade < 1 || quantidade > 100) {
                return interaction.reply({
                    content: "❌ Forneça um número entre **1** e **100**.",
                    ephemeral: true,
                });
            }

            await interaction.deferReply({ ephemeral: true });

            const canal = interaction.channel;

            // Busca mensagens (inclui a do comando, por isso +1)
            const mensagens = await canal.messages.fetch({ limit: quantidade + 1 });

            // Filtra mensagens mais antigas que 14 dias
            const mensagensValidas = mensagens.filter(
                msg => Date.now() - msg.createdTimestamp < 14 * 24 * 60 * 60 * 1000
            );

            if (mensagensValidas.size < 1) {
                return interaction.editReply("⚠️ Não há mensagens recentes para apagar (máx. 14 dias).");
            }

            await canal.bulkDelete(mensagensValidas, true);

            return interaction.editReply(
                `✅ Foram excluídas **${mensagensValidas.size}** mensagens no canal.`
            );
        } catch (error) {
            console.error("Erro ao limpar canal:", error);
            return interaction.reply({
                content: "❌ Ocorreu um erro ao tentar limpar mensagens.",
                ephemeral: true,
            });
        }
    },
};
