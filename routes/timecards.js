const { Timecard } = require('companydata');
const express = require('express');
const { update } = require('../business/timecards');
const router = express.Router();
const timecards = require('../business/timecards');

// app/timecard/all
// returns all timecards
// *NE RADI
router.get('/all', (req, res) => {
    res.json(timecards.get(req.query.emp_id));
});

// app/timecard
// returns single timecard
// *NE RADI
router.get('/', (req, res) => {
    res.json(timecards.getSingle(req.query.timecard_id));
});





// /app/timecard
// creates new timecard
// *NE RADI
router.post('/', (req, res) => {
    console.log(req.body);
    let tc = timecards.insert(req.body.emp_id, req.body.start_time, req.body.end_time);
    res.json(tc);
});

// /app/department
// updates department
// *NE RADI
// router.put('/', (req, res) => {
//     let updatedDept = new Department(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location, req.body.dept_id);
//     let dept = departments.update(updatedDept);
//     res.json(dept);
// });

// /app/department
// updates department
// *NE RADI
// router.delete('/', (req, res) => {
//     let result = departments.delete(req.query.company, req.query.dept_id);
//     let msg;
//     if(result) {
//         msg = "Successfull deletion of department "+req.query.dept_id + " for company " + req.query.company;
//     }
//     else msg = "An error occured. No departments were deleted. Please check company name and department id."
//     res.json({
//         data: msg
//     });
// });

module.exports = router;