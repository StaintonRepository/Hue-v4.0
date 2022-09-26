/*
	Hue v4.0
	Made by Anthony

*/
const { Client } = require("discord.js");
const fs = require("fs");

const client = new Client({
	intents: [
		"DIRECT_MESSAGES", "GUILDS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES"
	],
	allowedMentions: {
		// incase we want to just parse it through the bot. 
		// parse: ["everyone", "roles"]
	}
});
client.Configuration = require("./configuration.json");
// Load directly the logger because thats important lol!
client.Logger = require("./modules/Logger")(client);

// Load the modules.
client.Modules = new Map();

const modulesFolder = fs.readdirSync("./src/modules");
for(const filename of modulesFolder){
	client.Logger.log("Loading module: " + filename);
	const modName = filename.split(".")[0];
	const mod = require(`./modules/${filename}`)(client);
	client.Modules.set(modName, mod);
}

// Connect to Database.
client.Logger.log("Connecting to Database.");
client.Modules.get("database").connect();

client.login(client.Configuration.TOKEN);

process.on("unhandledRejection", (error) => {
	client.Logger.error(error);
});