const express = require('express');
const app = express();
const port = 3000;

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');
const dept = require('./business/departments');

console.log("app use routers");

app.get('/departments', (req, res) => {
  res.json(dept.get(req.query.company));
});

//////myb radi
app.use('/department', departmentsRouter);

///myb radi
app.use('/timecards', timecardRouter);
app.use('/employees', employeeRouter);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
