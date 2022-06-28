const fs = require("fs");

module.exports = (NECos) => {
	const handlers = fs.readdirSync("./src/modules/events/handlers");
	for(const filename of handlers){
		const envName = filename.split(".")[0];
		const event = require(`./handlers/${filename}`);

		NECos.on(envName, event.bind(null, client));
	}

	// return 
	return {

	}
}