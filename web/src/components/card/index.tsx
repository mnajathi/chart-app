import {twMerge} from 'tailwind-merge';

type CardProps = {
	title: string;
	children?: React.ReactNode;
	className?: string;
};

const Card: React.FC<CardProps> = ({title, children, className}) => {
	const classes = twMerge(
		`bg-white shadow-lg rounded-lg p-4 ${className ?? ''}`,
	);

	return (
		<div className={classes}>
			<h3 role="contentinfo" className="text-md font-semibold mb-4">
				{title}
			</h3>
			{children}
		</div>
	);
};

export default Card;
