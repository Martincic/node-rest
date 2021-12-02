const dataLayer = require('companydata');
const validator = require('./validator');
const { Employee } = require('companydata');

class Employees {
    get(company){
        let response;
        validator.clearValidator();
        
        if (!company){
            response = { "error": "Enter missing company name." };
        }else {
            let emp = dataLayer.getAllEmployee(company);
            validator.isEmpty(emp, "company: " + company);
            
            if(validator.hasFailed()) 
                response = {"errors": validator.getErrors()};
            else
                response = { success: emp } ;
        }
                        
        return response;
    }

    getSingle(emp_id){
        let response;
        validator.clearValidator();

        if (!emp_id){
            response = { "error": "Enter missing employee id." };
        }else {
            validator.employeeExists(emp_id);
            if(validator.hasFailed()) response = { error: validator.getErrors() }
            else response = { success: dataLayer.getEmployee(emp_id) } ;
        }
        return response;
    }

    insert(company, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id){
        let response;
        validator.clearValidator();

        validator.departmentExists(company, dept_id);
        if(mng_id != 0) validator.employeeExists(mng_id);
        validator.validateHireDate(hire_date);
        
        if(validator.hasFailed()) response = { error: validator.getErrors() };
        else {
            let emp = new Employee(emp_name, emp_no, hire_date, job, salary, dept_id, mng_id);
            response = { success: dataLayer.insertEmployee(emp) };
        };

        return response;
    }

    update(employee, company){
        let response;
        validator.clearValidator();

        validator.validateUniqueEmployeeID(employee.emp_id, 0);
        validator.employeeExists(employee.emp_id);
        validator.departmentExists(company, employee.dept_id);
        validator.validateHireDate(employee.hire_date);
        if(employee.mng_id != 0) validator.employeeExists(employee.mng_id);


        if(validator.hasFailed()) response = { errors: validator.getErrors() };
        else response = { success: dataLayer.updateEmployee(employee) };

        return response;
    }

    delete(emp_id) {
        let response;
        validator.clearValidator();

        if (!emp_id){
            response = { "error": "Enter missing employee id." };

        }else {
            validator.employeeExists(emp_id);

            if(validator.hasFailed()) 
                response = { errors: validator.getErrors() };
            else{
                dataLayer.deleteEmployee(emp_id);
                response = {success: "Employee " + emp_id + " deleted." };
            }
        }
        return response;
    }
}

module.exports = new Employees();