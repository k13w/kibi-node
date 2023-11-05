import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder().setName('watchlist').setDescription('Mostra a watchlist');

export async function execute(interaction: CommandInteraction) {
    const username = interaction.user.username;
    const globalName = interaction.user.globalName;


    if (username) {
        const prisma = new PrismaClient();

        try {
            const watchlist = await prisma.watchlist.findMany();

            const watchlistItems = watchlist.map(item => `- ${item.name}`).join('\n'); // Suponha que o campo seja 'name' no seu modelo

            await prisma.$disconnect();

            return interaction.reply({
                content: "watchlist",
                embeds: [{
                    description: `**Watchlist**\n${watchlistItems}`,
                    color: 333122,
                }]
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return interaction.reply('Ocorreu um erro ao adicionar lost siege.');
        }
    } else {
        return interaction.reply('Por favor, forneça uma acao válida.');
    }
}
