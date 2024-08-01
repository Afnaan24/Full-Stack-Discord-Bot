module.exports = {
    name: 'unmute',
    description: 'Unmute a user in the server.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('You do not have permission to manage roles.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You didn\'t mention the user to unmute!');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('That user isn\'t in this guild!');
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('Muted role does not exist!');
        }

        try {
            await member.roles.remove(muteRole);
            message.reply(`Successfully unmuted ${user.tag}`);
        } catch (err) {
            console.error(err);
            message.reply('I was unable to unmute the member');
        }
    },
};
