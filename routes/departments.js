const express = require('express');
const router = express.Router();
console.log("department router..");
const departments = require('../business/departments');

router.get('/', (req, res) => {
    res.json(departments.get(req.query.company));
});


console.log("department router did not find route..");

module.exports = router;
