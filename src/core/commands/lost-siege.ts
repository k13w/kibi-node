import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder().setName('lostsiege').setDescription('Adiciona uma catapa perdida');

export async function execute(interaction: CommandInteraction) {
    const username = interaction.user.username;
    const globalName = interaction.user.globalName;


    if (username) {
        const prisma = new PrismaClient();

        try {
           await prisma.user.update({
                where: {
                    username
                },
                data: {
                    lostSiege: 1
                },
            });
            await prisma.$disconnect();

            return interaction.reply(`${globalName} perdeu mais uma catapa!`);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return interaction.reply('Ocorreu um erro ao adicionar lost siege.');
        }
    } else {
        return interaction.reply('Por favor, forneça uma acao válida.');
    }
}
