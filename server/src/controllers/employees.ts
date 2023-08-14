import { Request, Response } from 'express';

import Employee from 'src/interfaces/Employees';
import employeesData from '../assets/datasource/employees.json';

const getEmployees = async (req: Request, res: Response) => {
    const { from, to } = req.query;

    let employeesArray: Employee[] = Object.values(employeesData);

    if (from && to) {
        const fromDate = new Date(from as string);
        const toDate = new Date(to as string);
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
            // employeesArray = employeesArray.filter((employee: Employee) => {
            //     const employeeDate = new Date(employee?.join_date); // Replace 'join_date' with the actual property
            //     return employeeDate >= fromDate && employeeDate <= toDate;
            // });
        }
    }

    res.json(employeesArray);
};

export default { getEmployees };