/* eslint-disable no-unused-vars */
const { MongoClient } = require("mongodb");
module.exports = (client) => {
	const url = client.Configuration.Database.MONGO_URI;
	const dbName = client.Configuration.Database.MONGO_DB;

	const functions = {};
	functions.read = (collection, query) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, (err, mongoClient) => {
				if(err) reject(err);
				if(mongoClient.db == undefined) {
					reject(false);
					client.Logger.log("WARNING - Database connection failed.");
				}
				const db = mongoClient.db(dbName);
				db.collection(collection).find(query).toArray((err, result) => {
					if(err) reject(err);
					resolve(result);
					return mongoClient.close(); // VERY IMPORTANT because if you dont close the client memory leaks start to occur. (learnt that the hard way)
				});
			});
		});
	};
	functions.remove = (collection, query) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, (err, mongoClient) => {
				if(err) reject(err);
				const db = mongoClient.db(dbName);
				db.collection(collection).deleteOne(query, (err, result) => {
					if(err) reject(err);
					resolve(result);
					return mongoClient.close(); // VERY IMPORTANT because if you dont close the client memory leaks start to occur. (learnt that the hard way)
				});
			});
		});
	};
	functions.update = (collection, query, newValues) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, (err, mongoClient) => {
				if(err) reject(err);
				const db = mongoClient.db(dbName);
				db.collection(collection).updateOne(query, newValues, (err, result) => {
					if(err) reject(err);
					resolve(result);
					return mongoClient.close(); // VERY IMPORTANT because if you dont close the client memory leaks start to occur. (learnt that the hard way)
				});
			});
		});
	};
	functions.write = (collection, data) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, (err, mongoClient) => {
				if(err) reject(err);
				const db = mongoClient.db(dbName);
				db.collection(collection).insertOne(data, (err, result) => {
					if(err) reject(err);
					resolve(result);
					return mongoClient.close(); // VERY IMPORTANT because if you dont close the client memory leaks start to occur. (learnt that the hard way)
				});
			});
		});
	};

	const Setting = require("./classes/Setting");
	return {
		default: functions,
		default_settings: [
			new Setting(0, "Logging Channel", "A channel to send logs.", "", true, "channel", "General"),
			new Setting(1, "Auto Role", "Auto Role people who join", "none", true, "role", "General"),

			//new Setting(2, "Welcoming", "Welcome new server members.", false, true, "boolean", "General"),
			new Setting(3, "Welcoming-Channel", "Channel for welcome message", "none", true, "channel", "General"),
			new Setting(4, "Welcoming-Text", "The content to send to your welcoming channel if welcoming is enabled.", "Welcome {{user}} to {{guild}}!", true, "string", "General", "https://github.com/ItzRock/Hue-v4.0/blob/main/docs/welcoming%20vars.md"),
			
			/*
				0 = None
				1 = Roblox
				2 = Steam
				3 = Minecraft
			*/
			new Setting(5, "Verification Method", "Method of verification (eg. roblox, steam, minecraft)", 0, true, "verification", "Verification General"),
			new Setting(6, "Verified Role", "Role in which to give the user once verified", "", true, "role", "Verification General"),
			new Setting(7, "Group URL", "URL for the either Roblox or Steam group", "", true, "string", "Verification General"),
			new Setting(8, "Group Member Required", "If the player needs to be a group member first", false, true, "boolean", "Verification General"),
			//new Setting(9, "Force Game Name", "Force the in-game name", false, true, "boolean", "Verification General"),
			
			// See "./name_formatting.txt"
			new Setting(10, "Name Formatting", "Formatting of in-game name", "{{platform_name}}", true, "string", "Verification General", "https://github.com/ItzRock/Hue-v4.0/blob/main/docs/name_formatting.md"),
			

			// Roblox Verification
			new Setting(11, "role_binds", "If Roblox Verification should be enabled or not", [], false, "object", "Roblox Verification"),
			new Setting(12, "Auto Find Roles", "Automatically finds the Roblox role and tries to match it to a discord rank", false, true, "boolean", "Roblox Verification"),
		],
		settings: require("./db/settings.js")(client, functions),
		roblox: require("./db/roblox.js")(client, functions),
		minecarft: require("./db/minecraft.js")(client, functions),
		steam: require("./db/steam.js")(client, functions),
	};
};