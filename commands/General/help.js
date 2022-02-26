const { MessageEmbed } = require('discord.js');
const { commands } = require("../../configs/messages.js");

// Because it has few commands, this is extremely basic code.
module.exports.run = (bot, message) => {
    if (commands.help.reaction.enabled) message.react(commands.help.reaction.reaction).catch(() => {});

    let helpEmbed = new MessageEmbed()
        .setAuthor(commands.help.embedMessages.Title)
        .setColor(commands.help.embedMessages.EmbedColor)
        .setDescription(commands.help.embedMessages.Description.replace('{commands}', commands.help.commands.join('\n')));

    message.author.send(helpEmbed).catch(() => {
        return message.channel.send(commands.help.privateLock.replace('{user}', message.author));
    });
};

module.exports.configs = {
    name: "help"
};
