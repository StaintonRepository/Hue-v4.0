/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Interaction} interaction 
 */
module.exports = async (client, interaction) => {
	if(interaction.isCommand()) client.emit("command", interaction);
	if(interaction.isSelectMenu()) client.emit(interaction.customId, interaction);
	if(interaction.isButton()) client.emit(interaction.customId, interaction);
};