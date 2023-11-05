import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder().setName('createuser').setDescription('Cria um novo usuário');

export async function execute(interaction: CommandInteraction) {
  const username = interaction.user.username;
  const discordId = interaction.user.id;

    const prisma = new PrismaClient();

    try {
      const newUser = await prisma.user.create({
        data: {
          discordId: String(discordId),
          username,
          points: 0,
          lostSiege: 0
        },
      });

      await prisma.$disconnect();

      return interaction.reply(`Usuário ${newUser.username} criado com sucesso!`);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return interaction.reply('Ocorreu um erro ao criar o usuário.');
    }
}
