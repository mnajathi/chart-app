import axios from '../apis';
import {type Employee} from '@/shared/types/employee';

export async function list(): Promise<Employee> {
	try {
		const response = await axios.get('me');
		return response.data as Employee;
	} catch (error) {
		throw new Error('Error fetching data');
	}
}
