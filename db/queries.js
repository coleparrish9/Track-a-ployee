class SQLquery {
    viewAllRoles() {
        return `SELECT 
                    roles.id AS 'ID', 
                    roles.title AS 'Title', 
                    roles.salary AS 'Salary', 
                    departments.department_name AS 'Department' 
                FROM 
                    roles 
                JOIN departments ON 
                    roles.department_id = departments.id;`;
    }
    viewAllDepartments() {
        return `SELECT 
                    departments.id AS 'ID', 
                    departments.department_name AS 'Department' 
                FROM 
                    departments`;
    }
    viewAllEmployees() {
        return `SELECT 
                    employees.id AS 'ID', 
                    CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employee', 
                    roles.title AS 'Title', 
                    departments.department_name AS 'Department', 
                    roles.salary AS 'Salary', 
                    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' 
                FROM 
                    employees 
                JOIN roles ON 
                    employees.role_id = roles.id 
                JOIN departments ON 
                    roles.department_id = departments.id 
                LEFT JOIN employees manager ON 
                    manager.id = employees.manager_id;`;
    }
    viewAllEmployeesByManager(queryParam) {
        if (queryParam === 'managerID') {
            return `SELECT 
                        id, 
                        first_name, 
                        last_name 
                    FROM 
                        employees 
                    WHERE 
                        manager_id IS NULL OR manager_id = 1`;
        }
        if (queryParam === 'employees') {
            return `SELECT 
                        CONCAT(first_name, ' ',last_name) AS 'Employee'
                    FROM 
                        employees
                    WHERE 
                        manager_id = ?;`;
        }
    }
    viewAllEmployeesByDepartment() {
        return `SELECT
                    CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employee',
                    roles.title AS 'Title'
                FROM 
                    employees
                JOIN roles ON 
                    employees.role_id = roles.id
                JOIN departments ON 
                    roles.department_id = departments.id
                WHERE 
                    departments.department_name = ?`;
    }
    viewDepartmentBudget() {
        return `SELECT 
                    departments.department_name, 
                    SUM(roles.salary) AS total_salary
                FROM 
                    employees
                JOIN roles ON 
                    employees.role_id = roles.id
                JOIN departments ON 
                    roles.department_id = departments.id
                WHERE 
                    departments.department_name = ?
                GROUP BY departments.department_name`;
    }
    addThisToDB(queryParam) {
        if (queryParam === 'addDepartment') {
            return `INSERT INTO 
                        departments (department_name) 
                    VALUES (?)`;
        }
        if (queryParam === 'addRole') {
            return `INSERT INTO 
                        roles (title, salary, department_id) 
                    VALUES (?, ?, ?)`;
        }
        if (queryParam === 'addEmployee') {
            return `INSERT INTO 
                        employees (first_name, last_name, role_id, manager_id) 
                    VALUES (?, ?, ?, ?)`;
        }
    }
    updateEmployeeRole() {
        return `UPDATE
                    employees
                SET
                    role_id = ?
                WHERE
                    id = ?`;
    }
    getQuery(queryParam) {
        if (queryParam === 'getDepartmentNames') {
            return `SELECT 
                        department_name 
                    FROM 
                        departments`;
        }
        if (queryParam === 'getDepartmentID') {
            return `SELECT 
                        id 
                    FROM 
                        departments 
                    WHERE 
                        department_name = ?`;
        }
        if (queryParam === 'getRoleTitles') {
            return `SELECT 
                        title 
                    FROM 
                        roles`;
        }
        if (queryParam === 'getRoleID') {
            return `SELECT 
                        id 
                    FROM 
                        roles 
                    WHERE 
                        title = ?`;
        }
        if (queryParam === 'getEmployeeNames') {
            return `SELECT 
                        id,
                        first_name,
                        last_name 
                    FROM 
                        employees`;
        }
        if (queryParam === 'getManagerID') {
            return `SELECT 
                        id 
                    FROM 
                        employees 
                    WHERE 
                        first_name = ? AND last_name = ?`;
        }
        if (queryParam === 'getManagers') {
            return `SELECT 
                        first_name, 
                        last_name 
                    FROM 
                        employees 
                    WHERE 
                        manager_id IS NULL OR manager_id = 1`;
        }
    }
}

module.exports = SQLquery;