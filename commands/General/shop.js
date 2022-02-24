const config = require("../../configs/config.js");
const messages = require("../../configs/messages.js");
const allowedChats = config.allowedChats;

module.exports.run = (bot, message) => {
    if (!allowedChats.some(chats => message.channel.id.includes(chats))) return message.channel.send(messages.commands.shop.wrongChat.replace('{user}', message.author));

    return message.channel.send(messages.commands.shop.message.replace('{user}', message.author));
};

module.exports.help = {
    name: "shop",
    aliases: ['store']
};
