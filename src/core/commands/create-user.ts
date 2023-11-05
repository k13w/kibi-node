import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder().setName('createuser').setDescription('Cria um novo usuário');

export async function execute(interaction: CommandInteraction) {
  const username = interaction.user.username;
  const discordId = interaction.user.id;

  if (username) {
    const prisma = new PrismaClient();

    try {
      const newUser = await prisma.user.create({
        data: {
          discordId: String(discordId),
          username,
          lostSiege: ""
        },
      });

      await prisma.$disconnect();

      return interaction.reply(`Usuário ${newUser.username} criado com sucesso!`);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return interaction.reply('Ocorreu um erro ao criar o usuário.');
    }
  } else {
    return interaction.reply('Por favor, forneça um nome de usuário válido.');
  }
}
