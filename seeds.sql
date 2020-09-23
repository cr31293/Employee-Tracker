USE tracker;

INSERT INTO department (id, full_name)
VALUES ("1000", "Chris Reed");

INSERT INTO department (id, full_name)
VALUES ("1001", "Meghan Iman");

INSERT INTO department (id, full_name)
VALUES ("0001", "Lisa Reed");

INSERT INTO roles (id, title, salary, department_id)
VALUES ("1000", "Engineer", 65000.00, 124);

INSERT INTO roles (id, title, salary, department_id)
VALUES ("1001", "Manager", 80000.00, 124);

INSERT INTO roles (id, title, salary, department_id)
VALUES ("0001", "Founder", 1.00, 001);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1000", "Chris", "Reed", "564", "444");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1001", "Meghan", "Iman", "500", NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("0001", "Lisa", "Reed", "564", NULL);