const { Department } = require('companydata');
const express = require('express');
const router = express.Router();
const departments = require('../business/departments');

// app/department/all
// returns all departments
router.get('/all', (req, res) => {
    res.json(departments.get(req.query.company));
});

// app/department
// returns single department
router.get('/', (req, res) => {
    res.json(departments.getSingle(req.query.company, req.query.dept_id));
});

// /app/department
// creates new department
router.post('/', (req, res) => {
    let dept = departments.insert(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location);
    res.json(dept);
});

// /app/department
// updates department
router.put('/', (req, res) => {
    let updatedDept = new Department(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location, req.body.dept_id);
    let dept = departments.update(updatedDept);
    res.json(dept);
});

// /app/department
// deletes department
router.delete('/', (req, res) => {
    let result = departments.delete(req.query.company, req.query.dept_id);
    res.json(result);
});

module.exports = router;