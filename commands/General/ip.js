const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { serverIP } = require('../../configs/config.js');
const { commands } = require('../../configs/messages.js');

module.exports.run = (bot, message) => {
    fetch('https://api.mcsrvstat.us/2/' + serverIP)
        .then(res => res.json())
        .then(body => {
            let status = body.online ? 'Online' : 'Offline';
            let players = body.online ? body.players.online : '0';

            let embed = new MessageEmbed()
                .setTitle(commands.ip.embed.title)
                .setColor(commands.ip.embed.color)
                .setDescription(commands.ip.embed.description.replace('{players}', players).replace('{serverIP}', serverIP).replace('{status}', status));

            message.channel.send(embed);
        })
        .catch(() => {
            return message.channel.send(commands.ip.error.replace('{user}', message.author));
        });
};

module.exports.configs = {
    name: 'ip',
    aliases: ['online', 'server', 'mc'],
};
