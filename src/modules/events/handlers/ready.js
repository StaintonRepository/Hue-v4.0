module.exports = (client) => {
	// Do a interval because I find after a while the status likes to fuck off for no reason
	client.activeStatus = `${client.user.username} Development`;
	client.user.setActivity(client.activeStatus, {type: "PLAYING"});
	setInterval(function(){
		client.user.setActivity(client.activeStatus, {type: "PLAYING"});
	}, 3600000);
	console.log(`Logged On As: ${client.user.tag}, | NECos JS v2.0.`);
};