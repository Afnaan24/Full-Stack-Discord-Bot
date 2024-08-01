module.exports = {
    name: 'untimeout',
    description: 'Remove timeout from a user.',
    async execute(message, args) {
        if (!message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply('You do not have permission to remove timeout from members.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You didn\'t mention the user to remove timeout from!');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('That user isn\'t in this guild!');
        }

        try {
            await member.timeout(null, `Timeout removed by ${message.author.tag}`);
            message.reply(`Successfully removed timeout from ${user.tag}.`);
        } catch (err) {
            console.error('Error removing timeout from the user:', err);
            message.reply('I was unable to remove the timeout from the member.');
        }
    },
};
