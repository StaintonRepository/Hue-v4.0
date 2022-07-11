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
		const input = interaction.options.getString("input", true);
		if(!input) throw new Error("Couldn't find input arguement");
		else {
			const command = client.Commands.cache.get(input.toLowerCase());
			if(!command) {
				// try to find and load it
				const cmdList = [];
				client.Modules.get("commands").runEachCommand((name,category) => {
					if(name == input) cmdList.push([name,category]);
				});
				if(cmdList[0]){
					client.Modules.get("commands").load(cmdList[0][0], cmdList[0][1]);
					return interaction.reply(interaction.emojis.check + " Command not found, but I've loaded it for you!");
				}else return interaction.reply(interaction.emojis.x + " Cannot find specified command");
			} else {
				// reload it
				client.Modules.get("commands").unload(command.config.data.name);
				client.Modules.get("commands").load(command.config.data.name, command.config.category);
				return interaction.reply(interaction.emojis.check + " Command reloaded!");
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
			.setDescription("Reload a command")
			.setDMPermission(true)
			.addStringOption(option => 
				option.setName("input")
					.setDescription("A command")
					.setRequired(true))

	}
};