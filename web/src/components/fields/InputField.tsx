import React from 'react'

interface InputFieldProps {
    [key: string]: any;
    type: HTMLInputElement['type'];
}

const InputField: React.FC<InputFieldProps> = ({ type, ...rest }) => {
    return (
        <input
            {...rest}
            type={type}
            className="border py-1 px-2 rounded"
        />
    );
}

export default InputField;