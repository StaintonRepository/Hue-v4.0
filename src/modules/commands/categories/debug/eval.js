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
		const javascript = interaction.options.getString("input", true);
		if(!javascript) throw new Error("Couldn't find javascript arguement");
		else {
			try {
				const evaled = eval(javascript);
				const cleaned = await client.cleanText(client, evaled);

				const messageSettings = {
					content: interaction.emojis.check + " `Success!`",
					files: [{
						name: "eval.js",
						attachment: new Buffer.from(cleaned)
					}]
				};
				interaction.reply(messageSettings);	
			} catch (error) {
				const messageSettings = {
					content: interaction.emojis.x + " `Failed!`",
					files: [{
						name: "eval.js",
						attachment: new Buffer.from(await client.cleanText(client, error))
					}]
				};
				interaction.channel.send(messageSettings);
				// We're not gonna reply to the interaction so that we can re submit the command	
			}
		}
	},
	config: {
		adminOnly: true,
		enabled: true,
		// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
		category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("/eval bot.token!!!! im suhc a hacker!")
			.setDMPermission(true)
			.addStringOption(option => 
				option.setName("input")
					.setDescription("The Javascript code to evaluate.")
					.setRequired(true))


	}
};