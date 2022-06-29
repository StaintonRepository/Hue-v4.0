/*
	Before you run the bot make sure you have a ".env" file with 'TOKEN = "insert token here" ' to prevent running into errors
*/

/* eslint-disable no-unused-vars */
const { Client, Intents } = require("discord.js");
const { config } = require("dotenv"); config();
const fs = require("fs");

const NECos = new Client({
	intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
	allowedMentions: {
		// incase we want to just parse it through the bot. 
		// parse: ["everyone", "roles"]
	}
});

// Load the modules.
NECos.Modules = new Map();

const modulesFolder = fs.readdirSync("./src/modules");
for(const filename of modulesFolder){
	const modName = filename.split(".")[0];
	const mod = require(`./modules/${filename}`)(NECos);
	NECos.Modules.set(modName, mod);
}

NECos.login(process.env.TOKEN);