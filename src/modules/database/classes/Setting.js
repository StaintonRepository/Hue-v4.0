/* eslint-disable no-unused-vars */
module.exports = class Setting {
	id = -1;
	
	name = "Unnamed Setting.";
	description = "This Setting lacks a description.";
	editable = true;
	category = undefined;
	
	value = undefined;
	expectedType = undefined;

	lastUpdated = new Date();
	editor = {tag: "System", id: "000000000000000"};
	constructor(id, name, description, value, editable, expectedType, category = "System", editor = {tag: "System", id: "000000000000000"}){
		this.id = id.toString();
		this.name = name;
		this.description = description;
		this.value = value;

		this.editable = editable;
		this.expectedType = expectedType;

		this.category = category;


		this.lastUpdated = new Date();
		this.editor = editor;

		return this;
	}

};
