import "dotenv-safe/config";
import express, { Express, Response } from 'express'

import cors from 'cors'
import dotenv from 'dotenv-safe';

import { __port__ } from "./constants";

import employeeRoutes from "./routes/employees";
import meRoutes from "./routes/me";

dotenv.config();

const app: Express = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/employee', employeeRoutes);
app.use('/api/me', meRoutes);
app.get('/', (_, res: Response) => {
	res.send('Prodoscore API By Najathi');
});

app.listen(__port__, () => {
    console.log(`🚀 Server ready and listening at ==> http://localhost:${__port__}`);
});
