/* eslint-disable no-unused-vars */
const SteamClass = require("../classes/Steam");
module.exports = (client, dbFunctions) => {
	return {
		read: (id) => {
			return dbFunctions.read("steam", { "discordID": id });
		},
		write: (discordID, steamID) => {
			const data = new SteamClass(discordID, steamID);
			return dbFunctions.write("steam", data);
		},
		update: async (discordID, steamID, editor) => {
			const oldData = (await dbFunctions.read("steam", { "discordID": discordID }))[0];
			console.log(oldData);
			const data = new SteamClass(steamID, discordID, editor);
			data.created = oldData.created;
			return dbFunctions.update("steam", { "discordID": discordID },{$set: data});
		}
	};
};