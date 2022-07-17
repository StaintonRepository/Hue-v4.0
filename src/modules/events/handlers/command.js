/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
	if(!client.isReady) return;
	if(!client.ready) return interaction.reply("The bot is currently booting");

	// Fetch emojis from the config.
	const emojis = client.Configuration.Emojis;
	interaction.emojis = emojis;

	interaction.rawDB = interaction.guild ? await client.Modules.get("database").settings.get(interaction.guild.id) : client.Modules.get("database").default_settings;

	interaction.settings = new Map();
	for(const setting of interaction.rawDB.Settings){
		interaction.settings.set(setting.id, setting);
	}
	

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
		client.Logger.log(`${interaction.user.tag} (${interaction.user.id}) used command ${interaction.commandName} in ${interaction.guild.name} (${interaction.guild.id})`);
		command.run(client, interaction).catch(err => {
			interaction.reply("An Error occured while running this command.");
			console.error(err);
		});
	}
};