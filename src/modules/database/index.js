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

	return {
		default: functions,
		settings: require("./db/settings.js")(client, functions),
		roblox: require("./db/roblox.js")(client, functions),
		minecarft: require("./db/minecarft.js")(client, functions),
		steam: require("./db/steam.js")(client, functions),
	};
};