module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a specified duration (in minutes).',
    async execute(message, args) {
        if (!message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply('You do not have permission to timeout members.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You didn\'t mention the user to timeout!');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('That user isn\'t in this guild!');
        }

        const duration = parseInt(args[1], 10);
        if (isNaN(duration) || duration <= 0) {
            return message.reply('Please specify a valid duration in minutes.');
        }

        try {
            const timeoutDuration = duration * 60 * 1000; // Convert minutes to milliseconds
            await member.timeout(timeoutDuration, `Timed out by ${message.author.tag}`);
            message.reply(`Successfully timed out ${user.tag} for ${duration} minutes.`);
        } catch (err) {
            console.error('Error timing out the user:', err);
            message.reply('I was unable to timeout the member.');
        }
    },
};
