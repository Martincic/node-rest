const { Department } = require('companydata');
const express = require('express');
const { update } = require('../business/departments');
const router = express.Router();
const departments = require('../business/departments');

// app/department/all
// returns all departments
// *RADI
router.get('/all', (req, res) => {
    res.json(departments.get(req.query.company));
});

// app/department
// returns single department
// *RADI
router.get('/', (req, res) => {
    res.json(departments.getSingle(req.query.company, req.query.dept_id));
});

// /app/department
// creates new department
// *RADI
router.post('/', (req, res) => {
    console.log(req.body);
    let dept = departments.insert(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location);
    res.json(dept);
});

// /app/department
// updates department
// *RADI
router.put('/', (req, res) => {
    let updatedDept = new Department(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location, req.body.dept_id);
    let dept = departments.update(updatedDept);
    res.json(dept);
});

// /app/department
// updates department
// *RADI
router.delete('/', (req, res) => {
    let result = departments.delete(req.query.company, req.query.dept_id);
    let msg;
    if(result) {
        msg = "Successfull deletion of department "+req.query.dept_id + " for company " + req.query.company;
    }
    else msg = "An error occured. No departments were deleted. Please check company name and department id."
    res.json({
        data: msg
    });
});

module.exports = router;