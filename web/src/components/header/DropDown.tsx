'use client';

import React, {useState} from 'react';
import Link from 'next/link';

import {useQuery} from '@tanstack/react-query';
import {list} from '@/apis/me';
import {type Employee} from '@/shared/types/employee';

type DropDownProps = Record<string, any>;

const DropDown: React.FC<DropDownProps> = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const toggleProfileDropdown = () => {
		setIsProfileOpen((prev) => !prev);
	};

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
		<div className="relative">
			<button
				className="text-dark hover:text-gray-600"
				onClick={toggleProfileDropdown}
			>
				{isFetched && meData && (
					<div className="flex items-center justify-center mx-auto w-8 h-8 rounded-full bg-blue-500 text-white text-sm">
						{getInitials(meData?.fullname)}
					</div>
				)}
			</button>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isProfileOpen &&
				isFetched && (
					<div className="absolute right-0 mt-1 bg-white rounded shadow w-64 z-50">
						<div className="flex flex-column items-center px-4 py-3">
							<div className="pr-4">
								{meData?.fullname && (
									<div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-blue-500 text-white text-2xl mb-2">
										{getInitials(meData?.fullname)}
									</div>
								)}
							</div>
							<div className="align-baseline">
								<h1 className="text-md font-semibold pb-1 break-all">
									{meData?.fullname}
								</h1>
								<p className="text-gray-500 text-xs break-all">{meData?.email}</p>
							</div>
						</div>
						<div className="border-t border-gray-100">
							<Link
								href="/me"
								className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
								onClick={toggleProfileDropdown}
							>
								Profile
							</Link>
							<Link
								href="/employee"
								className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
								onClick={toggleProfileDropdown}
							>
								Employee Single
							</Link>
							<Link
								href="/plotly"
								className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
								onClick={toggleProfileDropdown}
							>
								Plotly.JS
							</Link>
							<Link
								href="#"
								className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
							>
								Sign out
							</Link>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default DropDown;
