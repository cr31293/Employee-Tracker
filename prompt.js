const inquirer = require("inquirer");
const EditorPrompt = require("inquirer/lib/prompts/editor");
var mysql = require("mysql");
const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    Password: "",
    database: "tracker"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    begin();
});

function begin() {
    inquirer
    .prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by role",
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
            case "View all employees by role":
                viewRole();
                break;
            case "View all employees by manager":
                viewManager();
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
    });
};

// function to handle "view all employees"
function view() {
    connection.query(`
        SELECT department.id, department.full_name, roles.title, roles.salary, roles.department_id, employee.manager_id 
        FROM department 
        RIGHT JOIN roles 
            ON department.id = roles.id 
        RIGHT JOIN employee 
            ON department.id = employee.id;
        `, 
        function(err, res) {
            if (err) throw err;
            console.table(res);
        inquirer.prompt({
            name: "return",
            type: "list",
            choices: ["edit", "return", "exit"]
        })
        .then(function(answer) {
            switch (answer.return) {
                case "edit":
                    edit();
                    break;
                case "return":
                    begin();
                    break;
                case "exit":
                    connection.end();
            }
        });
})};

// function to handle "view employees by role"
function viewRole() {
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which role would you like to view?",
        choices: [
            "Engineer",
            "Manager",
            "Designer",
            "Executive",
            "Return",
            "Exit"
        ]
    }).then(function(answer) {
        switch (answer.role) {
            case "Engineer":
                engineer();
                break;
            case "Manager":
                manager();
                break;
            case "Designer":
                designer();
                break;
            case "Executive":
                executive();
                break;
            case "Return":
                begin();
                break;
            case "Exit":
                connection.end();
        }
    });
};

// function to handle "view all employees by manager"
function viewManager() {
    var isManager = {}

    connection.query("SELECT full_name, id FROM joined WHERE title = 'Manager'", function(err, x) {
        if (err) {
            throw err;
        } else {
            setManager(x);
        }
    });

    function setManager(value) {
        isManager = value;
        console.log(isManager);
    };
    
    inquirer.prompt({
        name: "managerid",
        type: "input",
        message: "Enter the id of the Manager's team you would like to view?",
    }).then(function(answer) {
        
            
        connection.query(
            `SELECT * FROM joined WHERE manager_id = ?;`, [answer.managerid],
            function(err, res) {
                if (err) throw err;
                console.table(res);
                inquirer.prompt({
                    name: "return",
                    type: "list",
                    choices: ["edit", "return", "exit"]
                })
                .then(function(answer) {
                    switch (answer.return) {
                        case "edit":
                            edit();
                            break;
                        case "return":
                            begin();
                            break;
                        case "exit":
                            connection.end();
                    }
                });
            })

    });
};

// function to handle "add employee"


// show employees in engineering
function engineer() {
    connection.query(
        `
        SELECT * 
        FROM joined 
        WHERE title = "Engineer";
        `,
    function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt({
            name: "return",
            type: "list",
            choices: ["return", "exit"]
        }).then(function(answer) {
            switch (answer.return) {
                case "return":
                    begin();
                    break;
                case "exit":
                    connection.end();
            }
        });
    })
};

// show Managers
function manager() {
    connection.query(
        `
        SELECT * 
        FROM joined 
        WHERE title = "Manager";
        `,
    function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt({
            name: "return",
            type: "list",
            choices: ["return", "exit"]
        }).then(function(answer) {
            switch (answer.return) {
                case "return":
                    begin();
                    break;
                case "exit":
                    connection.end();
            }
        });
    })
};

// show Designers
function designer() {
    connection.query(
        `
        SELECT * 
        FROM joined 
        WHERE title = "Designer";
        `,
    function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt({
            name: "return",
            type: "list",
            choices: ["return", "exit"]
        }).then(function(answer) {
            switch (answer.return) {
                case "return":
                    begin();
                    break;
                case "exit":
                    connection.end();
            }
        });
    })
};

// show Executives
function executive() {
    connection.query(
        `
        SELECT * 
        FROM joined 
        WHERE title = "Executive";
        `,
    function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt({
            name: "return",
            type: "list",
            choices: ["return", "exit"]
        }).then(function(answer) {
            switch (answer.return) {
                case "return":
                    begin();
                    break;
                case "exit":
                    connection.end();
            }
        });
    });
};

// Edit table function
function edit() {
    inquirer.prompt([
        {
            name: "index",
            type: "input",
            message: "Please input the id of the employee you'd like to edit"
        },
        {
            name: "edit",
            type: "list",
            choices: [
                "full_name",
                "first_name",
                "last_name",
                "title",
                "salary",
                "department_id",
                "role_id",
                "manager_id",
                "exit"
                ]
        },

    
    ]).then(function(answer) {
        switch(answer.edit) {
            case "full_name":
                editDepo();
                break;
            case "first_name":
                editEmploy();
                break;
            case "last_name":
                editEmploy();
                break;
            case "title":
                editRoles();
                break;
            case "salary":
                editRoles();
                break;
            case "department_id":
                editRoles();
                break;
            case "role_id":
                editEmploy();
                break;
            case "manager_id":
                editEmploy();
                break;
            case "exit":
                connection.end();
        };
   
 

        function editDepo() {
            
            var index = answer.index;
            var edit = answer.edit;

            inquirer.prompt({
                name: "newEdit",
                type: "input",
                message: `Please input the new ${answer.edit}`
            }).then(function(answer) {

                var input = answer.newEdit;

                
            connection.query(
                `UPDATE department SET ${edit} = ? WHERE id = ?;`, [input, index],
                function(err, res) {
                    if (err) throw err;
                    console.log("Your edit has been made to the department table");
                    console.table(res);
                })

            connection.query(
                `UPDATE joined SET ${edit} = ? WHERE id = ?;`, [input, index],
                function(err, res) {
                    if (err) throw err;
                    console.log("Your edit has been made to the joined table");
                    console.table(res);
                });

                view();

                }
            )}
        

        function editEmploy() {
            
            var index = answer.index;
            var edit = answer.edit;

            inquirer.prompt({
                name: "newEdit",
                type: "input",
                message: `Please input the new ${answer.edit}`
            }).then(function(answer) {

                var input = answer.newEdit;

                
            connection.query(
                `UPDATE employee SET ${edit} = ? WHERE id = ?;`, [input, index],
                function(err, res) {
                    if (err) throw err;
                    console.log("Your edit has been made to the employee table");
                    console.table(res);
                })

                view();

                }
            )}

            function editRoles() {
            
                var index = answer.index;
                var edit = answer.edit;
    
                inquirer.prompt({
                    name: "newEdit",
                    type: "input",
                    message: `Please input the new ${answer.edit}`
                }).then(function(answer) {
    
                    var input = answer.newEdit;
    
                    
                connection.query(
                    `UPDATE roles SET ${edit} = ? WHERE id = ?;`, [input, index],
                    function(err, res) {
                        if (err) throw err;
                        console.log("Your edit has been made to the roles table");
                        console.table(res);
                    })
    
                connection.query(
                    `UPDATE joined SET ${edit} = ? WHERE id = ?;`, [input, index],
                    function(err, res) {
                        if (err) throw err;
                        console.log("Your edit has been made to the joined table");
                        console.table(res);
                    });
    
                    view();
    
                    }
                )}

        })
   
    };



