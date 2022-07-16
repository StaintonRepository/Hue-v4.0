/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
	// Fetch emojis from the config.
	const emojis = client.Configuration.Emojis;
	interaction.emojis = emojis;

	interaction.rawDB = interaction.guild ? client.Modules.get("database").settings.read(interaction.guild.id) : client.Modules.get("database").default_settings;

	interaction.settings = new Map();

	

	const command = client.Commands.cache.get(interaction.commandName);
	if(!command) return interaction.reply("It seems this command is not cached. This may be a bug or the command may not exist anymore.");
	if(command.config.enabled == false) return interaction.reply("This command is currently disabled.");
	// If the command for bot administrators only and the user is not an administrator, return. 
	if(command.config.adminOnly && !client.Administration.includes(interaction.user.id)){
		return interaction.reply({
			content: "You do not have permission to use this command.",
			ephemeral: true
		});
	} else {
		// Run the command function. 
		command.run(client, interaction).catch(err => {
			interaction.reply("An Error occured while running this command.");
			console.error(err);
		});
	}
};