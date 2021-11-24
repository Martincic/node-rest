const express = require('express');
const router = express.Router();

const timecards = require('../business/timecards');

router.get('/', (req, res) => {
    res.json(timecards.get(req.query.company));
});

module.exports = router;