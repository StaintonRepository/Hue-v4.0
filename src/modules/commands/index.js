/* eslint-disable no-unused-vars */
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

/**
 * @param {import("discord.js").Client} client 
 */
module.exports = (client) => {
	// god I hate slash commands.
	client.rawCommands = new Map();

	const functions = {
		runEachCommand: (callback) => {
			const categories = fs.readdirSync("./src/modules/commands/categories", "utf8");
			for(const category of categories){
		
				const commands = fs.readdirSync("./src/modules/commands/categories/"+category, "utf8");
				for(const command of commands){
					callback(command, category, commands, categories);
					
				}
			}
		},
		load: (name, category) => {
			const returnedData = require(`./categories/${category}/${name}`);
			const data = returnedData.config.data;
			client.Commands.cache.set(data.name, returnedData);
			client.rawCommands.set(data.name, data.toJSON());
		},
		unload: (name) => {
			client.Commands.cache.delete(name);
			client.rawCommands.delete(name);
		},
	};
	functions.reload = (name) => {
		const category = client.Commands.cache.get(name).category;
		functions.unload(name);
		functions.load(name, category);
	};

	client.on("ready", async () => {
		await client.user.setActivity("The Bot is currently Booting", {type: "PLAYING"});
		// Get all guilds
		client.guilds.cache.forEach((guild) => {
			//	guild.commands.set([]);
		});

		// Load all the commands
		functions.runEachCommand(functions.load);

		// register the commands
		const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
		try {
			client.Logger.log("Commands are being loaded to the API");
			await rest.put(
				Routes.applicationCommands(client.user.id),
				{body: Array.from(client.rawCommands.values())}
			);
			client.emit("loaded");
		} catch (error) {
			console.log(error);
		}
	});
	return functions;
};