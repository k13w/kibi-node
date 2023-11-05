import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder().setName('points').setDescription('Mostra sua quantidade de pontos atual.');

export async function execute(interaction: CommandInteraction) {
    const username = interaction.user.username;
    const globalName = interaction.user.globalName;

        const prisma = new PrismaClient();

        try {
            const user = await prisma.user.findUnique({
                where: { username },
            });

            await prisma.$disconnect();

            return interaction.reply({
                embeds: [{
                    title: 'Points',
                    description: `${globalName} voce tem ${user!.points} pontos.`,
                    color: 333122,
                }]
            });
        } catch (error) {
            console.error('Erro ao mosrtrar pontodos do usuario:', error);
            return interaction.reply('Ocorreu um erro ao mostrar seus pontos.');
        }
}
