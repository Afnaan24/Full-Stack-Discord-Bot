module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    execute(message) {
        const { guild } = message;
        const serverInfo = `
            Server Name: ${guild.name}
            Total Members: ${guild.memberCount}
        `;
        message.channel.send(serverInfo);
    },
};
