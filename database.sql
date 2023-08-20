CREATE TABLE "checklist" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(25) NOT NULL,
	due VARCHAR(15) NOT NULL,
    done boolean
);

INSERT INTO "checklist" ("name", "due", "done")
VALUES ('create database', '12pm', false), 
('HTML setup', '1pm', false),
('GET route working', '2pm', false),
('POST route working', '4pm', false),
