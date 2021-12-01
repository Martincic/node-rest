const dataLayer = require('companydata');

class Employees {
    get(company, dept_id){
        let response;
        //todo: provjera za company
        if (company){
            let result = dataLayer.getAllEmployee(company);
            if(result != null && result.length > 0) {
                response = result;
            }else {
                response = {"error": "No employees found for company: " + company + ' .'};
            }
        } else {
            response = { "error": "The company name is missing." };
        }
        return response;
    }

    getSingle(emp_id){
        let response;
        //todo: provjera za emp_id
        if (emp_id){
            let result = dataLayer.getEmployee(emp_id);
            
            if(result != null) {
                response = result;
            }else {
                response = {"error": "No employee found for dept_id: " + emp_id + ' .'};
            }
        } else {
            response = { "error": "The employee id is missing." };
        }
        return response;
    }

}

module.exports = new Employees();