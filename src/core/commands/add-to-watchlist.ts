import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder()
    .setName('addtowatchlist')
    .setDescription('Adicionar um filme para ver depois.')
    .addStringOption((option) =>
        option
            .setName('input')
            .setDescription('Insira o nome do filme.')
            .setRequired(true)
    )

export async function execute(interaction: CommandInteraction) {
    const globalName = interaction.user.globalName;
    const name = interaction.options.data[0].value;

    if (name) {
        const prisma = new PrismaClient();

        await prisma.watchlist.create({
            data: {
                name: String(name)
            },
        });

        const response = `${globalName} - Adicionou um novo watchlist.`;

        return interaction.reply(response);
    } else {
        return interaction.reply('Por favor, forneça as opções corretamente.');
    }
}
