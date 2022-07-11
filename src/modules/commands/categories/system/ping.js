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
		// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
		category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("Pong!")
			.setDMPermission(true)
	}
};