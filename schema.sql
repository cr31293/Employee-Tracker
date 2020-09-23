DROP DATABASE IF EXISTS tracker;

CREATE DATABASE tracker;
USE tracker;

CREATE TABLE department (
    id INT NOT NULL,
    full_name VARCHAR(30),
    PRIMARY KEY (id) 
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL (8,2),
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
)