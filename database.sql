CREATE TABLE "checklist" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
	due decimal NOT NULL,
    done boolean
);

INSERT INTO "checklist" ("name", "due", "done")
VALUES ('create database', 1200, false), 
('HTML setup', 1300, false),
('GET route working', 1400, false),
('POST route working', 1600, false)
