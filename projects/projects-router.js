const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

router.get("/", (req, res) => {
	Projects.find()
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to retrieve project", err });
		});
});

router.post("/", (req, res) => {
	const newProject = req.body;
	Projects.add(newProject)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: "failed to add project", err });
		});
});

module.exports = router;
