/* eslint-disable no-unused-vars */
module.exports = class Steam {
	steamID64 = undefined;
	discordID = undefined;

	created = new Date();
	lastUpdated = new Date();
	editor = {tag: "Unknown#0000", id: "0"};
	
	constructor(steamID64, discordID, editor = {tag: "Unknown#0000", id: "0"}){
		this.steamID64 = steamID64;
		this.discordID = discordID;

		this.created = new Date();
		this.lastUpdated = new Date();
		this.editor = editor;
	}

};
