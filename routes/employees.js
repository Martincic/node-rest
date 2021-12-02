const express = require('express');
const router = express.Router();
const { Employee } = require('companydata');

const employees = require('../business/employees');

// app/employee/all
// returns all employees
router.get('/all', (req, res) => {
    res.json(employees.get(req.query.company));
});

// app/employee
// returns single employee
router.get('/', (req, res) => {
    let emp = employees.getSingle(req.query.emp_id);
    res.json(emp);
});

// /app/employee
// creates new employee
router.post('/', (req, res) => {
    let emp = employees.insert(req.body.company, req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
    res.json(emp);
});

// /app/employee
// updates employee
router.put('/', (req, res) => {
    let updatedEmp = new Employee(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id, req.body.emp_id);
    let result = employees.update(updatedEmp, req.body.company);
    res.json(result);
});

// /app/employee
// deletes employee
router.delete('/', (req, res) => {
    let result =  employees.delete(req.query.emp_id);
    res.json(result);
});

module.exports = router;