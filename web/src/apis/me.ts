import axios from '../apis';

export async function list() {
    try {
        const response = await axios.get('me');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
}