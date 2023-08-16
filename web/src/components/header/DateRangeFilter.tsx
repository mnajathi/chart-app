'use client';

import InputField from '../fields/InputField';
import useAppStore from '@/store';

type DateRangeFilterProps = Record<string, any>;

const DateRangeFilter: React.FC<DateRangeFilterProps> = () => {
	const {fromValue, toValue} = useAppStore();

	const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		useAppStore.setState({fromValue: event.target.value});
	};

	const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		useAppStore.setState({toValue: event.target.value});
	};

	return (
		<div className="flex space-x-2">
			<InputField
				type="date"
				placeholder="From"
				value={fromValue}
				onChange={handleFromChange}
				className="rounded-lg text-sm"
			/>
			<InputField
				type="date"
				placeholder="To"
				value={toValue}
				onChange={handleToChange}
				className="rounded-lg text-sm"
			/>
		</div>
	);
};

export default DateRangeFilter;
