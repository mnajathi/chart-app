import axios, {type AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default instance;
