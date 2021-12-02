const dataLayer = require('companydata');
const moment = require('moment');
const business = require('moment-business');
const timecards = require('./timecards');

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

    // isInput(input, msg){
    //     if(!input)   this.errorMessages.push(msg);
    // }

    getTimestamp(timestamp) {
        if (timestamp == undefined || timestamp == null || timestamp == '') {
            this.addErr("Timestamp must be defined.");
        }

        if(moment(timestamp, this.DATE_FORMAT, true).isValid()) {
            return Date.parse(timestamp);
        } 
        else this.addErr("Timestamp not matching desired format: " + this.DATE_FORMAT);

        return null;
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
    
        return dept; // null if no timecard
    }

    isEmpty(list, reason) {
        if(list.length == 0) {
            this.addErr("No records exist in the database for " + reason);
        }
    }
    
    validateUniqueEmplyeeID(emp_no, current) {
        let emp_nos = []

        dataLayer.getAllEmployee().forEach(employee => {
            if(employee.emp_id != current) emp_nos.push(employee.emp_id)
        });
        if(emp_nos.includes(emp_no)) this.addErr("Employee with id:" +emp_no+" already exists.");
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
        
        if(moment(hire_date, this.DATE_FORMAT_SIMPLE, true).isValid()) {
            parsed = Date.parse(hire_date);
            parsed = moment(parsed);
        } 
        else this.addErr("Hire date: " + hire_date + " not matching desired format: " + this.DATE_FORMAT_SIMPLE);
        
        if(parsed.isAfter(this.now)) addErr("Hire date: " + hire_date + " must be in the past.");
    
        if(business.isWeekendDay(parsed)) addErr("Hire date: " + hire_date + " cannot occur on Saturday or Sunday.");

        return parsed;
    }

     validateTimecardDates(startdate, enddate, emp_id, update) {
        let start = moment(Date.parse(startdate));
        let end = moment(Date.parse(enddate));

        if(end.isBefore(start)) addErr("The start date must be before end date");
        if(!end.isSame(start)) addErr("Start and end dates must be on the same date");
        if(business.isWeekyyyyyendDay(start)) addErr("Start date cannot occur on Saturday or Sunday.");

        if( (end.hour - start.hour) < 1) addErr("There must be at least 1 hour difference between timestamps.");
        if(start.hour < 6) addErr("Start hour must be after 6am");
        if(start.hour > 18) addErr("End hour must be before 6pm");
        
        if( (start.dayOfYear - this.now.dayOfYear) > 7) addErr("You can't start more then 7 days ago.");

        timecards = dataLayer.getAllTimecard(emp_id);
        existing_dates = [];
        
        timecards.forEach(timecard => {
            parsed = moment(Date.parse(timecard.startdate));
            existing_dates.push(moment(parsed));
        });

        if(existing_dates.includes(start)) addErr("A timecard already exists for the given date.");
    }
}

module.exports = new Validator();