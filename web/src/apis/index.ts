import axios, {type AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
	// eslint-disable-next-line @typescript-eslint/naming-convention
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default instance;
