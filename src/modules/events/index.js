const fs = require("fs");

module.exports = (client) => {
	function loadEvents(){
		const handlers = fs.readdirSync("./src/modules/events/handlers");
		for(const filename of handlers){
			const envName = filename.split(".")[0];
			const event = require(`./handlers/${filename}`);

			client.on(envName, event.bind(null, client));
		}
	}
	loadEvents();
	// return 
	return {
		remove: (name) => {
			client.removeAllListeners(name);
		},
		loadAll: loadEvents,
		reload: (name) => {
			const handlers = fs.readdirSync("./src/modules/events/handlers");
			for(const filename of handlers){
				const envName = filename.split(".")[0];
				if(envName == name){
					client.removeAllListeners(name);
					const event = require(`./handlers/${filename}`);
					client.on(envName, event.bind(null, client));
					return true;
				} else return false;
			}
		},
		load: (name) => {
			const handlers = fs.readdirSync("./src/modules/events/handlers");
			for(const filename of handlers){
				const envName = filename.split(".")[0];
				if(envName == name){
					const event = require(`./handlers/${filename}`);
					client.on(envName, event.bind(null, client));
					return true;
				} else return false;
			}
		},
	};
};