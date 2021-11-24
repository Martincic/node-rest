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

    getSingle(company, dept_id){
        let response;
        //todo: provjera za dept_id
        if (company){
            let result = dataLayer.getDepartment(company, dept_id);
            
            if(!result == null && result.length > 0) {
                response = result;
            }else {
                response = {"error": "No department found for dept_id: " + dept_id + ', company: ' + company + ' .'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }

    insert(company, dept_name, dept_no, location){
        let response;

    }

    update(department){

    }

    delete(company, dept_id){

    }
}

module.exports = new Departments();

