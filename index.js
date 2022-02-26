const { Client, Collection } = require("discord.js");
const { token, prefix } = require('./configs/config');
const { bot_msg, commands } = require('./configs/messages');
const { searchFiles } = require('./functions/getFiles');
const bot = new Client({});

bot.commands = new Collection();
bot.aliases = new Collection();

bot.on("ready", () => {
    console.log(bot_msg.onlineBOT.replace('{botName}', bot.user.username).replace('{allBotUsers}', bot.users.cache.size.toString()).replace('{allBotChannels}', bot.channels.cache.size.toString()).replace('{allBotGuilds}', bot.guilds.cache.size.toString()));
    console.log(`Developed by DeusDrizzyy#4763.`);
});

bot.on("message", message => {
    if (message.author.bot || message.channel.type !== "text") return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.split(" "), cmd = args.shift(), command = getCommand(bot, cmd);
    if (!command) return;
    if (!command.configs || !command.configs.name) return message.channel.send(bot_msg.needConfig.replace('{user}', message.author));

    if (command.configs.allowedChats && !command.configs.allowedChats.some(cts => message.channel.id.includes(cts))) {
        return message.channel.send(commands[command.configs.name].wrongChat.replace('{user}', message.author));
    } else {
        command.run(bot, message, args);
    }
});

function getCommand(bot, name) {
    name = name.slice(prefix.length);
    let cmd = bot.commands.get(name);
    return cmd || bot.commands.get(bot.aliases.get(name));
}

function startBOT() {
    console.log(bot_msg.loadCmds);
    loadAllCommands('./commands');

    console.log(bot_msg.Connecting);
    bot.login(token);
}

function loadAllCommands(s) {
    for (const o of searchFiles(s, "js")) {
        const s = o.directory.split("/");
        s.shift() && s.shift();
        const e = s.join("/");
        for (const s of o.files) {
            let o = require(s);
            o.configs && bot.commands.set(o.configs.name, o); (o.configs.aliases && o.configs.aliases.filter(s => "" !== s.trim()).forEach(s => bot.aliases.set(s, o.configs.name)));
        }
        const i = o.files.map(s => s.split("/").pop().split(".").shift());
        console.log(bot_msg.loadedCommands.replace("{amount}", o.files.length.toString()).replace("{category}", e ? e : bot_msg.noCmdCategory).replace("{allCmds}", i.join(", ")))
    }
}

startBOT();
