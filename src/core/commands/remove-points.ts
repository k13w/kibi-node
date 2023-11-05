import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder()
    .setName('removepoints')
    .setDescription('Remover pontos de um usuario.')
    .addStringOption((option) =>
        option
            .setName('input')
            .setDescription('Escolha a pessoa para remover os pontos')
            .setRequired(true)
            .addChoices({ name: 'Bibi', value: 'bi' }, { name: 'Kiki', value: 'ki' }),
    )
    .addIntegerOption((option) => option.setName('amount').setDescription('Quantidade de pontos que deseja remover').setRequired(true));

export async function execute(interaction: CommandInteraction) {
    const globalName = interaction.user.globalName;
    const username = interaction.user.username;
    const points = interaction.options.data[1].value;

    try {
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return interaction.reply('Usuário não encontrado.');
        }

        const pointsToAdd = parseInt(String(points), 10);

        if (isNaN(pointsToAdd)) {
            return interaction.reply('Por favor, forneça um número válido de pontos.');
        }

        const updatedUser = await prisma.user.update({
            where: { username },
            data: {
                points: {
                    decrement: pointsToAdd,
                },
            },
        });

        const response = `Removeu ${pointsToAdd} pontos de ${globalName}. Total de pontos agora: ${updatedUser.points}.`;

        return await interaction.reply(response);
    } catch (error) {
        console.log("Error ao remover pontos", error)
        return interaction.reply('Por favor, forneça as opções corretamente.');
    }
}
