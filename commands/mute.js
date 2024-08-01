module.exports = {
    name: 'mute',
    description: 'Mute a user in the server.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('You do not have permission to manage roles.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You didn\'t mention the user to mute!');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('That user isn\'t in this guild!');
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            try {
                console.log('Creating Muted role...');
                muteRole = await message.guild.roles.create({
                    name: 'Muted',
                    permissions: []
                });

                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.permissionOverwrites.create(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });
                console.log('Muted role created and permissions set.');
            } catch (err) {
                console.error('Error creating Muted role:', err);
                return message.reply('There was an error creating the Muted role.');
            }
        }

        try {
            console.log('Adding Muted role to user...');
            await member.roles.add(muteRole);
            message.reply(`Successfully muted ${user.tag}`);
            console.log(`Successfully muted ${user.tag}`);
        } catch (err) {
            console.error('Error adding Muted role to user:', err);
            message.reply('I was unable to mute the member');
        }
    },
};
