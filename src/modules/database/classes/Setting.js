/* eslint-disable no-unused-vars */
class Setting {
	name = "Unnamed Setting.";
	description = "This Setting lacks a description.";
	editable = true;
	value = undefined;
	lastUpdated = undefined;
	editor = "Unknown#0000";
	constructor(name, description, value, editable, editor){
		this.name = name;
		this.description = description;
		this.value = value;
		this.editable = editable;

		this.lastUpdated = new Date();
		this.editor = editor;
	}

}
