const express = require('express');
const router = express.Router();
console.log("department router..");
const departments = require('../business/departments');

router.get('/', (req, res) => {
    res.json(departments.getSingle(req.query.company, req.query.dept_id));
});

router.post('/', (req, res) => {
    let dept = departments.insert(req.body.company, req.query.dept_name, req.query.dept_no, req.query.location);
    res.json(dept);
});


console.log("department router did not find route..");

module.exports = router;
