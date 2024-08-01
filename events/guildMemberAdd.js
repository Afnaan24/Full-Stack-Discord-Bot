module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const channel = member.guild.channels.cache.get('707872605549625356');
        if (channel) {
            channel.send(`Welcome to the server, ${member}!`);
        }
    },
};
