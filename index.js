const { Client, Collection } = require("discord.js");
const config = require('./configs/config');
const messages = require('./configs/messages');
const getFiles = require('./functions/getFiles');

const bot = new Client({ /* ... */ });

bot.config = config;
bot.commands = new Collection();
bot.aliases = new Collection();

bot.on("ready", () => {
    console.log(messages.bot.onlineBOT.replace('{botName}', bot.user.username).replace('{allBotUsers}', bot.users.cache.size.toString()).replace('{allBotChannels}', bot.channels.cache.size.toString()).replace('{allBotGuilds}', bot.guilds.cache.size.toString()));
    console.log(`Developed by DeusDrizzyy#4763.`);
});

bot.on("message", message => {
    if (message.author.bot || message.channel.type !== "text") return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.split(" "), cmd = args.shift(), command = getCommand(bot, cmd);
    command && command.run(bot, message, args);
});

/* This is a public bot handler. */

function getCommand(e, n) {
    n = n.slice(config.prefix.length);
    let t = e.commands.get(n);
    return t || (t = e.commands.get(e.aliases.get(n)));
}

function startBOT() {
    console.log(messages.bot.loadCmds);
    loadAllCommands('./commands');

    console.log(messages.bot.Connecting);
    bot.login(config.token);
}


function loadAllCommands(s) {
    for (const o of getFiles.searchFiles(s, "js")) {
        const s = o.directory.split("/");
        s.shift(), s.shift();
        const e = s.join("/");
        for (const s of o.files) {
            let o = require(s);
            o.help && (bot.commands.set(o.help.name, o), o.help.aliases && o.help.aliases.filter(s => "" !== s.trim()).forEach(s => bot.aliases.set(s, o.help.name)))
        }
        const l = o.files.map(s => s.split("/").pop().split(".").shift());
        console.log(messages.bot.loadedCommands.replace('{amount}', o.files.length.toString()).replace('{category}', e).replace('{allCmds}', l.join(", ")));
    }
}

startBOT();
