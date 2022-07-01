const fs = require("fs");
module.exports = (NECos) => {
	// Do a interval because I find after a while the status likes to fuck off for no reason
	NECos.activeStatus = `${NECos.user.username}`;

	NECos.user.setActivity(NECos.activeStatus, {type: "PLAYING"});
	setInterval(function(){
		NECos.user.setActivity(NECos.activeStatus, {type: "PLAYING"});
	}, 3600000);
	NECos.Logger.ready(`Logged On As: ${NECos.user.tag}, | NECos JS v2.0.`);
	NECos.Modules.get("cli").prompt();

	// Read the configuration and parse who the bot administrators are.
	const data = NECos.Configuration.Client.BOT_ADMINISTRATION
	NECos.Administration = []
	if(data){
		if(data.length <= 0) NECos.Logger.warn("There are no bot administrators configured in the configuration")
		else {
			for(const a of data){
				if(typeof(a) == "string"){
					if(a.split("")[0] == "@") NECos.Administration.push(a.replace("@", ""));
					else {
						// Either a guild or a role.
						const b = a.split("-");
						if(b.length == 1){
							// Guild
							const guildId = b[0].replace("#","");
							const guild = NECos.guilds.cache.get(guildId);
							if(guild){
								guild.members.cache.forEach(member => {
									NECos.Administration.push(member.user.id)
								})
							}else NECos.Logger.warn("NECos attempted to access a guild which it didn't have access to.")
						}else{
							// Role
							const guildId = b[0].replace("#","");
							const guild = NECos.guilds.cache.get(guildId);
							if(guild){

							}else NECos.Logger.warn("NECos attempted to access a guild which it didn't have access to.")
						}
					}
				}
			}
		} 
	}else NECos.Logger.warn("The bot administrators key in the configuration was unable to be read.")

};