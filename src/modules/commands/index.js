
const fs = require("fs");
/* eslint-disable no-unused-vars */
/**
 * @param {import("discord.js").Client} client 
 */
module.exports = (client) => {
	// god I hate slash commands.
	
	// Get all the commands and remove deleted ones and add new ones

	const unsortedNames = [];

	// Load the categories.
	const categories = fs.readdirSync("./src/modules/commands/categories", "utf8");
	for(const category of categories){

		const commands = fs.readdirSync("./src/modules/commands/categories/"+category, "utf8");
		for(const command of commands){
			unsortedNames.push(command.split(".")[0]);
		}
	}

	client.on("ready", () => {
		// Get all guilds
		client.guilds.cache.forEach((guild) => {
			// Get all the commands and remove them all.
			guild.commands.cache.forEach(async (command) => {
				await command.delete();
			});
		});

		// Delete all global commands too
		client.application.commands.cache.forEach(async (command) => {
			await command.delete();
		});
	});

	
};