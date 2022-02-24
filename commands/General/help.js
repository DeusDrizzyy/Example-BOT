const { MessageEmbed } = require('discord.js');
const config = require("../../configs/config.js");
const messages = require("../../configs/messages.js");
const allowedChats = config.allowedChats;

module.exports.run = (bot, message) => {
    if (!allowedChats.some(chats => message.channel.id.includes(chats))) return message.channel.send(messages.commands.help.wrongChat.replace('{user}', message.author));

    if (messages.commands.help.reaction.enabled) message.react(messages.commands.help.reaction.reaction).catch(() => {});

    let helpEmbed = new MessageEmbed()
        .setAuthor(messages.commands.help.embedMessages.Title)
        .setColor(messages.commands.help.embedMessages.EmbedColor)
        .setDescription(messages.commands.help.embedMessages.Description.replace('{commands}', messages.commands.help.commands.join('\n')));

    return message.author.send(helpEmbed).catch(() => {
        return message.channel.send(messages.commands.help.privateLock.replace('{user}', message.author));
    });
};

module.exports.help = {
    name: "help",
    aliases: ['commands']
};
