const fs = require("fs");
module.exports = async (client) => {
	client.activeStatus = "for commands";
	client.minutesPerStatus = 5;

	let gitCommitHead = "Pending / Unknown";
	client.gitData = gitCommitHead;
	try {
		fs.readFile("./.git/FETCH_HEAD", "utf8", (err, data) =>{
			gitCommitHead = data.slice(0,8);
			client.gitData = gitCommitHead;
			client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "WATCHING"});
		});	
	} catch (error) {
		client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "WATCHING"});
	}


	client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "WATCHING"});
	setInterval(function(){
		client.user.setActivity(`${client.activeStatus} | git ${gitCommitHead}`, {type: "WATCHING"});
	}, client.minutesPerStatus * 6000);
	client.Logger.ready(`Logged On As: ${client.user.tag}`);
	client.Modules.get("cli").prompt();

	// Read the configuration and parse who the bot administrators are.
	const data = client.Configuration.BOT_ADMINISTRATION;
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

	client.ready = true;
};