const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');
const dept = require('./business/departments');

console.log("app use routers");

// app.get('/departments', (req, res) => {
//   res.json(dept.get(req.query.company));
// });

// DEPARTMENT
app.use('/department', departmentsRouter); 

// TIMECARD
app.use('/timecard', timecardRouter);

// EMPLOYEE
app.use('/employee', employeeRouter);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
