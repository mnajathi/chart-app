'use client'

import React, { useState } from 'react'

import InputField from '../fields/InputField';

interface DateRangeFilterProps {
    [key: string]: any;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ }) => {
    const [fromValue, setFromValue] = useState(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );
    const [toValue, setToValue] = useState(new Date().toISOString().split('T')[0]);

    const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setFromValue(event.target.value);
    };

    const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setToValue(event.target.value);
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