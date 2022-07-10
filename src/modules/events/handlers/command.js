/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
	const command = client.Commands.cache.get(interaction.commandName);
	console.log(command);
	if(command.config.enabled == false) return interaction.reply("This command is currently disabled.");
	if(command.config.adminOnly){
		return interaction.reply("Bot Admin Only");
	} else command.run(client, interaction);
};