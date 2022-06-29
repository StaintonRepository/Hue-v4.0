const chalk = require("chalk");
const moment = require("moment");
module.exports = (NECos) => {
	function log(content, type = "LOG", colour = chalk.bgMagenta){
		const timestamp = `[${moment().format("YYYY-MM-DD HH:mm")}]:`;
		const message = `${timestamp} ${colour(type.toUpperCase())} ${content} `;
		//const discordMessage = `${timestamp} ${(type.toUpperCase())} ${content} `; // If you want to post it in a channel or something
        
		return console.log(message);
	}
	
	const functions = {
		log: log,
		error: (error) => log(`${error.name} | ${error.message}`, "ERROR", chalk.bgRed),
		warn: (content) => log(content, "WARN", chalk.bgYellow),
		info: (content) => log(content, "INFO", chalk.bgCyan),
		cmd: (content) => log(content, "CMD", chalk.bgGreen),
		event: (content) => log(content, "EVENT", chalk.bgBlue),
		module: (content) => log(content, "MODULE", chalk.bgCyan),
		ready: (content) => log(content, "READY", chalk.bgGreen),
	};
	return functions;
	
}