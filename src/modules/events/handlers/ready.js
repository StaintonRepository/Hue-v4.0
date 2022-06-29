const fs = require("fs");
module.exports = (client) => {
	// Do a interval because I find after a while the status likes to fuck off for no reason
	client.activeStatus = `${client.user.username}`;

	client.user.setActivity(client.activeStatus, {type: "PLAYING"});
	setInterval(function(){
		client.user.setActivity(client.activeStatus, {type: "PLAYING"});
	}, 3600000);
	client.Logger.ready(`Logged On As: ${client.user.tag}, | NECos JS v2.0.`);
	client.Modules.get("cli").prompt();
};