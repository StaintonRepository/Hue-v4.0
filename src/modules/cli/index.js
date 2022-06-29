/* eslint-disable no-unused-vars */
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
module.exports = (NECos) => {
	const functions = {
		run: async (cmd, args) => {
			// temp eval cmd because I am lazy.
			if(cmd === "eval"){
				try{
					let text = eval(args);
					if (text && text.constructor.name == "Promise") text = await text;
					if (typeof text !== "string")
					text = require("util").inspect(text, { depth: 1 });

					text = text
						.replace(/`/g, "`" + String.fromCharCode(8203))
						.replace(/@/g, "@" + String.fromCharCode(8203))
						.replace(NECos.token, "ooga booga");

					console.log(text);
				}
				catch(e){
					NECos.Logger.error(e);
				}
			}


		},
		prompt: () => {
			rl.question("", (answer) => {
				const cmd = answer.split(" ")[0];
				const args = answer.split(" ").slice(1).join(" ");
				functions.run(cmd, args);
				functions.prompt();
			});
		}
	};

	return functions;
};