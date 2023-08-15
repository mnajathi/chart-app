import {twMerge} from 'tailwind-merge';

type BoxProps = {
	[key: string]: any;
	children: React.ReactNode;
	className?: string;
};

const Box: React.FC<BoxProps> = ({children, className}) => {
	const classes = twMerge(
		`flex items-center justify-between ${className ?? ''}`,
	);

	return <div className={classes}>{children}</div>;
};

export default Box;
