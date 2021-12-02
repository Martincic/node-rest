const express = require('express');
const router = express.Router();
const { Employee } = require('companydata');

console.log("employee router..");
const employees = require('../business/employees');

// app/employee/all
// returns all employees
router.get('/all', (req, res) => {
    res.json(employees.get(req.query.company));
});

// app/employee
// returns single employee
router.get('/', (req, res) => {
    res.json(employees.getSingle(req.query.emp_id));
});

// /app/employee
// creates new employee
router.post('/', (req, res) => {
    console.log(req.body);
    let emp = employees.insert(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
    res.json(emp);
});

// /app/employee
// updates employee
router.put('/', (req, res) => {
    let updatedEmp = new Employee(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id, req.body.emp_id);
    let result = employees.update(updatedEmp);
    

    if(result) res.json({data: "Success! Employee "+req.body.emp_id+" successfully updated!"});
    else res.json({error: "There was a problem updating employee "+req.body.emp_id});
});

// /app/employee
// deletes employee
router.delete('/', (req, res) => {
    let result = employees.delete(req.query.emp_id);
    let msg;
    if(result) {
        msg = "Successfull deletion of employee "+req.query.emp_id;
    }
    else msg = "An error occured. No employees were deleted. Please check id."
    res.json({
        data: msg
    });
});

module.exports = router;