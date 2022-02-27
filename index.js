const { Client, Collection } = require("discord.js");
const { token, prefix } = require('./configs/config');
const { application, commands } = require('./configs/messages');
const { searchFiles } = require('./functions/getFiles');
const bot = new Client({});

bot.commands = new Collection();
bot.aliases = new Collection();

bot.on("ready", () => {
    console.log(application.onlineBOT.replace('{botName}', bot.user.username).replace('{allBotUsers}', bot.users.cache.size.toString()).replace('{allBotChannels}', bot.channels.cache.size.toString()).replace('{allBotGuilds}', bot.guilds.cache.size.toString()));
    console.log(`Developed by DeusDrizzyy#4763.`);
});

function getCommand(bot, name) {
    name = name.slice(prefix.length);
    let cmd = bot.commands.get(name);
    return cmd || bot.commands.get(bot.aliases.get(name));
}

bot.on("message", async message => {
    if (message.author.bot || message.channel.type !== "text") return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.split(" "), cmd = args.shift(), command = await getCommand(bot, cmd);
    if (!command) return;
    if (!command.configs || !command.configs.name) return message.channel.send(application.needConfig.replace('{user}', message.author));

    if (command.configs.allowedChats && !command.configs.allowedChats.some(cts => message.channel.id.includes(cts))) {
        return message.channel.send(commands[command.configs.name].wrongChat.replace('{user}', message.author));
    } else {
        command.run(bot, message, args);
    }
});

function loadAllCommands(s) {
    for (const o of searchFiles(s, "js")) {
        const s = o.directory.split("/");
        s.shift() && s.shift();
        const e = s.join("/");
        for (const s of o.files) {
            let o = require(s);
            o.configs && bot.commands.set(o.configs.name, o);
            (o.configs.aliases && o.configs.aliases.filter(s => "" !== s.trim()).forEach(s => bot.aliases.set(s, o.configs.name)));
        }
        const i = o.files.map(s => s.split("/").pop().split(".").shift());
        console.log(application.loadedCommands.replace("{amount}", o.files.length.toString()).replace("{category}", e ? e : application.noCmdCategory).replace("{allCmds}", i.join(", ")));
    }
}

function startBOT() {
    console.log(application.loadCmds);
    loadAllCommands('./commands');

    console.log(application.Connecting);
    bot.login(token);
}

startBOT();
