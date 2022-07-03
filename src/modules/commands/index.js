
const fs = require("fs");
/* eslint-disable no-unused-vars */
module.exports = (NECos) => {
	// Ahhh this is gonna be a pain in the ass.

	// First get an array of all the commands unsorted.
	const unsorted = [];

	const categories = fs.readdirSync("./src/modules/commands/categories", "utf8");
	for(const category of categories){
		const commands = fs.readdirSync("./src/modules/commands/categories/"+category, "utf8");
		for(const command of commands){
			unsorted.push(command.split(".")[0]);
		}
	}

	// Now check all guilds to see if they have that command.
	// Do this so that we can access guilds.
	NECos.on("ready", () => {
		NECos.guilds.cache.forEach(guild => {
			
		});
	});
	console.log(unsorted);
};