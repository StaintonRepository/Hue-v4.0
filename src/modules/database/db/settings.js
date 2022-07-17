/* eslint-disable no-unused-vars */
const SettingsClass = require("../classes/Setting");
module.exports = (client, dbFunctions) => {
	const functions = {};
	functions.create = (id) => {
		return dbFunctions.write("server_settings", {
			GuildID: id,
			Settings: client.Modules.get("database").default_settings
		}).then((data)=> {return data;});
	};
	functions.update = (id, newValues) => {
		return dbFunctions.update("server_settings", {GuildID: id}, {$set: { Settings: newValues}}).then((data)=> {return data;});
	};
	functions.get = (id) => {
		return dbFunctions.read("server_settings", { GuildID: id}).then((data) => {
			if(data.length == 0) {
				functions.create(id);
				return {
					GuildID: id,
					Settings: client.Modules.get("database").default_settings
				};
			}
			else {
				// Compare and make sure the db has new configig items.
				// First make a map of default settings
				const default_settings = client.Modules.get("database").default_settings;
				const default_settings_map = new Map();
				for(const key of default_settings) {
					default_settings_map.set(key.id, key);
				}

				// Then do it again with our db settings
				const db_settings = data[0].Settings;
				const db_settings_map = new Map();
				for(const key of db_settings) {
					db_settings_map.set(key.id, key);
				}
				// Compare them and add any new ones
				for(const key of default_settings) {
					if(!db_settings_map.has(key.id)) {
						db_settings_map.set(key.id, key);
					}
				}

				// Now check if there are any guild settings which dont exist anymore
				for(const key of db_settings) {
					if(!default_settings_map.has(key.id)) {
						db_settings_map.delete(key.id);
					}
				}

				// Update the database and return the new settings
				const db = {GuildID: id,Settings: Array.from(db_settings_map.values())};
				functions.update(id, db.Settings);
				return db;
			}
		}).catch((err) => {
			console.log(err);
			return {
				GuildID: id,
				Settings: client.Modules.get("database").default_settings
			};
		});
	};

	return functions;
};