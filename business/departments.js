const dataLayer = require('companydata');
const validator = require('./validator');

class Departments {
    get(company){
        let response;
        if (company){
            let result = dataLayer.getAllDepartment(company);
            if(result != null && result.length > 0) {
                response = result;
            }else {
                response = {"error": "No departments found for " + company + '.'};
            }
        } else {
            response = { "error": "The company name is missing." };
        }
        return response;
    }

    getSingle(company, dept_id){
        let response;
        validator.clearValidator();
        // validator.isInput(company,"Enter company name.");
        // validator.isInput(dept_id,"Enter department id.");

        // if(validator.hasFailed())
        // response = {"errors": validator.getErrors()};
        // else {

        if (!company){
            response = { "error": "Enter missing company name." };

        }else if(!dept_id){
            response = { "error": "Enter missing department id." };
        }else {
            let dept = validator.departmentExists(company, dept_id);

            if(validator.hasFailed())
                response = {"errors": validator.getErrors()};
            else
                response = dept;
        }

        return response;
    }

    insert(company, dept_name, dept_no, location){
        let response;
        //todo: provjera za dept_id
        if (company){
            let dept = new dataLayer.Department(company,dept_name, dept_no, location);
            let result = dataLayer.insertDepartment(dept);

            if(result != null) {
                response = result;
            }else {
                response = {"error": "Can't add department: " +  dept_name + ', dept_no:' + dept_no + ' company: ' + company + ', location:' + location + ' .'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }

    update(department){
        return dataLayer.updateDepartment(department);
    }

    delete(company, dept_id){
        console.log(company, dept_id);
        let response = dataLayer.deleteDepartment(company, dept_id);

        if (response == 0) return false;
        
        return true;
    }
}

module.exports = new Departments();

