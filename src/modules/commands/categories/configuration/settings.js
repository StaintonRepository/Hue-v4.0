/* eslint-disable no-unused-vars */
const filename = require("path").basename(__filename).split(".")[0];
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
module.exports = (client) => {
	const default_settings = client.Modules.get("database").default_settings;

	const channelReg = /<#[0-9]+>/;
	const roleReg = /<@&[0-9]+>/;

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
			const components = [];
			if(interaction.options.getSubcommand() == "edit"){
				let configItem = undefined;
				await interaction.deferReply();
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
				
				if(configItem.expectedType == "boolean"){
					// include a select menu
					const selectMenu = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId(interaction.id + "_bool")
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
					.setDescription(`Please reply with the value for ${configItem.name}. (Expected type: \`${expectedType}\`)\nCurrent Value: \`${interaction.settings.get(configItem.id).value}\` Last Edited \`${interaction.settings.get(configItem.id).lastUpdated}\` by \`${interaction.settings.get(configItem.id).editor.tag}\``)
					.setTimestamp()
					.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
					.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
					.setColor("GREEN");

				await interaction.editReply({
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