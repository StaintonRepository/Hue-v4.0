const fs = require("fs");

module.exports = (NECos) => {
	function loadEvents(){
		const handlers = fs.readdirSync("./src/modules/events/handlers");
		for(const filename of handlers){
			const envName = filename.split(".")[0];
			const event = require(`./handlers/${filename}`);

			NECos.on(envName, event.bind(null, NECos));
		}
	}
	loadEvents();
	// return 
	return {
		remove: (name) => {
			NECos.removeAllListeners(name);
		},
		loadAll: loadEvents,
		reload: (name) => {
			const handlers = fs.readdirSync("./src/modules/events/handlers");
			for(const filename of handlers){
				const envName = filename.split(".")[0];
				if(envName == name){
					NECos.removeAllListeners(name);
					const event = require(`./handlers/${filename}`);
					NECos.on(envName, event.bind(null, NECos));
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
					NECos.on(envName, event.bind(null, NECos));
					return true;
				} else return false;
			}
		},
	};
};