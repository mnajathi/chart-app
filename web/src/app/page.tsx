'use client';

import {useQuery} from '@tanstack/react-query';

import Container from '@/components/container';
import Box from '@/components/container/Box';
import {list} from '@/apis/employee';
import useDateStore from '@/store';
import type Employee from '@/shared/types/employee';

export default function Home() {
	const {fromValue, toValue} = useDateStore();

	const {
		data: employeesData,
		isLoading,
		isError,
		error,
		isFetched,
	} = useQuery<Employee[]>({
		queryKey: ['employee', fromValue, toValue],
		queryFn: async () => list(fromValue, toValue),
	});

	return (
		<Container>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isFetched &&
				employeesData && (
					<Box>
						<ul>
							{employeesData.map((employee: Employee) => (
								<li key={employee.id}>{employee.fullname}</li>
							))}
						</ul>
					</Box>
				)
			)}
		</Container>
	);
}
