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
		runEachCommand: async (callback) => {
			const categories = fs.readdirSync("./src/modules/commands/categories", "utf8");
			for(const category of categories){
		
				const commands = fs.readdirSync("./src/modules/commands/categories/"+category, "utf8");
				for(const command of commands){
					await callback(command, category, commands, categories);
					
				}
			}
		},
		load: async (name, category) => {
			const rawData = require(`./categories/${category}/${name}`);
			let returnedData = rawData;
			if(typeof(rawData) == "function") {
				returnedData = await rawData(client);
			}
			
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
		client.user.setActivity("BOOTING", {type: "PLAYING"});

		// Load all the commands
		await functions.runEachCommand(functions.load);

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