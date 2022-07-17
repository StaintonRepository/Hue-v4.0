/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").GuildMember} member 
 */
module.exports = async (client, member) => {
	if(!member.guild.available) return;
	const guild = member.guild;
	const rawSettings = (await client.Modules.get("database").settings.get(guild.id)).Settings;
	const settings = new Map();
	for(const setting of rawSettings){
		settings.set(setting.id, setting);
	}
	if(settings.get("3").value.toLowerCase() == "none"){
		return;
	} else {
		const channel = guild.channels.cache.get(settings.get("3").value);
		if(!channel) return;
		let text = settings.get("4").value;

		// Yes I know not all are documented but I'm lazy (thanks co pilot for giving me all these variables)
		// Also yes I could use a loop here which I may add in the future but for now its like... not terrible. but its also not super efficient.
		text = client.replaceAll(text, "{{user}}", member.user);
		text = client.replaceAll(text, "{{username}}", member.user.username);
		text = client.replaceAll(text, "{{guild}}", guild.name);
		text = client.replaceAll(text, "{{server}}", guild.name);
		text = client.replaceAll(text, "{{owner}}", client.users.cache.get(guild.ownerID));
		text = client.replaceAll(text, "{{membercount}}", guild.memberCount);
		text = client.replaceAll(text, "{{rules}}", guild.rulesChannel ? guild.rulesChannel.toString() : "No Rules Channel Found.");
		text = client.replaceAll(text, "{{channels}}", guild.channels.cache.size);
		text = client.replaceAll(text, "{{roles}}", guild.roles.cache.size);
		text = client.replaceAll(text, "{{id}}", guild.id);
		text = client.replaceAll(text, "{{region}}", guild.region);

		// Image vars
		text = client.replaceAll(text, "{{icon}}", guild.iconURL({ format: "png", size: 1024, dynamic: true }));
		text = client.replaceAll(text, "{{icon_url}}", guild.iconURL({ format: "png", size: 1024, dynamic: true }));
		text = client.replaceAll(text, "{{user_avatar}}", member.user.avatarURL({ format: "png", size: 1024, dynamic: true }));

		if(text.includes("[embed]")){
			const flagsRaw = text.split("--");
			flagsRaw.shift();
			const embedOverride = new MessageEmbed()
				.setTimestamp()
				.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
				.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
				.setColor("GREEN")
				.setTitle("Welcome new Member!")
				.setDescription(`Welcome ${member.user} to \`${guild.name}!\`\nIn order to gain access to the rest of the server please run the \`/verify\` command.`)
				.setThumbnail(member.user.avatarURL({ format: "png", size: 1024, dynamic: true }));
			if(flagsRaw.includes("premade")){
				const embedOverride = new MessageEmbed()
					.setTimestamp()
					.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
					.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
					.setColor("GREEN")
					.setTitle("Welcome new Member!")
					.setDescription(`${member.user} has joined \`${guild.name}\``)
					.setThumbnail(member.user.avatarURL({ format: "png", size: 1024, dynamic: true }));
				return channel.send({ embeds: [embedOverride] });
			} else if(flagsRaw.includes("premade_verify")){
				return channel.send({ embeds: [embedOverride] });
			} else {
				const embed = new MessageEmbed();
				const flags = [];
				for(const flag of flagsRaw){
					const args = flag.split(" ");
					args.shift();
					flags.push({ flag: flag.split(" ")[0], arguments: args.join(" ") });
				}
				const author = {name: client.user.username, iconURL: client.user.avatarURL(), url: undefined};
				const footer = {text: client.user.username, iconURL: client.user.avatarURL()};

				for(const flag of flags){
					// Could've used a switch statement but I don't like those.
					if(flag.flag == "title"){
						embed.setTitle(flag.arguments);
					} else if(flag.flag == "description"){
						embed.setDescription(flag.arguments);
					} else if(flag.flag == "color"){
						embed.setColor(flag.arguments);
					} else if(flag.flag == "thumbnail"){
						embed.setThumbnail(flag.arguments);
					} else if(flag.flag == "author"){
						author.name = flag.arguments;
					} else if(flag.flag == "authorURL"){
						author.url = flag.arguments;
					} else if(flag.flag == "authorImg"){
						author.iconURL = flag.arguments;
					} else if(flag.flag == "footer"){
						footer.text = flag.arguments;
					} else if(flag.flag == "footerImg"){
						footer.iconURL = flag.arguments;
					} else if(flag.flag == "timestamp"){
						if(!flag.arguments.includes("[now]"))
							embed.setTimestamp(flag.arguments);
						else 
							embed.setTimestamp();
					} else if(flag.flag == "add_field"){
						const field = flag.arguments.split("[|]");
						embed.addField(field[0], field[1], field[2] == "true");
					} else if(flag.flag == "image"){
						embed.setImage(flag.arguments);
					}

					embed.setAuthor(author);
					embed.setFooter(footer);
				}
				const msg = channel.send({ embeds: [embed] });
				msg.catch(err => {
					return channel.send({ embeds: [embedOverride] });
				});
			}
		} else {
			channel.send({
				content: text,
				allowedMentions: {
					parse: [
						"roles",
						"everyone"
					]
				}
			}).catch(err => {});
		}

		
	}

};