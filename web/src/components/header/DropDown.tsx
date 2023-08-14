'use client';

import React, { useState } from 'react'
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { list } from '@/apis/me';
import Employee from '@/shared/types/employee';


interface DropDownProps {
    [key: string]: any;
}

const DropDown: React.FC<DropDownProps> = ({ }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const { data: meData, isLoading, isError, error, isFetched } = useQuery<Employee>({
        queryKey: ['me'],
        queryFn: () => list()
    });

    const getInitials = (name: any) => {
        const names = name.split(' ');
        return names.map((n: string) => n[0]).join('');
    };

    return (
        <div className="relative">
            <button
                className="text-dark hover:text-gray-600"
                onClick={toggleProfileDropdown}
            >
                Profile
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError && error ? (
                <p>Error occurred while fetching data.</p>
            ) : isProfileOpen && isFetched && (
                <div className="absolute right-0 mt-1 bg-white rounded shadow w-52">
                    <div className="text-center px-4 py-3">
                        <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-blue-500 text-white text-2xl mb-4">
                            {getInitials(meData?.fullname)}
                        </div>
                        <h1 className="text-lg font-semibold mb-1">{meData?.fullname}</h1>
                        <p className="text-gray-500 text-sm">{meData?.email}</p>
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
                            href="#"
                            className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                        >
                            Settings
                        </Link>
                        <Link
                            href="#"
                            className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                        >
                            Sign out
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;