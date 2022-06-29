module.exports = (NECos) => {
	class Command {
		constructor(name, description, args, aliases, category, cooldown, enabled, run) {
			this.name = name;
			this.description = description;
			this.args = args;
			this.aliases = aliases;
			this.category = category;
			this.cooldown = cooldown;
			this.enabled = enabled;
			this.run = run;
		}
	}

	return {
		Class : Command,
		cache : new Map(),
		get: (name) => {
			return NECos.Commands.cache.get(name);
		}
	};
}