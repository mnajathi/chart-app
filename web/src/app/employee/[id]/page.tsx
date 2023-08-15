'use client';

import {useQuery} from '@tanstack/react-query';

import {findById} from '@/apis/employee';
import DoughnutChart from '@/components/charts/DoughnutChart';
import Container from '@/components/container';
import Box from '@/components/container/Box';
import {type Employee} from '@/shared/types/employee';

type Params = {
	id: number;
};

type PageProps = {
	params: Params;
};

const Page: React.FC<PageProps> = ({params}) => {
	const {
		data: empData,
		isLoading,
		isError,
		error,
		isFetched,
	} = useQuery<Employee>({
		queryKey: ['employee', params.id],
		queryFn: async () => findById(params.id),
	});

	const getInitials = (name: string) => {
		const names = name.split(' ');
		return names.map((n: string) => n[0]).join('');
	};

	return (
		<Container>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isFetched &&
				empData && (
					<Box>
						<div className="bg-white py-8 rounded shadow w-full flex">
							<div className="flex flex-row justify-between w-full">
								<div>
									<div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-blue-500 text-white text-2xl mb-4">
										{getInitials(empData?.fullname)}
									</div>
									<div className="text-center pl-4">
										<h1 className="text-xl font-semibold mb-2">{empData?.fullname}</h1>
										<p className="text-gray-500">{empData?.email}</p>
									</div>
								</div>
								<div className="my-4">
									<p className="text-gray-600">Email: {empData?.email}</p>
									<p className="text-gray-600">Status: {empData?.status}</p>
									<p className="text-gray-600">
										Active Work Shift: {empData?.activate_workshift}
									</p>

									{empData?.manager_details && (
										<>
											<p className="text-gray-900 mt-2 font-semibold">Manager Details:</p>
											<p className="text-gray-600">
												- Role: {empData?.manager_details?.fullname}
											</p>
											<p className="text-gray-600">
												- Email: {empData?.manager_details?.email}
											</p>
										</>
									)}
								</div>
								<div>
									<p className="text-md font-semibold mb-2">
										Prodoscore: {empData.scr.l}
									</p>
									<DoughnutChart score={empData.scr.l} />
								</div>
							</div>
						</div>
					</Box>
				)
			)}
		</Container>
	);
};

export default Page;
