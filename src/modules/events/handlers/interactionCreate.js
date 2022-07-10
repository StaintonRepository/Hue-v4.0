module.exports = async (client, interaction) => {
	if(interaction.isCommand()) client.emit("command", interaction);
};