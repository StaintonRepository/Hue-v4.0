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
				if(mongoClient == undefined) {
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
			new Setting("Logging Channel", "A channel to send logs.", "", true, "channel", "General"),
			new Setting("Auto Role", "Automatically role people who join your server.", "", true, "role", "General"),

			new Setting("Welcoming", "Automatically welcome people who join your server.", false, true, "boolean", "General"),
			new Setting("Welcoming-Channel", "Decide which channel to send the welcoming message.", "", true, "channel", "General"),
			new Setting("Welcoming-Text", "The content to send to your welcoming channel if welcoming is enabled.", "Welcome {{user}} to {{guild}}!", true, "string", "General"),
			
			/*
				0 = None
				1 = Roblox
				2 = Steam
				3 = Minecraft
			*/
			new Setting("verification_current", undefined, 0, false, "number"),
			new Setting("Verified Role", "Role in which to give the user once verified", "", true, "role", "Verification General"),
			new Setting("Group URL", "URL for the either Roblox or Steam group", "", true, "string", "Verification General"),
			new Setting("Group Member Required", "If the user should be in the roblox / steam group to verify", false, true, "boolean", "Verification General"),
			new Setting("Force Game Name", "Should the bot make the user carry their minecraft / roblox / steam name in this server?", false, true, "boolean", "Verification General"),
			
			// See "./name_formatting.txt"
			new Setting("Name Formatting", "Force Game Name needs to be enabled to change this", "{{platform_name}}", true, "string", "Verification General"),
			

			// Roblox Verification
			new Setting("Roblox Verification", "If Roblox Verification should be enabled or not", false, true, "boolean", "Roblox"),
			new Setting("role_binds", "If Roblox Verification should be enabled or not", [], false, "object", "Roblox"),
			new Setting("Auto Find Roles", "Automatically finds the Roblox role and tries to match it to a discord rank", false, true, "boolean", "Roblox"),
			
			// Steam Verification
			new Setting("Steam Verification", "If Steam Verification should be enabled or not", false, true, "boolean", "Steam"),
			
			// Minecraft Verification
			new Setting("Minecraft Verification", "If Minecraft Verification should be enabled or not", false, true, "boolean", "Minecraft"),
		],
		settings: require("./db/settings.js")(client, functions),
		roblox: require("./db/roblox.js")(client, functions),
		minecarft: require("./db/minecraft.js")(client, functions),
		steam: require("./db/steam.js")(client, functions),
	};
};