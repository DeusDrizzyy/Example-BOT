/*
  Description of repeated settings:
    • wrongChat - Message if the player tries to use this command on channels other than the allowed ones.
    • failedDM - The error the user will receive if the private is locked.
*/

module.exports = {
    application: {
        loadCmds: 'Loading commands...',
        Connecting: 'Connecting the BOT...',
        /**
         *   List of Placeholders:
         *     • {amount} - Number of commands loaded into the category.
         *     • {category} - The name of the command category.
         *     • {allCmds} - The name of all the commands that have been loaded.
         */
        loadedCommands: 'Were loaded {amount} commands in category {category}. [{allCmds}]',
        // Message in the console if the application starts successfully.
        onlineBOT: 'The bot {name} has been successfully started. With {users} users, {channels} channels and {guilds} servers.',
        // Message if the player uses a command that is missing required settings.
        needConfig: '{user} The command you are trying to use has not been configured correctly.',
        noCmdCategory: 'Nothing', // Category name if the command is not in a category ( e.g. "/commands/template.js" ).
    },
    commands: {
        template: { // This must be the same name that you put in the command settings. ( e.g. module.exports.configs = { name: 'template' } )
            wrongChat: '{user} You need to be on the command channel to use this command.',
        },
        ip: {
            wrongChat: '{user} You need to be on the command channel to use this command.',
            // Message that the player will receive if the API is offline.
            error: '{user} At the moment the verification API is offline, please try again later...',
            embed: {
                color: '#202225', // The color in HEX that will be used in the message. ( Default: #202225 )
                title: ':white_small_square: Server Information:',
                /**
                 *   List of Placeholders:
                 *     • {players} - Number of players online on the server.
                 *     • {serverIP} - The IP address of the server. ( Configurable in config.js )
                 *     • {status} - The current status of the server ( Online / Offline ).
                 */
                description: 'We are currently with** {players} **players in our network.\n\n🔱 **IP:** {serverIP}\n⚜️ **Version:** 1.8x - 1.17x\n🔸 **Status:** {status}',
            },
        },
        shop: {
            dm: { // If enabled, the user will receive the message only in his private.
                enabled: false,
                failedDM: '{user} Enable receiving direct messages from server members.',
            },
            wrongChat: '{user} You need to be on the command channel to use this command.',
            message: '🔸» {user} Store Link: <https://store.example.com>',
        },
        help: {
            wrongChat: '{user} You need to be on the command channel to use this command.',
            failedDM: '{user} Enable receiving direct messages from server members.',
            reaction: {
                enabled: true, // Do you want the message with the user command to get a reaction?
                reaction: '👍', // Put the reaction that will be added in the message.
            },
            embed: {
                color: '#202225', // The color in HEX that will be used in the message. ( Default: #202225 )
                title: 'List of Commands:',
                description: 'See below for a list of all commands.\n\n{commands}',
            },
            commands: [
                '**.help** - See the list of released commands.',
                '**.ip** - Shows information about the server.',
                '**.shop** - Get the link from the official server store.',
            ],
        },
    },
};
