const dataLayer = require('companydata');
const moment = require('moment');
const business = require('moment-business');

class Validator {
    success = true;
    now = moment.now();
    DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"; 
    DATE_FORMAT_SIMPLE = "YYYY-MM-DD"; 
    errorMessages = [];
    
    clearValidator() {
        this.success = true;
        this.errorMessages = [];
    }

    hasFailed() {
        return !this.success;
    }

    getErrors() {
        return this.errorMessages;
    }
    
    addErr(error) {
        this.success = false;
        this.errorMessages.push(error);
    }

    checkFormat(timestamp) {
        if (timestamp == undefined || timestamp == null || timestamp == '') {
            this.addErr("Timestamp must be defined.");
        }

        if(moment(timestamp, this.DATE_FORMAT, true).isValid()) {
            return Date.parse(timestamp);
        } 
        else this.addErr("Timestamp not matching desired format: " + this.DATE_FORMAT);
    }
    
    employeeExists(emp_id){
        let emp = dataLayer.getEmployee(emp_id);
        if(emp == null){
            this.addErr("Employee with id: "+emp_id+" was not found.");
        }
    
        return emp; // null if no employee
    }

    timecardExists(timecard_id){
        let tc = dataLayer.getTimecard(timecard_id);
        if(tc == null){
            this.addErr("Timecard with id: "+timecard_id+" was not found.");
        }
    
        return tc; // null if no timecard
    }

    departmentExists(company, dept_id){
        let dept = dataLayer.getDepartment(company, dept_id);
        if(isNaN(dept_id)){
            this.addErr("Entered department id " + dept_id + " is not a number.");
        }
        else if(dept == null){
            this.addErr("Department with id: "+dept_id+" was not found for company: " + company);
        }
    
        return dept; // null if no department
    }

    isEmpty(list, reason) {
        if(list.length == 0) {
            this.addErr("No records exist in the database for " + reason);
        }
    }
    
    validateUniqueEmployeeID(emp_id, current) {
        let emp_ids = []

        dataLayer.getAllEmployee().forEach(employee => {
            if(employee.emp_id != current) emp_ids.push(employee.emp_id)
        });
        if(emp_ids.includes(emp_id)) this.addErr("Employee with id:" +emp_id+" already exists.");
    }

    validateUniqueDeptNo(company, dept_no, current) {
        let dept_nos = []

        dataLayer.getAllDepartment(company).forEach(department => {
            if(department.dept_no != current) dept_nos.push(department.dept_no)
        });
        if(dept_nos.includes(dept_no)) this.addErr("Department number:" +dept_no+" already exists for company "+ company + ".");
    }

    validateHireDate(hire_date){
        let parsed = null;

        try{        
            if(moment(hire_date, this.DATE_FORMAT_SIMPLE, true).isValid()) {
                parsed = Date.parse(hire_date);
                parsed = moment(parsed);
            } 
            else this.addErr("Hire date: " + hire_date + " not matching desired format: " + this.DATE_FORMAT_SIMPLE);
            
            if(parsed.isAfter(this.now)) this.addErr("Hire date: " + hire_date + " must be in the past or today.");
            if(business.isWeekendDay(parsed)) this.addErr("Hire date: " + hire_date + " cannot occur on Saturday or Sunday.");
        }
        catch(err) {
            this.addErr("Hire date is required. Use "+this.DATE_FORMAT_SIMPLE + " format.");
        }
        return parsed;
    }

     validateTimecardDates(startdate, enddate, emp_id, update = false) {
        let start = moment(Date.parse(startdate));
        let end = moment(Date.parse(enddate));
        console.log(start.get('hour'), startdate, end.get('hour'), enddate);
        if(end.isBefore(start)) this.addErr("The start date must be before end date");
        if(!end.isSame(start, 'day')) this.addErr("Start and end dates must be on the same date");
        if(business.isWeekendDay(start)) this.addErr("Start date cannot occur on Saturday or Sunday.");

        if( (end.get('hour') - start.get('hour')) < 1) this.addErr("There must be at least 1 hour difference between timestamps.");
        if(start.get('hour') < 6) this.addErr("Start hour must be after 6am");
        if(start.get('hour') > 18) this.addErr("End hour must be before 6pm");
        
        if( (start.get('day') - moment().day) > 7) this.addErr("You can't start more then 7 days ago.");

        let timecards = dataLayer.getAllTimecard(emp_id);
        let existing_dates = [];
        
        timecards.forEach(timecard => {
            let parsed = moment(Date.parse(timecard.startdate));
            existing_dates.push(moment(parsed));
        });

        if(!update && existing_dates.includes(start)) this.addErr("A timecard already exists for the given date.");

    }
}

module.exports = new Validator();