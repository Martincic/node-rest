const dataLayer = require('companydata');
const { employeeExists } = require('./validator');
const validator = require('./validator');

class Timecards {
    get(emp_id){
        let response;
        validator.clearValidator();

        if (!emp_id){
            response = { "error": "Enter missing employee id." };
        }else {
            validator.employeeExists(emp_id);

            let tc = dataLayer.getAllTimecard(emp_id);
            validator.isEmpty(tc, "employee with id: " + emp_id);
            
            if(validator.hasFailed()) 
                response = {"errors": validator.getErrors()};
            else
                response = { success: tc } ;
        }
                        
        return response;
    }

    getSingle(timecard_id){
        let response;
        validator.clearValidator();
        
        if (!timecard_id){
            response = { "error": "Enter missing timecard id." };
        }else {
            validator.timecardExists(timecard_id);
            if(validator.hasFailed()) response = { error: validator.getErrors() }
            else response = { success: dataLayer.getTimecard(timecard_id) } ;
        }
        return response;
    }
    
    insert(emp_id, start_time, end_time)
    {
        if(!emp_id) return { "error": "The employee id is missing." };
        let response;
        
        validator.clearValidator();

        validator.checkFormat(start_time);
        validator.checkFormat(end_time);

        validator.validateTimecardDates(start_time, end_time, emp_id);
        validator.employeeExists(emp_id);

        if(validator.hasFailed()) response = { error: validator.getErrors() };
        else {
            let tc = new dataLayer.Timecard(start_time, end_time, emp_id);
            response = { success: dataLayer.insertTimecard(tc) };
        }
        
        return response;
    }

    update(timecard){
        let response;
        validator.clearValidator();

        validator.checkFormat(timecard.start_time);
        validator.checkFormat(timecard.end_time);

        validator.timecardExists(timecard.timecard_id);
        validator.validateTimecardDates(timecard.start_time, timecard.end_time, timecard.emp_id, true);

        if(validator.hasFailed()) response = { errors: validator.getErrors() };
        else response = { success: dataLayer.updateTimecard(timecard) };

        return response;

        // let tc = dataLayer.getTimecard(timecard.timecard_id);

        // if(timecard == null) return "Timecard does not exist";
        
        // tc.setStartTime(timecard.start_time);
        // tc.setEndTime(timecard.end_time);
        // tc.setId(timecard.timecard_id);
        // let updated = dataLayer.updateTimecard(tc);

        // if(updated == null) return "Error!";
        // else return updated;
    }

    delete(timecard_id) {
        let response;
        validator.clearValidator();

        if (!timecard_id){
            response = { "error": "Enter missing timecard id." };

        }else {
            validator.timecardExists(timecard_id);

            if(validator.hasFailed()) 
                response = { errors: validator.getErrors() };
            else{
                dataLayer.deleteTimecard(timecard_id);
                response = {success: "Timecard " + timecard_id + " deleted." };
            }
        }
        return response;

        // if(dataLayer.deleteTimecard(timecard_id) == 0) return false;
        // else return true;
    }
}

module.exports = new Timecards();