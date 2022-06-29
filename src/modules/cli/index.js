/* eslint-disable no-unused-vars */
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
module.exports = (NECos) => {
	const functions = {
		run: async (cmd, args) => {
			console.log(`Running command: ${cmd}`);
		},
		prompt: () => {
			rl.question(">> ", (answer) => {
				const cmd = answer.split(" ")[0];
				const args = answer.split(" ").slice(1);
				functions.run(cmd, args);
				functions.prompt();
			});
		}
	};

	return functions;
};