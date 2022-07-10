module.exports = (client) => {
	client.Commands = {
		cache : new Map(),
		get: (name) => {
			return client.Commands.cache.get(name);
		}
	};
	return client.Commands;
};