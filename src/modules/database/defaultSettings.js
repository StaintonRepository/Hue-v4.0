/* eslint-disable no-unused-vars */
class Setting {
	name = "Unnamed Setting.";
	description = "This Setting lacks a description.";
	editable = true;
	value = undefined;
	constructor(name, description, value, editable){
		this.name = name;
		this.description = description;
		this.value = value;
		this.editable = editable;
	}

}
module.exports = {
	Setting,
	Init: (NECos) => {
		NECos.DefaultSettings = new Map();


	}
};