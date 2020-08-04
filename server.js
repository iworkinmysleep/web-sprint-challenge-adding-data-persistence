const express = require("express");
const helmet = require("helmet");

const db = require("./data/db-config.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/api/projects", (req, res) => {
	db("projects")
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to retrieve project", err });
		});
});

server.post("/api/projects", (req, res) => {
	const newProject = req.body;
	db("projects")
		.insert(newProject)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to add project", err });
		});
});

server.get("/api/resources", (req, res) => {
	db("resources")
		.then((resources) => {
			res.status(200).json(resources);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to load resources", err });
		});
});

server.post("/api/resources", (req, res) => {
	const newResource = req.body;
	db("resources")
		.insert(newResource)
		.then((resource) => {
			res.status(201).json(resource);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to add resource", err });
		});
});
server.get("/api/tasks", (req, res) => {
	db("tasks as t")
		.join("projects as p")
		.select(
			"p.name",
			"p.description",
			"t.task_description",
			"t.notes",
			"t.task_completed"
		)
		.orderBy("p.name")
		.then((tasks) => {
			res.status(200).json(tasks);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to load tasks", err });
		});
});

server.post("/api/tasks", (req, res) => {
	const newTask = req.body;
	db("tasks")
		.insert(newTask)
		.then((task) => {
			res.status(201).json(task);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to add task", err });
		});
});

server.get("/api/projects/:id/tasks", (req, res) => {
	const { id } = req.params;
	db("projects as p")
		.join("tasks as t", "t.project_id", "p.id")
		.select("p.name", "p.description", "t.task_description")
		.where({ project_id: id })
		.then((tasks) => {
			res.status(200).json(tasks);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to retrieve tasks", err });
		});
});

module.exports = server;
