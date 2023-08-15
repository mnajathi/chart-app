import {twMerge} from 'tailwind-merge';

type ContainerProps = {
	[key: string]: any;
	children: React.ReactNode;
	className?: string;
};

const Container: React.FC<ContainerProps> = ({children, className}) => {
	const classes = twMerge(
		`container mx-auto py-6 px-4 w-full ${className ?? ''}`,
	);

	return <main className={classes}>{children}</main>;
};

export default Container;
