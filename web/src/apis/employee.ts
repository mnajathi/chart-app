import axios from '../apis';
import {type CategorizedScore, type Employee} from '@/shared/types/employee';

export async function list(
	fromDate: string,
	toDate: string,
): Promise<Employee[]> {
	try {
		const response = await axios.get('employee', {
			params: {from: fromDate, to: toDate},
		});
		return response.data as Employee[];
	} catch (error) {
		throw new Error('Error fetching data');
	}
}

export async function findById(id: number): Promise<Employee> {
	try {
		const response = await axios.get(`employee/${id}`);
		return response.data as Employee;
	} catch (error) {
		throw new Error('Error fetching employee data');
	}
}

export async function categorizedScores(): Promise<CategorizedScore> {
	try {
		const response = await axios.get('employee/categorized/scores');
		return response.data as CategorizedScore;
	} catch (error) {
		throw new Error('Error fetching employee data');
	}
}
