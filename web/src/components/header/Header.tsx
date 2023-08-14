'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DateRangeFilter from "./DateRangeFilter";

interface HeaderProps {
    [key: string]: any;
}

const Header: React.FC<HeaderProps> = ({ }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileOpen((prev) => !prev);
    };

    return (
        <header className="bg-gray-100 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="text-dark text-lg font-semibold"
                    >
                        <Image
                            src="https://qa02.prv-prodoscore.com/static/img/prodoscore.png"
                            alt="Your Logo"
                            width={30}
                            height={30}
                        />
                    </Link>

                    <DateRangeFilter />
                </div>
                <div className="relative">
                    <button
                        className="text-dark hover:text-gray-600"
                        onClick={toggleProfileDropdown}
                    >
                        Profile
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-1 bg-white rounded shadow w-52">
                            <div className="px-4 py-3">
                                <div className="text-gray-600">Your Name</div>
                                <div className="text-gray-400 text-xs">youremail@example.com</div>
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
            </div>
        </header>
    );
}

export default Header;