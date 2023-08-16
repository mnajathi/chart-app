'use client';

import {useQuery} from '@tanstack/react-query';

import {findById} from '@/apis/employee';
import Container from '@/components/container';
import ProfileCard from '@/components/profileCard';
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

	return (
		<Container>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isFetched && empData && <ProfileCard empData={empData} />
			)}
		</Container>
	);
};

export default Page;
