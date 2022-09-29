const mysql = require("mysql2");
module.exports = (client, functions) => {
	const host = client.Configuration.Database.Host;
	const port = client.Configuration.Database.Port;
	const user = client.Configuration.Database.User;
	const password = client.Configuration.Database.Password;
	const database = client.Configuration.Database.Database;


	functions.connect = () => {
		return new Promise((resolve, reject) => {
			try {
				functions.db = mysql.createConnection({
					host: host,
					port: port,
					user: user,
					password: password,
					database: database
				});
				resolve();	
			} catch (error) {
				reject(error);
			}
		});
	};
	functions.read = (collection, query) => {
		return new Promise((resolve, reject) => {
			if(query.entries().length == 0) reject("No entries provided");
			functions.db.query({ sql: `SELECT * FROM ${collection} WHERE ${query.entries[0][0]} == "${query.entries[0][1]}"`, rowsAsArray: true }, function(err, results, fields) {
				if(err) reject(err);
				else resolve(fields);
			});
		});
	};

	functions.remove = (collection, query) => {
		return console.log("Not implemented");

		return new Promise((resolve, reject) => {
			functions.db.collection(collection).deleteOne(query, (err, result) => {
				if(err) reject(err);
				resolve(result);
			});
		});
	};
	functions.update = (collection, query, newValues) => {
		return console.log("Not implemented");

		return new Promise((resolve, reject) => {
			functions.db.collection(collection).updateOne(query, newValues, (err, result) => {
				if(err) reject(err);
				resolve(result);
			});
		});
	};
	functions.write = (collection, data) => {
		return console.log("Not implemented");
		return new Promise((resolve, reject) => {
			functions.db.collection(collection).insertOne(data, (err, result) => {
				if(err) reject(err);
				resolve(result);
			});
		});
	};
};