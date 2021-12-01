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

    //TODO: TEST
    insert(emp_name, emp_no, hire_date, job, salary, dept_id, mng_id){
        let response;
        //todo: provjera za emp_id
        if (emp_name){
            let emp = new dataLayer.Employee(emp_name, emp_no, hire_date, job, salary, dept_id, mng_id);
            let result = dataLayer.insertEmployee(emp);

            if(result != null) {
                response = result;
            }else {
                response = {"error": "Can't add employee: " +  emp_name + ', emp_no:' + emp_no + ' hire date: ' + hire_date + ', job:' + job + ' salary: ' + salary + ' dept_id: ' + dept_id + ' mng_id: ' + mng_id + ' .'};
            }
        } else {
            response = { "error": "The employee name is missing." };
        }
        return response;
    }

    update(employee){
        if(dataLayer.updateEmployee(employee) == null) return false;
        else return true;
    }

    delete(emp_id) {
        if(dataLayer.deleteEmployee(emp_id) == 0) return false;
        else return true;
    }
}

module.exports = new Employees();