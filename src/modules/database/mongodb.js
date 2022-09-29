const { MongoClient } = require("mongodb");
module.exports = (client, functions) => {
	const url = client.Configuration.Database.Host;
	const dbName = client.Configuration.Database.Database;

	functions.connect = () => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
				if(err) reject(err);
				else {
					functions.client = client;
					functions.db = client.db(dbName);
					resolve();
				}
			});
		});
	};
	functions.read = (collection, query) => {
		return new Promise((resolve, reject) => {
			functions.db.collection(collection).find(query).toArray((err, result) => {
				if(err) reject(err);
				else resolve(result);
			});
		});
	};

	functions.remove = (collection, query) => {
		return new Promise((resolve, reject) => {
			functions.db.collection(collection).deleteOne(query, (err, result) => {
				if(err) reject(err);
				resolve(result);
			});
		});
	};
	functions.update = (collection, query, newValues) => {
		return new Promise((resolve, reject) => {
			functions.db.collection(collection).updateOne(query, newValues, (err, result) => {
				if(err) reject(err);
				resolve(result);
			});
		});
	};
	functions.write = (collection, data) => {
		return new Promise((resolve, reject) => {
			functions.db.collection(collection).insertOne(data, (err, result) => {
				if(err) reject(err);
				resolve(result);
			});
		});
	};
};