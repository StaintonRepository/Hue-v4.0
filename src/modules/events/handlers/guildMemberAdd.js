/* eslint-disable no-empty */
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
	if(settings.get("3").value){
		const channel = guild.channels.cache.get(settings.get("3").value);
		if(channel){
			let text = settings.get("4").value;

			text = client.Modules.get("variables").get(text, guild, member);

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
					channel.send({ embeds: [embedOverride] });
				} else if(flagsRaw.includes("premade_verify")){
					channel.send({ embeds: [embedOverride] });
				} else {
					const embed = new MessageEmbed()
						.setTitle("Blank Embed. Uh.. looks like the embed is blank.");
					const flags = [];
					for(const flag of flagsRaw){
						const args = flag.split(" ");
						args.shift();
						flags.push({ flag: flag.split(" ")[0], arguments: args.join(" ") });
					}
					const author = {name: client.user.username, iconURL: client.user.avatarURL(), url: undefined};
					const footer = {text: client.user.username, iconURL: client.user.avatarURL()};

					for(const flag of flags){
						// Could've used a switch statement but I don't like those. (or a loop ill actually do that later)
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
						channel.send({ embeds: [embedOverride] });
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
		
	}
	// Auto role
	const roleId = settings.get("1");
	if(roleId){
		const role = guild.roles.cache.get(roleId.value);
		if(role){
			try {
				await member.roles.add(role, "Auto Role Setting.");
			} catch (error) {
				console.log(error);
			}
		}
	}
	
};