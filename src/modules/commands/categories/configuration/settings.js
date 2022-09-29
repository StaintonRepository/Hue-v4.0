/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
const filename = require("path").basename(__filename).split(".")[0];
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const moment = require("moment");
module.exports = (client) => {
	const default_settings = client.Modules.get("database").default_settings;

	const channelReg = /<#[0-9]+>/g;
	const roleReg = /<@&[0-9]+>/g;

	const settings = [];

	for(const setting of default_settings){
		const name = setting.name;
		if(setting.editable){
			settings.push({name: `${name} - ${setting.description}`.substring(0,99), value: setting.id.toString()});
		}
	}

	return {
		/**
		 * 
		 * @param {import("discord.js").Client} client 
		 * @param {import("discord.js").CommandInteraction} interaction 
		 */
		run: async (client, interaction) =>{
			if(!interaction.member.permissions.has("MANAGE_GUILD")) interaction.reply("You must have the Manage Server permission to use this command.");
			if(interaction.options.getSubcommand() == "edit"){
				let completed = false;
				
				const suggestLogs = [
					{
						label: "Disabled (Default)",
						value: "none",
						description: "No logging on this server",
					},
				];
				const components = [];

				let configItem = undefined;

				const configID = interaction.options.get("input");
				default_settings.forEach(setting => {
					if(setting.id.toString() == configID.value){
						configItem = setting;
					}
				});

				if(configItem == undefined){
					await interaction.editReply("Invalid config item.");
					return;
				}
				// Suggesting a log / welcoming channel.
				if(configItem.expectedType == "channel"){
					// loop each guild
					const suggestedLogsReg = /log/g;

					// Basically an array of what channels may be used as welcoming channels
					const suggestedWelcomingChannels = [
						/welcome/g,
						/checkpoint/g,
						/general/g,
						/gate/g,
						/member/g,
						/landing/g,
					];
					for(const channelRaw of interaction.guild.channels.cache){
						// why
						const channel = channelRaw[1];
						// test it with the regex
						// Logging channel;
						if(configItem.id == 0){
							if(suggestedLogsReg.test(channel.name)){
								if(suggestLogs.length < 5)
									suggestLogs.push({label: channel.name, value: `<#${channel.id}>`, description: channel.topic});
							}
						} else if(configItem.id == 3){
							for(const reg of suggestedWelcomingChannels){
								if(reg.test(channel.name)){
									if(suggestLogs.length < 5)
										suggestLogs.push({label: channel.name, value: `<#${channel.id}>`, description: channel.topic});
								}
							}
						}
						
					}
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_select")
								.setPlaceholder("Suggested Channels")
								.addOptions(...suggestLogs)
						);
					if(suggestLogs.length > 0)
						components.push(selectMenu);
				}

				// Name Formatting
				if(configItem.id == 10){
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_select")
								.setPlaceholder("Suggested Formats")
								.addOptions(
									{
										label: "Default (Current Platform)",
										value: "{{platform_name}}",
										description: "{{platform_name}}",
									},
									{
										label: "Discord Name + Platform Name",
										value: "{{discord}} ({{platform_name}})",
										description: "{{discord}} ({{platform_name}})",
									},
									{
										label: "Roblox Display Name + Username",
										value: "{{roblox_display}} (@{{roblox_username}})",
										description: "{{roblox_display}} (@{{roblox_username}})",
									},
									
								)
						);
					components.push(selectMenu);
				}

				// Boolean
				if(configItem.expectedType == "boolean"){
					// include a select menu
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_select")
								.setPlaceholder("Select a value")
								.addOptions(
									{
										label: "Enabled",
										value: "true",
										description: "Enable this setting",
									},
									{
										label: "Disabled",
										value: "false",
										description: "Disable this setting",
									}
								)
						);
					components.push(selectMenu);
				}
				// example welcoming messages
				if(configItem.id == 4){
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_select")
								.setPlaceholder("Suggested Welcoming Messages")
								.addOptions(
									{
										label: "Welcome {{user}} to {{server} (Default)",
										value: "Welcome {{user}} to {{server}}",
										description: `Welcome ${interaction.user.username} to ${interaction.guild.name}`,
									},
									{
										label: "Welcome {{user}}! Read the rules here: {{rules}}",
										value: "Welcome {{user}}! Read the rules here: {{rules}}",
										description: `Welcome ${interaction.user.username}! Read the rules here: ${interaction.guild.rulesChannel ? `#${interaction.guild.rulesChannel.name}` : "No rules channel found"}`,
									},
									{
										label: "Welcome {{user}}! Praise {{owner}}",
										value: "Welcome {{user}}! Praise {{owner}}",
										description: `Welcome ${interaction.user.username}! Praise ${client.users.cache.get(interaction.guild.ownerId).username}`,
									},
									{
										label: "Fancy Embed Welcome",
										value: "[embed] --premade",
										description: "Read the document to learn more about embeds",
									},
								)
						);
					components.push(selectMenu);
				}
				// suggested auto roles
				if(["1","6"].includes(configItem.id)){
					const roles = [
						{
							label: "None (Default)",
							value: "none",
							description: "No auto roles will be assigned",
						},
					];
					const regs = [
						/member/g,
						/user/g,
						/employee/g,
						/civilian/g,
						/unverified/g,
						/customer/g,
					];
					for(const role of interaction.guild.roles.cache){
						for(const reg of regs){
							if(reg.test(role[1].name.toLowerCase())){
								roles.push({
									label: role[1].name,
									value: role[1].id,
									description: role[1].name,
								});
							}
						}
					}


					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_select")
								.setPlaceholder("Suggested Auto Roles")
								.addOptions(...roles)
						);
					if(roles.length != 0)
						components.push(selectMenu);
				}


				// verification 
				if(configItem.expectedType == "verification"){
					// include a select menu
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_select")
								.setPlaceholder("Select a value")
								.addOptions(
									{
										label: "None (Default)",
										value: "0",
										description: "No verification on this server",
									},
									{
										label: "Roblox",
										value: "1",
										description: "Verify with Roblox",
									},
									{
										label: "Steam",
										value: "2",
										description: "Verify with Steam",
									},
									{
										label: "Minecraft",
										value: "3",
										description: "Verify with Minecraft",
									},
								)
						);
					components.push(selectMenu);
				}

				const expectedType = configItem.expectedType;

				const embed = new MessageEmbed()
					.setTitle(`Editing ${configItem.name}`)
					.setDescription(`Please reply with the value for ${configItem.name}. (Expected type: \`${expectedType}\`)\n${configItem.help != undefined ? `[Help Document for this Configuration Item](${configItem.help})\n` : ""}Current Value: \`${interaction.settings.get(configItem.id).value.toString() === "" ? "None" : interaction.settings.get(configItem.id).value}\` (Don't worry if its random numbers)\nLast Edited \`${moment(interaction.settings.get(configItem.id).lastUpdated).format("YYYY-MM-DD HH:mm")}\` by \`${interaction.settings.get(configItem.id).editor.tag}\``)
					.setTimestamp()
					.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
					.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
					.setColor("GREEN");

				interaction.reply({
					embeds: [embed],
					components: components,
				});
				const filter = m => m.author.id == interaction.user.id;
				const collector = interaction.channel.createMessageCollector({filter, time: 120000, max: 1});
				collector.on("collect", msg => {
					collector.stop();
					completed = true;
					if(msg.content.toLocaleLowerCase() == "cancel"){
						msg.reply("Cancelled");
					} else if(msg.content.toLocaleLowerCase() == "none")
						return finalize("none", msg);
					else if(expectedType == "channel" || msg.content.toLowerCase() == "none"){
						if(channelReg.test(msg.content)){
							return finalize(msg.content, msg, msg.content);
						} else msg.reply("Couldn't parrse a channel from your reply. Please try again with a clickable channel name.");
					} else if(expectedType == "string") return finalize(msg.content, msg);
					else if(expectedType == "role"){
						if(roleReg.test(msg.content) || msg.content.toLowerCase() == "none"){
							return finalize(msg.content, msg, msg.content);
						} else return msg.reply("Couldn't parse a role from your reply. Please try again with a role ping. (Do it in a private channel if you fear of pinging others)");
					} else if(expectedType == "boolean"){
						if(msg.content == "true" || msg.content == "false"){
							return finalize(msg.content, msg);
						} else return msg.reply("Couldn't parse a boolean from your reply. Please try again with either `true` or `false`.");
					}
				});

				client.on(`${interaction.id}_select`, (select) => {
					// parse data and make sure this is ran once
					if(select.user == interaction.user){
						if(!completed){
							completed = true;

							finalize(select.values[0], select, select.values[0]);
						} else return select.reply({
							content: "You have already completed this interaction.",
							ephemeral: true
						});
					} else return select.reply({
						content:"You cannot interact with this interaction.",
						ephemeral: true
					});
				});
				let alreadyDone = false;
				function finalize(value, reply, pingable){
					if(alreadyDone) return;
					alreadyDone = true;
					// Parse all possible discord channels / roles out so we just get the id
					value = value.replace("<#", "").replace(">", "");
					value = value.replace("<@&", "").replace(">", "");

					if(expectedType == "boolean") value = value == "true";

					configItem.value = value;
					configItem.editor = { tag: interaction.user.tag };
					configItem.lastUpdated = new Date();

					interaction.settings.set(configItem.id, configItem);

					const rawArray = Array.from(interaction.settings.values());
					client.Modules.get("database").settings.update(interaction.guild.id, rawArray);
					const embed = new MessageEmbed()
						.setTimestamp()
						.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
						.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
						.setColor("GREEN")
						.setTitle(`Successfully Edited ${configItem.name}`)
						.setDescription(`You've successfully edited ${configItem.name} to ${pingable ? pingable.includes(">") ? pingable : `\`${value}\`` : `\`${value}\``}.`);
					reply.reply({ embeds: [embed] });

				}
			} else {
				const categories = new Map();

				for(const configItem of interaction.settings){
					if(!categories.has(configItem[1].category)){
						categories.set(configItem[1].category, []);
					}
					categories.get(configItem[1].category).push(configItem[1]);
				}

				const fields = [];

				for(const [category, items] of categories){
					let value = [];
					for(const item of items){
						if(item.editable == false) continue;
						value.push(`${item.name}: \`${item.value}\`\n`);
					}
					const field = {
						name: category,
						value: value.join("\n"),
						inline: true
					};
					fields.push(field);
				}

				const embed = new MessageEmbed()
					.setTimestamp()
					.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
					.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
					.setColor("GREEN")
					.setTitle(`Configuration for ${interaction.guild.name}`)
					.setDescription("If you don't recognize a setting as what you set it to, its likely that its the ID for a channel or role.")
					.addFields(...fields);

				interaction.reply({
					embeds: [embed],
				});


			}

		
		},
		config: {
			adminOnly: false,
			enabled: true,
			// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
			category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
			data: new SlashCommandBuilder()
				.setName(filename)
				.setDescription("Edit your server configuration")
				.setDMPermission(false)
				.setDefaultMemberPermissions(0)
				.addSubcommand(edit =>
					edit.setName("edit")
						.setDescription("Edit a specific key of the server config.")
						.addStringOption(option =>
							option.setName("input")
								.addChoices(
									...settings
								)
								.setRequired(true)
								.setDescription("Config key")
		
						)
				)
				.addSubcommand(view => 
					view.setName("view")
						.setDescription("view current guild settings")
				)
		}
	};
};