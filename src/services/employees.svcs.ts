import * as employeeRepository from '../repositories/employeeRepository.js';

export async function checksExistsEmployee(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId);
    if(!employee)
            throw {type: "not_found", message: 'Employee not found'};
    return employee;
}