CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"tasks" VARCHAR (50) NOT NULL,
  	"notes" VARCHAR (240),
	"completed" VARCHAR (10)
);

