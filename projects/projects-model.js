const db = require("../data/db-config.js");

module.exports = {
	find,
	add,
	findResource,
	addResource,
	findTask,
	addTask,
};

function find() {
	return db("projects");
}

function findResource() {
	return db("resources");
}

function findTask() {
	return db("tasks");
}

function add(project) {
	return db("projects").insert(project);
}

function addResource(resource) {
	return db("resources").insert(resource);
}

function addTask(task) {
	return db("tasks").insert(task);
}
