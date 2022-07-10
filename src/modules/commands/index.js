/* eslint-disable no-unused-vars */

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");
function runEachCommand(callback){
	const categories = fs.readdirSync("./src/modules/commands/categories", "utf8");
	for(const category of categories){

		const commands = fs.readdirSync("./src/modules/commands/categories/"+category, "utf8");
		for(const command of commands){
			callback(command, category, commands, categories);
			
		}
	}
}
/**
 * @param {import("discord.js").Client} client 
 */
module.exports = (client) => {
	// god I hate slash commands.
	
	// Get all the commands and remove deleted ones and add new ones

	const unsortedNames = [];

	// Load the categories.
	runEachCommand((command)=> {
		unsortedNames.push(command.split(".")[0]);
	});

	client.on("ready", async () => {
		await client.user.setActivity("The Bot is currently Booting", {type: "PLAYING"});
		// Get all guilds
		client.guilds.cache.forEach((guild) => {
			//	guild.commands.set([]);
		});

		// Delete all global commands too
		//client.application.commands.set([]);

		// Load all the commands.
		const commandsArray = [];

		runEachCommand((command, category) => {
			const commandReturnData = require(`./categories/${category}/${command}`);
			const data = commandReturnData.config.data;
			client.Commands.cache.set(data.name, commandReturnData);
			commandsArray.push(data.toJSON());
		});

		// register the commands
		const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
		try {
			client.Logger.log("Commands are being loaded to the API");
			await rest.put(
				Routes.applicationCommands(client.user.id),
				{body: commandsArray}
			);
			client.emit("loaded");
		} catch (error) {
			console.log(error);
		}
	});

	
};