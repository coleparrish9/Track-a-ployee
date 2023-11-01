const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const db = require('././db/connection');
const mySqlQueries = require('./db/queries')
const sqlQuery = new mySqlQueries();

async function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the department you would like to add?',
        }
    ]).then((answers) => {
       switch(answers.addDepartment) {
              case answers.addDepartment:
                db.query(sqlQuery.addDepartment(), [answers.addDepartment], (err, results) => {
                     if (err) {
                          console.log(err);
                     } else {
                          console.log('Department added!');
                          return promptUser();
                     }
                });
                break;
       }
    })
};

async function addRole() {
    const departments = db.query(sqlQuery.viewDepartments(), (err, results) => {
        if (err) {
            console.log(err);
        } 
        const deptObject = JSON.parse(JSON.stringify(results))
        const deptArray = Array.from(deptObject)
        const departmentChoices = deptArray.map(department => department['id'])

        inquirer.prompt([
            {
                type: 'input',
                name: 'addRole',
                message: 'What is the name of the role you would like to add?',
            },
            {
                type: 'input',
                name: 'addSalary',
                message: 'What is the starting salary for this role?',
            },
            {
                type: 'list',
                name: 'addDepartment',
                message: 'Which department does this role belong to?',
                choices: departmentChoices
            }
        ]).then((answers) => {
            const departmentName = answers.addDepartment
            const departmentID = departmentName // find department id based on department name
            console.log(departmentID)

            switch(answers.addRole) {
                case answers.addRole:
                    db.query(sqlQuery.addRole(), [answers.addRole, answers.addSalary, departmentID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Role added!');
                            return promptUser();
                        }
                    });
                    break;
            }
        })

    })
};

async function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addFirstName',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'addLastName',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'addRoleID',
            message: 'What is the role ID of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'addManagerID',
            message: 'What is the manager ID of the employee you would like to add?',
        }
    ]).then((answers) => {
        switch(answers.addFirstName) {
            case answers.addFirstName:
                db.query(sqlQuery.addEmployee(), [answers.addFirstName, answers.addLastName, answers.addRoleID, answers.addManagerID], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Employee added!');
                        return promptUser();
                    }
                });
        }
    })
};

async function updateEmployeeRole() {
    db.query(sqlQuery.viewEmployees(), (err, results) => {
        if (err) {
            console.log(err);
        } 
        const employeeObject = JSON.parse(JSON.stringify(results))
        const employeeArray = Array.from(employeeObject)
        const employeeChoices = employeeArray.map(employee => employee['Employee Name', 'ID'])

        console.log(employeeChoices)

        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: employeeChoices
            },
            {
                type: 'input',
                name: 'updateRole',
                message: 'What is the new role ID for this employee?',
            }
        ]).then((answers) => {
            const roleId = answers.updateRole
            console.log(roleId)
            
            switch(answers.updateRole) {
                case answers.updateRole:
                    db.query(sqlQuery.updateEmployeeRole(), [roleId, answers.updateEmployee], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Employee role updated!');
                            return promptUser();
                        }
                    });
                    break;
            }
        })

    })
};

function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an existing employee role', new inquirer.Separator(), 'Exit'],
            loop: true
        }
    ]).then((answers) => { 
        switch(answers.prompt) {
            case 'View all departments':
                db.query(sqlQuery.viewDepartments(), (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                        }
                    }); 
                break;
            case 'View all roles':
                db.query(sqlQuery.viewRoles(), (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                    }
                });
                break;
            case 'View all employees':
                db.query(sqlQuery.viewEmployees(), (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                    }
                });
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an existing employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                process.exit();
        }


    })

}

promptUser();
