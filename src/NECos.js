/*
	NECos JS v2.0
	Made by Anthony
	(idk why they put me in charge of programming my bot's replacement)


	Before you run the bot make sure you have a ".env" file with 'TOKEN = "insert token here" ' to prevent running into errors
*/
const { Client } = require("discord.js");
const { config } = require("dotenv"); config();
require("toml-require").install();
const fs = require("fs");

const client = new Client({
	intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
	allowedMentions: {
		// incase we want to just parse it through the bot. 
		// parse: ["everyone", "roles"]
	}
});
client.Configuration = require("../configuration.toml");
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

// Login to the bot (if this parts errors create a .env and add TOKEN = "insert token here" )
client.login(process.env.TOKEN);