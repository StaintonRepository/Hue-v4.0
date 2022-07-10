/* eslint-disable no-unused-vars */
const filename = require("path").basename(__filename).split(".")[0];
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
	/**
	 * 
	 * @param {import("discord.js").Client} client 
	 * @param {import("discord.js").CommandInteraction} interaction 
	 */
	run: (client, interaction) =>{
		const ms = new Date() - interaction.createdTimestamp;
		const embed = new MessageEmbed()
			.setTimestamp()
			.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
			.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
			.setTitle("🏓Pong!")
			.setColor("GREEN")
			.setDescription(`${client.user.username} Connection to Discord: \`${ms}ms\``);
			
		interaction.reply({embeds: [embed]});
	},
	config: {
		adminOnly: false,
		enabled: true,
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("Pong!")
			.setDMPermission(true)
	}
};