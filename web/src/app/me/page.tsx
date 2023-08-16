'use client';

import {useQuery} from '@tanstack/react-query';

import {list} from '@/apis/me';
import Container from '@/components/container';
import ProfileCard from '@/components/profileCard';
import {type Employee} from '@/shared/types/employee';

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

	const getColorClass = (score: number) => {
		if (score > 75) {
			return 'text-blue-500';
		}

		if (score >= 40) {
			return 'text-black';
		}

		return 'text-red-500';
	};

	return (
		<Container>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isFetched && meData && <ProfileCard empData={meData} />
			)}
		</Container>
	);
}
