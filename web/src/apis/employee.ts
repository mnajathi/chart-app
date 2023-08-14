import axios from '../apis';

export async function list(fromDate: string, toDate: string) {
    try {
        const response = await axios.get('employees', {
            params: { from: fromDate, to: toDate }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
}
