module.exports = {
    application: {
        loadCmds: 'Loading commands...',
        Connecting: 'Connecting the BOT...',
        loadedCommands: 'Were loaded {amount} commands in category {category}. [{allCmds}]',
        onlineBOT: 'The bot {botName} has been successfully started. With {allBotUsers} users, {allBotChannels} channels and {allBotGuilds} servers.',
        needConfig: '{user} The command you are trying to use has not been configured correctly.',
        noCmdCategory: 'Nothing', // Category name if the command is not in a category ( e.g. "/commands/template.js" ).
    },
    commands: {
        template: {
            // This must be the same name that you put in the command settings. ( e.g. module.exports.configs = { name: "template" } )
            wrongChat: '{user} You need to be on the command channel to use this command.',
        },
        ip: {
            wrongChat: '{user} You need to be on the command channel to use this command.',
            apiError: '{user} The check could not be performed, please check the console.',
            embedMessages: {
                EmbedColor: '#ff7f00',
                Title: ':white_small_square: Server Information:',
                Description: 'We are currently with** {players} **players in our network.\n\n🔱 **IP:** {serverIP}\n⚜️ **Version:** 1.8x - 1.17x\n🔸 **Status:** {status}',
            },
        },
        shop: {
            wrongChat: '{user} You need to be on the command channel to use this command.',
            message: ':small_orange_diamond:» {user} Store Link: <https://store.example.com>',
        },
        help: {
            wrongChat: '{user} You need to be on the command channel to use this command.',
            privateLock: '{user} Enable receiving direct messages from server members.',
            reaction: {
                enabled: true,
                reaction: '👍',
            },
            embedMessages: {
                EmbedColor: '#ff7f00',
                Title: 'List of Commands:',
                Description: 'See below for a list of all commands.\n\n{commands}',
            },
            commands: [
                '**.help** - See the list of released commands.',
                '**.ip** - Shows information about the server.',
                '**.shop** - Get the link from the official server store.',
            ],
        },
    },
};
