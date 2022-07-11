/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
	const command = client.Commands.cache.get(interaction.commandName);
	if(!command) return interaction.reply("It seems this command is not cached. This may be a bug or the command may not exist anymore.");
	if(command.config.enabled == false) return interaction.reply("This command is currently disabled.");
	if(command.config.adminOnly && !client.Administration.includes(interaction.user.id)){
		return interaction.reply({
			content: "You do not have permission to use this command.",
			ephemeral: true
		});
	} else command.run(client, interaction);
};