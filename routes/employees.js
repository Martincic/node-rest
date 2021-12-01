const express = require('express');
const router = express.Router();
console.log("employee router..");
const employees = require('../business/employees');

// app/employee/all
// returns all employees
// *RADI
router.get('/all', (req, res) => {
    res.json(employees.get(req.query.company));
});

// app/employee
// returns single employee
// *RADI
router.get('/', (req, res) => {
    res.json(employees.getSingle(req.query.emp_id));
});

// /app/employee
// creates new employee
// *NE RADI
router.post('/', (req, res) => {
    console.log(req.body);
    // let emp = employees.insert(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
    // res.json(emp);
});

// /app/employee
// updates employee
// *NE RADI
router.put('/', (req, res) => {
    // let updatedEmp = new Employee(req.body.emp_id, req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
    // let emp = employees.update(updatedEmp);
    // res.json(emp);
});

module.exports = router;