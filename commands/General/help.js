const { MessageEmbed } = require('discord.js');
const { commands } = require('../../configs/messages.js');

// Because it has few commands, this is extremely basic code.
module.exports.run = (bot, message) => {
    if (commands.help.reaction.enabled) message.react(commands.help.reaction.reaction).catch(() => {});

    let embed = new MessageEmbed()
        .setAuthor(commands.help.embed.title)
        .setColor(commands.help.embed.color)
        .setDescription(commands.help.embed.description.replace('{commands}', commands.help.commands.join('\n')));

    message.author.send(embed).catch(() => {
        return message.channel.send(commands.help.failedDM.replace('{user}', message.author));
    });
};

module.exports.configs = {
    name: 'help',
};
