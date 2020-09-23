const inquirer = require("inquirer");
var mysql = require("mysql");
const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3000",
    user: "root",
    Password: "",
    database: "tracker"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "/n");
    start();
});

function start() {
    inquirer
    .prompt({
        name: "start",
        type: "input",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Remove employee",
            "Update employee",
            "Exit"
        ]
    }).then(function(answer) {
        switch (answer.start) {
            case "View all employees":
                view();
                break;
            case "View All employees by department":
                viewxDepartment();
                break;
            case "View all employees by manager":
                viewxManager();
                break;
            case "Add employee":
                add();
                break;
            case "Remove employee":
                remove();
                break;
            case "Update employee":
                update();
                break;
            case "Exit":
                connection.end();
        }
        
    })
}