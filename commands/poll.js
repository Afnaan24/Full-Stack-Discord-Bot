const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll with reaction options.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('You do not have permission to create polls.');
        }

        const [question, ...options] = args.join(' ').split('|').map(str => str.trim());

        if (!question) {
            return message.reply('Please provide a question for the poll.');
        }

        if (options.length < 2) {
            return message.reply('Please provide at least two options for the poll.');
        }

        if (options.length > 10) {
            return message.reply('You can only provide up to 10 options for the poll.');
        }

        const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

        let pollDescription = '';
        for (let i = 0; i < options.length; i++) {
            pollDescription += `${reactions[i]} ${options[i]}\n`;
        }

        const pollEmbed = new EmbedBuilder()
            .setTitle(question)
            .setDescription(pollDescription)
            .setColor(0x3498db)  // Use a valid hexadecimal color
            .setFooter({ text: `Poll created by ${message.author.username}` });

        try {
            const pollMessage = await message.channel.send({ embeds: [pollEmbed] });

            for (let i = 0; i < options.length; i++) {
                await pollMessage.react(reactions[i]);
            }

            message.delete();
        } catch (err) {
            console.error('Error creating poll:', err);
            message.reply('There was an error creating the poll.');
        }
    },
};
