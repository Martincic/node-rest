const dataLayer = require('companydata');

class Departments {
    get(company){
        let response;
        if (company){
            let result = dataLayer.getAllDepartment(company);
            if(result.length > 0) {
                response = result;
            }else {
                response = {"error": "No departments found for " + company + '.'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }

    get(company, dept_id){
        let response;
        //todo: provjera za dept_id
        if (company){
            let result = dataLayer.getDepartment(company, dept_id);
            if(result.length > 0) {
                response = result;
            }else {
                response = {"error": "No department found for dept_id: " + dept_id + ', company: ' + company + ' .'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }
}

module.exports = new Departments();

