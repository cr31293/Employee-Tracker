USE tracker;

INSERT INTO department (id)
VALUES ("1001"), ("1002"), ("1003");

INSERT INTO department (name)
VALUES ("Chris Reed"), ("Meghan Iman"), ("Lisa Reed");

INSERT INTO role (id)
VALUES ("1001"), ("1002"), ("1003");

INSERT INTO role (title)
VALUES ("Engineer"), ("Manager"), ("Founder");

INSERT INTO role (salary)
VALUES ("60,000"), ("80,000"), ("");

INSERT INTO role (department_id)
VALUES ("1020"), ("1020"), ("0000");