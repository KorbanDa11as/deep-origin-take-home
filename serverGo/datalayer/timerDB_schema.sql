
CREATE TABLE task(id INTEGER PRIMARY KEY AUTOINCREMENT, progress INT,  name TEXT, tags TEXT  );
CREATE TABLE task_assignees(id INTEGER PRIMARY KEY AUTOINCREMENT, user INT, task INT, FOREIGN KEY(user) REFERENCES user(id), FOREIGN KEY(task) REFERENCES task(id));
/*CREATE TABLE composition(id INTEGER PRIMARY KEY AUTOINCREMENT,repeat INT, name TEXT, description TEXT );*/
CREATE TABLE user(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT);
/*CREATE TABLE user(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, avatar int, FOREIGN KEY(avatar) REFERENCES avatar(id));*/
CREATE TABLE avatar(id INTEGER PRIMARY KEY AUTOINCREMENT, image BLOB, image_type TEXT); 


INSERT INTO user (first_name, last_name)
VALUES ('John','Anderson'),
('Jane','Baker'),
('Robert','Brown'),
('Mary','Campbell'),
('David','Carter'),
('Linda','Clark'),
('Michael','Davis'),
('Susan','Edwards'),
('Joseph','Garcia'),
('Patricia','Green'),
('Daniel','Hall'),
('Jennifer','Harris'),
('Matthew','Jackson'),
('Maria','Jones'),
('Joshua','King'),
('Elizabeth','Lewis'),
('Christopher','Miller'),
('Barbara','Mitchell'),
('Timothy','Moore'),
('Jessica','Taylor');


INSERT INTO task (progress, name,tags) VALUES(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test'),
(80,'blah', 'new, test');

