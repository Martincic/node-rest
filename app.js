const express = require('express');
const app = express();
const port = 3000;

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');
const basePath = 's';

console.log("app use routers");
app.use(basePath + '/departments', departmentsRouter);
app.use(basePath + '/department', departmentsRouter);

app.use(basePath + '/timecard', timecardRouter);
app.use(basePath + '/employee', employeeRouter);


app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
