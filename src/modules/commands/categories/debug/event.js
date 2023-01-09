/* eslint-disable no-unused-vars */
const filename = require("path").basename(__filename).split(".")[0];
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
	/**
	 * 
	 * @param {import("discord.js").Client} client 
	 * @param {import("discord.js").CommandInteraction} interaction 
	 */
	run: async (client, interaction) =>{
		const argumentTable = {
			"guildMemberAdd":  [interaction.member],
			"guildMemberRemove": [interaction.member],
			"guildCreate": [interaction.guild],
			"guildDelete": [interaction.guild],
		};
		const event = interaction.options.getString("event", true);
		if(event){
			if(Object.keys(argumentTable).includes(event)){
				const embed = new MessageEmbed()
					.setTitle(`${event} Event`)
					.setColor("#00ff00")
					.setDescription(`The ${event} event has been triggered.`);
				await interaction.reply({embeds: [embed]});

				client.emit(event, ...argumentTable[event]);
			}else{
				const embed = new MessageEmbed()
					.setTitle("Event")
					.setColor("#ff0000")
					.setDescription(`The event ${event} is not allowed.`);
				interaction.reply({embeds: [embed]});
			}
		}else interaction.reply("Please specify an event to debug.");
	},
	config: {
		adminOnly: true,
		enabled: true,
		// If you don't understand this category line, dw about it, it just fetches the parent directory with support for windows and linux.
		category: __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1],
		data: new SlashCommandBuilder()
			.setName(filename)
			.setDescription("Run specific guild events")
			.setDMPermission(false)
			.addStringOption(event => 
				event.setName("event")
					.setDescription("The event to run")
					.setRequired(true)
					.addChoices(
						{name: "guildMemberAdd", value: "guildMemberAdd", description: "Simulates a guild member joining"}, 
						{name: "guildMemberRemove", value: "guildMemberRemove", description: "Simulates a guild member leaving"},
						{name: "guildCreate", value: "guildCreate", description: "Simulates a guild creation event."},
						{name: "guildDelete", value: "guildDelete", description: "Simulates a guild deletion event."},
						
					)

			)
	}
};