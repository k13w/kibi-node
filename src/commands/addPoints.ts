import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {PrismaClient} from "@prisma/client";

export const data = new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adicionar pontos para um usuario.")
    .addStringOption(option =>
        option.setName('input')
            .setDescription('Escolha a pessoa para adicionar os pontos')
            .setRequired(true)
            .addChoices(
                { name: 'Bibi', value: 'bi' },
                { name: 'Kiki', value: 'ki' },
            ))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Quantidade de pontos a adicionar')
                .setRequired(true)
        )

export async function execute(interaction: CommandInteraction) {
    const globalName = interaction.user.globalName
    const username = interaction.user.username
    const points = interaction.options.data[1].value

    const parserPoints =  Number(points)

    if (points) {
        const prisma = new PrismaClient()

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            console.error('Usuário não encontrado');
            return;
        }

        await prisma.point.create({
            data: {
                userId: user.id,
                value: parserPoints,
            },
        });


        const response = `Adicionou ${points} pontos para ${globalName}.`;

        return interaction.reply(response);
    } else {
        return interaction.reply('Por favor, forneça as opções corretamente.');
    }
}