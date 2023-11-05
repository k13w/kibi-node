import { Client } from 'discord.js';
import { config } from './config';
import { commands } from './commands';
import { deployCommands } from './deploy-commands';

export const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
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
