import {
  ActionRowBuilder,
  CommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType
} from 'discord.js';
import { PrismaClient } from '@prisma/client';

export const data = new SlashCommandBuilder()
  .setName('addpoints')
  .setDescription('Adicionar pontos para um usuario.')

export async function execute(interaction: CommandInteraction) {
  try {
    const username = interaction.user.username;
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      where: {username},
    });

    const selectMenu = new StringSelectMenuBuilder()

    selectMenu
        .setCustomId(interaction.id)
        .setPlaceholder("Selecion o usuario")
        .addOptions(users.map(user =>
            new StringSelectMenuOptionBuilder()
                .setLabel(user.username)
                .setValue(String(user.points))
        ))

    const actionRow: any = new ActionRowBuilder().addComponents(selectMenu)

    const reply = await interaction.reply({
      components: [actionRow]
    })

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
      time: 10_000
    })

    collector.on('collect', async (interaction) => {
      await interaction.reply({
        content: "Insira quantos pontos você deseja adicionar (digite um número)",
      });

      try {
        const prisma  = new PrismaClient();

        const user = await prisma.user.findUnique({
          where: {username},
        });

        if (!user) {
          console.log("user not found")
        }

        const pointsToAdd = parseInt(String(10), 10);

        if (isNaN(pointsToAdd)) {
          console.log("numero invalido")
        }

        const updatedUser = await prisma.user.update({
          where: {username},
          data: {
            points: {
              decrement: pointsToAdd,
            },
          },
        });

        const response = `Adicionou ${pointsToAdd} pontos para ${username}. Total de pontos agora: ${updatedUser.points}.`;

        await interaction.followUp({
          content: response
        });
      } catch (e) {
        console.log(e)
      }
      })
    } catch (e) {
    console.log(e)
    }
  }