import {twMerge} from 'tailwind-merge';

type InputFieldProps = {
	[key: string]: any;
	type: HTMLInputElement['type'];
	className?: string;
};

const InputField: React.FC<InputFieldProps> = ({type, className, ...rest}) => {
	const classes = twMerge(`border py-1 px-2 rounded ${className ?? ''}`);

	return <input {...rest} type={type} className={classes} />;
};

export default InputField;
