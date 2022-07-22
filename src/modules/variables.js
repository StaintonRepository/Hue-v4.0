/* eslint-disable no-unused-vars */
const discord = require("discord.js");
/**
 * @param {import("discord.js").Client} client
 */
module.exports = (client) => {
	return {
		get: (text, ...args) => {
			args ??= []; 

			let guild = undefined;
			let member = undefined;
			let channel = undefined;
			let interaction = undefined;

			for(const arg of args){
				if(arg){
					if(arg instanceof discord.Guild){
						guild = arg;
					} if(arg instanceof discord.GuildMember){
						member = arg;
					} if(arg instanceof discord.TextChannel){
						channel = arg;
					} if(arg instanceof discord.CommandInteraction){
						interaction = arg;
					}
				}
			}

			// Global variables
			const global = [
				{name: "{{bot}}", value: client.user.username},
				{name: "{{bot_icon}}", value: client.user.avatarURL({format: "png", dynamic: true, size: 1024})},	
			];

			if(guild){
				global.push({name: "{{guild}}", value: guild.name});
				global.push({name: "{{guild_icon}}", value: guild.iconURL({format: "png", dynamic: true, size: 1024})});
				global.push({name: "{{guild_id}}", value: guild.id});

				global.push({name: "{{guild_owner_id}}", value: guild.ownerId});
				global.push({name: "{{guild_owner_name}}", value: client.users.cache.get(guild.ownerId).username});
				global.push({name: "{{guild_owner}}", value: client.users.cache.get(guild.ownerId).toString()});
				global.push({name: "{{guild_owner_avatar}}", value: client.users.cache.get(guild.ownerId).avatarURL({format: "png", dynamic: true, size: 1024})});

				global.push({name: "{{guild_member_count}}", value: guild.memberCount});
				global.push({name: "{{guild_channels}}", value: guild.channels.cache.size});

				global.push({name: "{{guild_rules}}", value: guild.rulesChannel ? guild.rulesChannel.toString() : "No Rules Channel Found."});
				global.push({name: "{{guild_rules_name}}", value: guild.rulesChannel ? guild.rulesChannel.name : "No Rules Channel Found."});
			}

			if(member){
				global.push({name: "{{member}}", value: member.toString()});
				global.push({name: "{{member_name}}", value: member.user.username});
				global.push({name: "{{member_avatar}}", value: member.user.avatarURL({format: "png", dynamic: true, size: 1024})});
			}

			for(const globalVar of global){
				text = text.replaceAll(globalVar.name, globalVar.value);
			}

			return text;
		}
	};
};