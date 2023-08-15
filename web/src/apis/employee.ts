import type Employee from '@/shared/types/employee';
import axios from '../apis';

export async function list(
	fromDate: string,
	toDate: string,
): Promise<Employee[]> {
	try {
		const response = await axios.get('employees', {
			params: {from: fromDate, to: toDate},
		});
		return response.data as Employee[];
	} catch (error) {
		throw new Error('Error fetching data');
	}
}
