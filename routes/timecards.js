const { Timecard } = require('companydata');
const express = require('express');
const { update } = require('../business/timecards');
const router = express.Router();
const timecards = require('../business/timecards');

// app/timecard/all
// returns all timecards
// *RADI
router.get('/all', (req, res) => {
    res.json(timecards.get(req.query.emp_id));
});

// app/timecard
// returns single timecard
// *RADI
router.get('/', (req, res) => {
    res.json(timecards.getSingle(req.query.timecard_id));
});

// /app/timecard
// creates new timecard
// *RADI
router.post('/', (req, res) => {
    console.log(req.body);
    let tc = timecards.insert(req.body.emp_id, req.body.start_time, req.body.end_time);
    res.json(tc);
});

//TODO: PUT
//TODO: DELETE


// /app/department
// updates department
// *RADI
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
// *RADI
router.delete('/', (req, res) => {
    let result = timecards.delete(req.query.timecard_id);
    let msg;
    if(result) {
        msg = "Successfull deletion of timecard "+req.query.timecard_id ;
    }
    else msg = "An error occured. No timecards were deleted. Please check timecard id."
    res.json({
        data: msg
    });
});

module.exports = router;