import {twMerge} from 'tailwind-merge';

type GridProps = {
	children?: React.ReactNode;
	className?: string;
};

const Grid: React.FC<GridProps> = ({children, className}) => {
	const classes = twMerge(
		`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full ${
			className ?? ''
		}`,
	);
	return <div className={classes}>{children}</div>;
};

export default Grid;
