/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Guild} guild 
 */
module.exports = async (client, guild) => {
	const loggingChannel = client.channels.cache.get(client.Configuration.Channels.DevLogs);

	let avatar = guild.iconURL({ format: "png", size: 1024, dynamic: true });
	let permissions = guild.me.permissions.toArray().join(", ");
	if(guild.me.permissions.toArray().includes("ADMINISTRATOR")) permissions = "ADMINISTRATOR";
	if(permissions.length > 150) permissions = permissions.substring(0,140) + "...";
	const embed = new MessageEmbed()
		.setTimestamp()
		.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
		.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
		.setColor("GREEN")
		.setTitle(`${client.user.username} has joined a new guild! (${client.guilds.cache.size} guilds)`)
		.setDescription(`${client.user.username} has joined **${guild.name}** which has \`${guild.memberCount}\` members.`)
		.setThumbnail(avatar == undefined ? client.user.avatarURL({ format: "png", size: 1024, dynamic: true }) : avatar);

	const showMore = new MessageButton()
		.setCustomId(`showmore_${guild.id}`)
		.setLabel("More Information")
		.setStyle("PRIMARY");
	const remove = new MessageButton()
		.setCustomId(`remove_${guild.id}`)
		.setLabel("Remove Guild")
		.setStyle("DANGER");


	const actionRow = new MessageActionRow()
		.addComponents(showMore, remove);
	if(loggingChannel) loggingChannel.send({embeds: [embed], components: [actionRow]});

	client.on(`showmore_${guild.id}`, interaction => {
		console.log("showmore");
		const embed = new MessageEmbed()
			.setTimestamp()
			.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
			.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
			.setColor("GREEN")
			.setTitle(`More information about ${guild.name}`)
			.addFields(
				{ name: "Basic Information", value: `Guild Name: \`${guild.name}\`\nGuild ID: \`${guild.id}\`\nGuild Owner: \`${client.users.cache.get(guild.ownerId).username}#${client.users.cache.get(guild.ownerId).discriminator}\``, inline: true },
				{ name: "Guild Information", value: `Guild Member Count: \`${guild.memberCount}\`\nGuild Verification Level: \`${guild.verificationLevel}\`\nGuild Language: \`${guild.preferredLocale}\``, inline: true },
				{ name: "Guild Permissions", value: `\`${permissions}\``, inline: true },
			);
		interaction.reply({embeds: [embed]});

	});
};
