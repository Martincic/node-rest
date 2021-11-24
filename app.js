const express = require('express');
const app = express();
const port = 3000;

const departmentsRouter = require('./routes/departments');
const timecardRouter = require('./routes/timecards');
const employeeRouter = require('./routes/employees');

console.log("app use routers");


app.get('/department', (req, res) => {
  res.json(require('./business/departments').getSingle(req.query.company, req.query.dept_id));
});
app.use('/departments', departmentsRouter);
app.use('/timecards', timecardRouter);
app.use('/employees', employeeRouter);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
