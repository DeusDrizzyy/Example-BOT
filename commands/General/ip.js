const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require("../../configs/config.js");
const messages = require("../../configs/messages.js");
const allowedChats = config.allowedChats;

module.exports.run = (bot, message) => {
    if (!allowedChats.some(chats => message.channel.id.includes(chats))) return message.channel.send(messages.commands.ip.wrongChat.replace('{user}', message.author));

    fetch('https://api.mcsrvstat.us/2/' + config.serverIP).then(res => res.json()).then(body => {
        let status = !1 === body.online ? "Offline" : "Online";
        let players = body.online === true ? body.players.online : '0';

        let emBed = new MessageEmbed()
            .setTitle(messages.commands.ip.embedMessages.Title)
            .setColor(messages.commands.ip.embedMessages.EmbedColor)
            .setDescription(messages.commands.ip.embedMessages.Description.replace('{players}', players).replace('{serverIP}', config.serverIP).replace('{status}', status));

        return message.channel.send(emBed);
    }).catch((error) => {
        console.log(error);
        return message.channel.send(messages.commands.ip.apiError.replace('{user}', message.author));
    });
};

module.exports.help = {
    name: "ip",
    aliases: ['online', 'server', 'mc']
}
