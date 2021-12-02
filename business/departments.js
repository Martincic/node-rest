const dataLayer = require('companydata');
const validator = require('./validator');
const { Department } = require('companydata');

class Departments {


    get(company){
        let response;
        validator.clearValidator();
        
        if (!company){
            response = { "error": "Enter missing company name." };
        }else {
            let dept = dataLayer.getAllDepartment(company);
            validator.isEmpty(dept, "company: " + company);
            
            if(validator.hasFailed()) 
                response = {"errors": validator.getErrors()};
            else
                response = dept;
        }
                        
        return response;
    }

    getSingle(company, dept_id){
        let response;
        validator.clearValidator();

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
        validator.clearValidator();

        if (!company){
            response = { "error": "Enter missing company name." };

        }else if(!dept_name){
            response = { "error": "Enter missing department name." };
            
        }else if(!dept_no){
            response = { "error": "Enter missing department number." };

        }else if(!location){
            response = { "error": "Enter missing location." };

        }else {
            validator.validateUniqueDeptNo(company, dept_no, "0");
            if(validator.hasFailed()) 
                response = {"errors": validator.getErrors()};
            else{
                let dept = new Department(company,dept_name, dept_no, location);
                let result = dataLayer.insertDepartment(dept);
                console.log(result);
                response = result;

            }
        }
        return response;     
    }

    update(department){
        let response;
        validator.clearValidator();

        validator.validateUniqueDeptNo(department.company, department.dept_no, department.dept_no);
        validator.departmentExists(department.company, department.dept_id);

        if(validator.hasFailed()) response = { errors: validator.getErrors() };
        else response = { data: dataLayer.updateDepartment(department) };

        return response;
    }

    delete(company, dept_id){
        let response;
        validator.clearValidator();

        if (!company){
            response = { "error": "Enter missing company name." };

        }else if(!dept_id){
            response = { "error": "Enter missing department id." };
        }else {
            validator.departmentExists(company, dept_id);

            console.log(validator.hasFailed());
            if(validator.hasFailed()) 
                response = { errors: validator.getErrors() };
            else{
                dataLayer.deleteDepartment(company, dept_id);
                response = {success: "Department " + dept_id + " from " + company + " deleted." };
            }
        }
        return response;
    }
}

module.exports = new Departments();

