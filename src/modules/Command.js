module.exports = (client) => {
	class Command {
		constructor(name, description, args, category, enabled, forceEnabled, run) {
			this.name = name;
			this.description = description;
			this.args = args;
			this.category = category;
			this.enabled = enabled;
			this.forceEnabled = forceEnabled;
			this.run = run;
		}
	}

	client.Commands = {
		Class : Command,
		cache : new Map(),
		get: (name) => {
			return client.Commands.cache.get(name);
		}
	};
	return client.Commands;
};