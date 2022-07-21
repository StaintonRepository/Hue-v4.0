/* eslint-disable no-unused-vars */
module.exports = class Minecraft {
	minecraftID = undefined;
	discordID = undefined;

	created = new Date();
	lastUpdated = new Date();
	editor = {tag: "Unknown#0000", id: "0"};
	
	constructor(minecraftID, discordID, editor = {tag: "Unknown#0000", id: "0"}){
		this.minecraftID = minecraftID;
		this.discordID = discordID;

		this.created = new Date();
		this.lastUpdated = new Date();
		this.editor = editor;
	}

};
