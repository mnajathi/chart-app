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

    if (isLoading) {
        <>Loging</>
    }

    if (isError) {
        <>error</>
    }

    return (
        <div className="relative">
            <button
                className="text-dark hover:text-gray-600"
                onClick={toggleProfileDropdown}
            >
                Profile
            </button>
            {isProfileOpen && isFetched && (
                <div className="absolute right-0 mt-1 bg-white rounded shadow w-52">
                    <div className="px-4 py-3">
                        <div className="text-gray-600">{meData?.fullname}</div>
                        <div className="text-gray-400 text-xs">{meData?.email}</div>
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