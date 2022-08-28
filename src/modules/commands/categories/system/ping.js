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
		const msg = await interaction.reply("Pinging...");
		const ms = new Date() - interaction.createdTimestamp;
		const beforeDB = new Date();
		const db = await client.Modules.get("database").default.read("test", {id: "test"});
		const afterDB = new Date();
		let description = `Message response time: \`${ms}ms\`
		Message time to send: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\`
		${client.user.username} Database Connection: \`${afterDB - beforeDB}ms\`
		API response time: \`${Math.round(client.ws.ping)}ms\`;

		`;
		const embed = new MessageEmbed()
			.setTimestamp()
			.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
			.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
			.setTitle("🏓Pong!")
			.setColor("GREEN")
			.setDescription(description);
			
		msg.editReply({embeds: [embed], content: null});

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