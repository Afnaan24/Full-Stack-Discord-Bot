module.exports = {
    name: 'userinfo',
    description: 'Displays information about the user.',
    execute(message) {
        const userInfo = `
            Your Username: ${message.author.username}
            Your ID: ${message.author.id}
        `;
        message.channel.send(userInfo);
    },
};
