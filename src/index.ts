/* eslint-disable @typescript-eslint/no-var-requires */
/*
	Hue v4.0
	Made by Anthony

*/
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");

const client = new Client({
	intents: [
		GatewayIntentBits.DIRECT_MESSAGES,
		GatewayIntentBits.GUILDS,
		GatewayIntentBits.GUILD_BANS,
		GatewayIntentBits.GUILD_MEMBERS,
		GatewayIntentBits.GUILD_MESSAGES,
	],
	partials: [
		Partials.Channel,
		Partials.User,
		Partials.GuildMember,
		Partials.Message,
		Partials.ThreadMember
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
client.login(client.Configuration.Client.TOKEN);

process.on("unhandledRejection", (error) => {
	client.Logger.error(error);
});