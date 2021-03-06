const { Timecard } = require('companydata');
const express = require('express');
const router = express.Router();
const timecards = require('../business/timecards');

// app/timecard/all
// returns all timecards
router.get('/all', (req, res) => {
    let result = timecards.get(req.query.emp_id);
    res.json(result);
});

// app/timecard
// returns single timecard
router.get('/', (req, res) => {
    res.json(timecards.getSingle(req.query.timecard_id));
});

// /app/timecard
// creates new timecard
router.post('/', (req, res) => {
    let tc = timecards.insert(req.body.emp_id, req.body.start_time, req.body.end_time);
    res.json(tc);
});


// /app/department
// updates department
router.put('/', (req, res) => {
    let updatedTimecard = new Timecard();
    updatedTimecard.setStartTime(req.body.start_time);
    updatedTimecard.setEndTime(req.body.end_time);
    updatedTimecard.setId(req.body.timecard_id);
    let tc = timecards.update(updatedTimecard);
    res.json(tc);
});

// /app/department
// updates department
router.delete('/', (req, res) => {
    let result = timecards.delete(req.query.timecard_id);
    res.json(result);
});

module.exports = router;