import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/config';
import { commands } from './core/commands';
import { deployCommands } from './deploy-commands';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.DirectMessages],
});

client.once('ready', () => {
  console.log('Discord bot is ready! 🤖');
});

client.on('ready', async () => {
  await deployCommands({ guildId: '1160639300489199626' });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;
  if (commands[commandName]) {
    try {
      await commands[commandName].execute(interaction);
    } catch (error) {
      console.error(`Erro ao executar o comando "${commandName}": ${error}`);
      interaction.reply('Ocorreu um erro ao processar o comando.');
    }
  }
});

client.login(config.DISCORD_TOKEN);
