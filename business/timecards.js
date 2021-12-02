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
            let tc = new dataLayer.Timecard(start_time, end_time, emp_id);
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

    update(timecard){
        let tc = dataLayer.getTimecard(timecard.timecard_id);

        if(timecard == null) return "Timecard does not exist";
        
        tc.setStartTime(timecard.start_time);
        tc.setEndTime(timecard.end_time);
        tc.setId(timecard.timecard_id);
        let updated = dataLayer.updateTimecard(tc);

        if(updated == null) return "Error!";
        else return updated;
    }

    delete(timecard_id) {
        if(dataLayer.deleteTimecard(timecard_id) == 0) return false;
        else return true;
    }
}

module.exports = new Timecards();