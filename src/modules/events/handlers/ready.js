const fs = require("fs");
const discord = require("discord.js");
const os = require("os");
module.exports = (client) => {
	client.randomStatus = [
		"NEKOPARA Vol. 1",
		"Minecraft",
		"Roblox",
		"with a firearm.",
		"Energetic Sandbox",
		"with a dog",
		"dead",
	];

	// Do a interval because I find after a while the status likes to fuck off for no reason
	client.activeStatus = client.randomStatus[Math.floor(Math.random() * client.randomStatus.length)];

	client.minutesPerStatus = 5;

	let gitCommitHead = "Pending";
	fs.readFile("./.git/FETCH_HEAD", "utf8", (err, data) =>{
		gitCommitHead = data.slice(0,8);
		client.gitData = gitCommitHead;
		client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "PLAYING"});
	});


	client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "PLAYING"});
	setInterval(function(){
		client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "PLAYING"});
	}, client.minutesPerStatus * 6000);
	client.Logger.ready(`Logged On As: ${client.user.tag}, | ${client.user.username} JS v2.0.`);
	client.Modules.get("cli").prompt();

	// Read the configuration and parse who the bot administrators are.
	const data = client.Configuration.Client.BOT_ADMINISTRATION;
	client.Administration = [];
	if(data){
		if(data.length <= 0) client.Logger.warn("There are no bot administrators configured in the configuration");
		else {
			for(const a of data){
				if(typeof(a) == "string"){
					if(a.split("")[0] == "@") client.Administration.push(a.replace("@", ""));
					else {
						// Either a guild or a role.
						const b = a.split("-");
						if(b.length == 1){
							// Guild
							const guildId = b[0].replace("#","");
							const guild = client.guilds.cache.get(guildId);
							if(guild){
								guild.members.cache.forEach(member => {
									client.Administration.push(member.user.id);
								});
							}else client.Logger.warn(`${client.user.username} attempted to access a guild which it didn't have access to.`);
						}else{
							// Role
							const guildId = b[0].replace("#","");
							const roleId = b[1].replace("&","");
							
							const guild = client.guilds.cache.get(guildId);
							if(guild){
								guild.members.cache.forEach(member => {
									if(member._roles.includes(roleId)) client.Administration.push(member.user.id);
								});
							}else client.Logger.warn(`${client.user.username} attempted to access a guild which it didn't have access to.`);
						}
					}
				}
			}
		} 
	}else client.Logger.warn("The bot administrators key in the configuration was unable to be read.");

	// Post to log channel that the bot is online.
	const embed = new discord.MessageEmbed()
		.setTitle(`${client.user.username} has connected to Discord!`)
		.setDescription(`${client.user.username} is now online.`)
		.setTimestamp()
		.addField("System Details", `OS type: \`${os.type()}\`, Node Verstion: \`${process.version}\`, Platform: \`${os.platform()}\``)
		.addField("Git Details", `Git Commit: \`${gitCommitHead}\`, Repository: \`incomplete\``);
	const msg = client.channels.cache.get(client.Configuration.Channels.LOGS).send({embeds: [embed]});
	msg.then(msg => {
		console.log(msg);
	});

};