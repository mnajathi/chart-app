import React from 'react';

interface ButtonProps {
	text: string;
	onClick: () => void;
	[key: string]: any;
}

const Button: React.FC<ButtonProps> = ({onClick, text}) => {
	return (
		<button
			className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
