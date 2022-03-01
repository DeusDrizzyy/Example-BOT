const { commands } = require('../../configs/messages.js');

module.exports.run = (bot, message) => {
    if (commands.shop.dm.enabled) {
        message.author.send(commands.shop.message.replace('{user}', message.author)).catch(() => {
            return message.channel.send(commands.shop.dm.failedDM.replace('{user}', message.author));
        });
    } else {
        message.channel.send(commands.shop.message.replace('{user}', message.author));
    }
};

module.exports.configs = {
    name: 'shop',
    aliases: ['store'],
    allowedChats: ['828436313656918047'],
};
