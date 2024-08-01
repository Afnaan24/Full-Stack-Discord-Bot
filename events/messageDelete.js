module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (message.partial) return; // If the message is not fully cached, we can't provide any useful information.

        // Find the channel named 'logs' to send the log message
        const logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
        if (!logChannel) return;

        // Send a message to the log channel
        logChannel.send(`A message by ${message.author.tag} was deleted: ${message.content}`);
    },
};
