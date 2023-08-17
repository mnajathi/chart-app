// Import {render, screen} from '@testing-library/react';
// import {rest} from 'msw';
// import {setupServer} from 'msw/node';
// import ProfileCard from '@/components/profileCard';
// import axiosInstance from '@/apis'; // Import your custom Axios instance
// import {type AxiosInstance} from 'axios'; // Import AxiosInstance type

// // Create an instance of Axios Mock Adapter
// const mockAxios = new MockAdapter(axiosInstance);

// // Define the type for the mocked employee data
// type MockEmployeeData = {
// 	activate_workshift: number;
// 	department_id: number;
// 	domain_id: number;
// 	// ... other properties ...
// };

// const mockEmployeeData: MockEmployeeData = {
// 	// ... mock data ...
// };

// const server = setupServer(
// 	// Define a request handler for the API endpoint
// 	rest.get('/api/employee', async (req, res, ctx) =>
// 		// Return mock employee data
// 		res(ctx.json(mockEmployeeData)),
// 	),
// );

// beforeAll(() => {
// 	server.listen();
// });
// afterEach(() => {
// 	server.resetHandlers();
// 	mockAxios.reset();
// });
// afterAll(() => {
// 	server.close();
// });

// test('ProfileCard renders correctly with mocked data', async () => {
// 	// Mock Axios response
// 	mockAxios.onGet('/api/employee').reply(200, mockEmployeeData);

// 	render(
// 		<ProfileCard empData={mockEmployeeData} axiosInstance={axiosInstance} />,
// 	);

// 	// Wait for the component to load and render
// 	const fullNameElement = await screen.findByText('Dason Test');
// 	const emailElement = screen.getByText('dason@prodmite.com');

// 	// Assertions
// 	expect(fullNameElement).toBeInTheDocument();
// 	expect(emailElement).toBeInTheDocument();
// });
