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
			if(interaction.options.getSubcommand() == "edit"){
				const suggestLogs = [];
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
									suggestLogs.push({label: channel.name, value: channel.id, description: channel.topic});
							}
						} else if(configItem.id == 3){
							for(const reg of suggestedWelcomingChannels){
								if(reg.test(channel.name)){
									if(suggestLogs.length < 5)
										suggestLogs.push({label: channel.name, value: channel.id, description: channel.topic});
								}
							}
						}
						
					}
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "select")
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
								.setCustomId(interaction.id + "select")
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

				const expectedType = configItem.expectedType;

				const embed = new MessageEmbed()
					.setTitle(`Editing ${configItem.name}`)
					.setDescription(`Please reply with the value for ${configItem.name}. (Expected type: \`${expectedType}\`)\n${configItem.help != undefined ? `[Help Document for this Configuration Item](${configItem.help})\n` : ""}Current Value: \`${interaction.settings.get(configItem.id).value.toString() === "" ? "None" : interaction.settings.get(configItem.id).value}\` Last Edited \`${moment(interaction.settings.get(configItem.id).lastUpdated).format("YYYY-MM-DD HH:mm")}\` by \`${interaction.settings.get(configItem.id).editor.tag}\``)
					.setTimestamp()
					.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
					.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
					.setColor("GREEN");

				await interaction.reply({
					embeds: [embed],
					components: components,
				});
			} else {
				interaction.reply("Test");
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