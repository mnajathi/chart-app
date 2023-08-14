import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

import Employee from 'src/interfaces/Employees';

const getMe = async (_: Request, res: Response) => {
    const meFilePath = path.join(__dirname, '../assets/datasource/me.json');
    const meData: Employee = JSON.parse(fs.readFileSync(meFilePath, 'utf-8'));
    res.json(meData);
};

export default { getMe };