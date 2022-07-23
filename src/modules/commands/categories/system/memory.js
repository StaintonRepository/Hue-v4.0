/* eslint-disable no-unused-vars */
const filename = require("path").basename(__filename).split(".")[0];
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const os = require("os");
module.exports = {
	/**
	 * 
	 * @param {import("discord.js").Client} client 
	 * @param {import("discord.js").CommandInteraction} interaction 
	 */
	run: async (client, interaction) =>{
		function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+""+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d];}
		
		// Stolen from hue v3
		const hueUsed = formatBytes(process.memoryUsage().heapUsed);
		const total = formatBytes(os.totalmem());
		const freemem = formatBytes(os.freemem());
		const usage = formatBytes(os.totalmem() - os.freemem());
		const percentage = Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100);

		const embed = new MessageEmbed()
			.setTitle(`${client.user.username} Memory Usage`)
			.setColor("GREEN")
			.addFields(
				{name: "Memory Installed", value: `\`${total}\``, inline: true},
				{name: "Memory Usage", value: `\`${usage}/${total} (${percentage}%)\``, inline: true},
				{name: `${client.user.username} Used Memory`, value: `\`${hueUsed}\``, inline: true},
			)
			.setFooter({
				text: client.user.username,
				iconURL: client.user.avatarURL()
			})
			.setTimestamp()
			.setAuthor({
				name: client.user.username,
				iconURL: client.user.avatarURL()
			});
	
		interaction.reply({embeds: [embed]});
	},
	config: {
		adminOnly: true,
		enabled: true,
		// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
		category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("View the memory usage of the bot")
			.setDMPermission(true)
	}
};