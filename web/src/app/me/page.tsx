'use client';

import {useQuery} from '@tanstack/react-query';

import Container from '@/components/container';
import Box from '@/components/container/Box';
import type Employee from '@/shared/types/employee';
import {list} from '@/apis/me';

export default function Me() {
	const {
		data: meData,
		isLoading,
		isError,
		error,
		isFetched,
	} = useQuery<Employee>({
		queryKey: ['me'],
		queryFn: async () => list(),
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
				meData && (
					<Box>
						<div className="bg-white p-8 rounded shadow w-full max-w-md">
							<div className="text-center">
								<div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-blue-500 text-white text-2xl mb-4">
									{getInitials(meData?.fullname)}
								</div>
								<h1 className="text-xl font-semibold mb-2">{meData?.fullname}</h1>
								<p className="text-gray-500">{meData?.email}</p>
							</div>
							<div className="mt-4">
								<p className="text-gray-600">Department: {meData?.department_id}</p>
								<p className="text-gray-600">Role: {meData?.role}</p>
							</div>
						</div>
					</Box>
				)
			)}
		</Container>
	);
}
