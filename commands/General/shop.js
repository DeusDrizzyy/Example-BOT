const { commands } = require("../../configs/messages.js");

module.exports.run = (bot, message) => {
    message.channel.send(commands.shop.message.replace('{user}', message.author));
};

module.exports.configs = {
    name: "shop",
    aliases: ['store'],
    allowedChats: ['828436313656918047']
};
