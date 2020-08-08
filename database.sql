CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"tasks" VARCHAR (50) NOT NULL,
  	"notes" VARCHAR (240),
	"completed" VARCHAR (10)
);

INSERT INTO "tasks" ("tasks", "notes", "completed") VALUES ('Clean the litter box', 'check the pee pad too!', 'No');
INSERT INTO "tasks" ("tasks", "notes", "completed") VALUES ('Change the sheets', 'Use the blue ones!', 'No');
INSERT INTO "tasks" ("tasks", "notes", "completed") VALUES ('Take out the garbage', 'check bathroom garbage', 'Yes!');
