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

const findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id === null || id === undefined || isNaN(+id)) {
        res.status(404).json({ message: 'Id params is not valid' });
    }

    const employee: Employee | undefined = Object.values(employeesData).find((emp) => emp.id === +id);
    if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
};

const categorizedScores = async (_: Request, res: Response) => {
    const employees: Employee[] = Object.values(employeesData);
    const aboveAverageEmployees = employees.filter((emp: Employee) => emp.scr.l >= 75);
    const averageEmployees = employees.filter((emp: Employee) => emp.scr.l >= 40 && emp.scr.l < 75);
    const belowAverageEmployees = employees.filter((emp: Employee) => emp.scr.l < 40);

    const categorizedEmployees = {
        aboveAverage: aboveAverageEmployees,
        average: averageEmployees,
        belowAverage: belowAverageEmployees,
    };

    res.json(categorizedEmployees);
};

export default { getEmployees, findById, categorizedScores };