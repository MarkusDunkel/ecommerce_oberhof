import React from 'react';
import './styles.scss';

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
    label?: string;
    handleChange?: (e: any) => void;
}

const FormInput = ({ handleChange, label, ...otherProps }: FormInputProps) => {
    return (
        <div className='formRow'>
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className='formInput' onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default FormInput;