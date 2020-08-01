exports.up = function (knex) {
	return knex.schema
		.createTable("projects", (tbl) => {
			tbl.increments();
			tbl.text("name", 128).notNullable();
			tbl.text("description", 128);
			tbl.boolean("completed").notNullable();
		})
		.createTable("resources", (tbl) => {
			tbl.increments();
			tbl.text("resource_name", 128).notNullable().unique();
			tbl.text("resource_description", 128);
		})
		.createTable("tasks", (tbl) => {
			tbl.increments();
			tbl
				.integer("project_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("projects")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl.text("task_description", 128).notNullable();
			tbl.text("notes", 128);
			tbl.boolean("task_completed").notNullable();
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("projects")
		.dropTableIfExists("resources")
		.dropTableIfExists("tasks");
};
