const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');

//Testing validations
// const validator = require('./business/validator');

// console.log(validator.getTimestamp('2021-11-29 08:00:00'));
// console.log(validator.errorMessage());
// // 1638169200000
// console.log(validator.getTimestamp('202-1-29 08:00'));
// console.log(validator.errorMessage());

// console.log(validator.getTimestamp(''));
// console.log(validator.errorMessage());

// -55790270640000

// DEPARTMENT
app.use('/department', departmentsRouter); 

// TIMECARD
app.use('/timecard', timecardRouter);

// EMPLOYEE
app.use('/employee', employeeRouter);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
