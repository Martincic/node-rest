const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');

// DEPARTMENT
app.use('/department', departmentsRouter); 

// TIMECARD
app.use('/timecard', timecardRouter);

// EMPLOYEE
app.use('/employee', employeeRouter);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
