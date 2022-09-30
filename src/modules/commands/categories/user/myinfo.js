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
	run: async (client, interaction) =>{
		await interaction.reply("Collecting Database Information...");
		
		const embed = new MessageEmbed()
			.setTimestamp()
			.setAuthor({name: client.user.username, iconURL: client.user.avatarURL(), dynmaic: true})
			.setFooter({text: client.user.username, iconURL: client.user.avatarURL(), dynmaic: true})
			.setTitle("Database Information")
			.setColor("GREEN")
			.setDescription("First Apperance: <t:0>\nLast Modified: <t:0>\nModified By: `System#0000`")
			.setThumbnail(interaction.user.avatarURL({size: 4096, dynamic: true}))
			.setFields([
				{name: "Steam Information", value: "Steam Username: `Anthony`\nSteam ID: `STEAM_0:0:105215865`\nSteam ID64: `76561198170697458`\nDate Recorded: <t:0>\n", inline: false},
				{name: "Minecraft Information", value: "Minecraft Username: `ItzRock`\nMinecraft UUID: `b25cfd78-aeac-4dbc-a94c-20f54b6e9c91`\nDate Recorded: <t:0>\n", inline: false},
				{name: "Roblox Information", value: "Roblox Username: `Anthonycanada`\nRoblox ID: `66997500`\nDate Recorded: <t:0>\n", inline: false},
				
			]);


		interaction.editReply({embeds: [embed], content: null});

	},
	config: {
		adminOnly: false,
		enabled: true,
		// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
		category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("Fetch your database information")
			.setDMPermission(true)
	}
};