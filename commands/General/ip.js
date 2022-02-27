const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { serverIP } = require("../../configs/config.js");
const { commands } = require("../../configs/messages.js");

module.exports.run = (bot, message) => {
    fetch('https://api.mcsrvstat.us/2/' + serverIP)
        .then(res => res.json())
        .then(body => {
            let status = !1 === body.online ? 'Offline' : 'Online';
            let players = body.online === true ? body.players.online : '0';

            let emBed = new MessageEmbed()
                .setTitle(commands.ip.embedMessages.Title)
                .setColor(commands.ip.embedMessages.EmbedColor)
                .setDescription(
                    commands.ip.embedMessages.Description.replace('{players}', players)
                        .replace('{serverIP}', serverIP)
                        .replace('{status}', status),
                );

            message.channel.send(emBed);
        })
        .catch(error => {
            console.log(error);
            return message.channel.send(commands.ip.apiError.replace('{user}', message.author));
        });
};

module.exports.configs = {
    name: "ip",
    aliases: ['online', 'server', 'mc']
};
