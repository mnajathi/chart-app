'use client'

import React from 'react'

import useDateStore from '@/store';
import InputField from '../fields/InputField';

interface DateRangeFilterProps {
    [key: string]: any;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ }) => {
    const { fromValue, toValue } = useDateStore();

    const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        useDateStore.setState({ fromValue: event.target.value });
    };

    const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        useDateStore.setState({ toValue: event.target.value });
    };

    return (
        <div className="flex space-x-2">
            <InputField
                type="date"
                placeholder="From"
                value={fromValue}
                onChange={handleFromChange}
            />
            <InputField
                type="date"
                placeholder="To"
                value={toValue}
                onChange={handleToChange}
            />
        </div>
    );
}

export default DateRangeFilter;