const dataLayer = require('companydata');

class Timecards {
    get(emp_id){
        let response;
        if (emp_id){
            let result = dataLayer.getAllTimecard(emp_id);
            if(result != null && result.length > 0) {
                response = result;
            }else {
                response = {"error": "No timecards found for " + emp_id + '.'};
            }
        } else {
            response = { "error": "The employee id is missing." };
        }
        return response;
    }

    getSingle(timecard_id){
        let response;
        //todo: provjera za timecard_id
        if (timecard_id){
            let result = dataLayer.getTimecard(timecard_id);
            
            if(result != null) {
                response = result;
            }else {
                response = {"error": "No timecard found for timecard_id: " + timecard_id + ' .'};
            }
        } else {
            response = { "error": "The timecard_id is missing." };
        }
        return response;
    }
    
    insert(emp_id, start_time, end_time){
        let response;
        //todo: provjera za dept_id
        if (emp_id){
            let tc = new dataLayer.Timecard(emp_id, start_time, end_time);
            let result = dataLayer.insertTimecard(tc);

            if(result != null) {
                response = result;
            }else {
                response = {"error": "Can't add timecard for employee id: " +  emp_id + ', start time:' + start_time + ', end time: ' + end_time + ' .'};
            }
        } else {
            response = { "error": "The employee id is missing." };
        }
        return response;
    }
}

module.exports = new Timecards();