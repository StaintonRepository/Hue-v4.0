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
	functions.get = (id) => {
		return dbFunctions.read("server_settings", { GuildID: id}).then((data) => {
			if(data.length == 0) {
				functions.create(id);
				return {
					GuildID: id,
					Settings: client.Modules.get("database").default_settings
				};
			}
			else return data[0];
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