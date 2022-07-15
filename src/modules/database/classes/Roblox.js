/* eslint-disable no-unused-vars */
module.exports = class Roblox {
	robloxID = undefined;
	discordID = undefined;

	created = new Date();
	lastUpdated = new Date();
	editor = {tag: "Unknown#0000", id: "0"};
	
	constructor(robloxID, discordID,  editor){
		this.robloxID = robloxID;
		this.discordID = discordID;

		this.created = new Date();
		this.lastUpdated = new Date();
		this.editor = editor;
	}

};
