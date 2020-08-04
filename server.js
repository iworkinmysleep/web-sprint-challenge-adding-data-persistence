const express = require("express");
const helmet = require("helmet");

const db = require("../data/db-config.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/api/projects", (req, res) => {
	db('projects')
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



module.exports = server;
