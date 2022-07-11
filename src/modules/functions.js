module.exports = (client) => {
	// Stolen from old build of AnIdiotsGuide's GuideBot 
	// https://github.com/AnIdiotsGuide/guidebot/blob/12bdfaf7d6241f13e13b3aab6eee0a178d70a7df/modules/functions.js
	client.cleanText = async (client, text) => {
		if (text && text.constructor.name == "Promise") text = await text;
		if (typeof text !== "string")
			text = require("util").inspect(text, { depth: 1 });

		text = text
			.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203));
		text = replaceAll(text, client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
		return text;
	};
	function replaceAll(haystack, needle, replacement) {
		return haystack.split(needle).join(replacement);
	}
};