/* eslint-disable no-unused-vars */
const filename = require("path").basename(__filename).split(".")[0];
const { SlashCommandBuilder } = require("@discordjs/builders");

const { promisify } = require("util");
const readFile = promisify(require("fs").readFile); 

module.exports = {
	/**
	 * 
	 * @param {import("discord.js").Client} client 
	 * @param {import("discord.js").CommandInteraction} interaction 
	 */
	run: async (client, interaction) =>{
		const input = interaction.options.getString("input", true);
		if(!input) throw new Error("Couldn't find input arguement");
		else {
			const command = client.Commands.cache.get(input.toLowerCase());
			if(!command) return interaction.reply(interaction.emojis.x + " Cannot find specified command");
			let directory = `${command.config.category}/${command.config.data.name}.js`;
			const data = (await readFile("./src/modules/commands/categories/" + directory)).toString();
			const clean = await client.cleanText(client, data);
			interaction.reply({
				files: [{
					name:  command.config.data.name + ".js",
					attachment: new Buffer.from(clean)
				}]
			});
		}
	},
	config: {
		adminOnly: false,
		enabled: true,
		// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
		category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("Get the source of a command.")
			.setDMPermission(true)
			.addStringOption(option => 
				option.setName("input")
					.setDescription("A command")
					.setRequired(true))

	}
};