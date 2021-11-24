const express = require('express');
const app = express();
const port = 3000;

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');
const basePath = 'http://192.168.0.23:3000/MarasovicKP3/CompanyServices';

console.log("app use routers");

app.get('/test', (req, res) => {
    res.send('Hello World!')
  });

app.use('/departments', departmentsRouter);
app.use('/timecard', timecardRouter);
app.use('/employee', employeeRouter);


app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
