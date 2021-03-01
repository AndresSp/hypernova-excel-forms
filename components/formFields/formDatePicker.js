
import { DatePicker } from '@material-ui/pickers';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormDatePicker = ({ 
    name, 
    label, 
    defaultValue = '', 
    className,
    rules,
    error,
    helperText,
    ...rest }) => {
        
    const { errors, control } = useFormContext();
    
    const hasError = error || !!errors?.[name];
    const errText = helperText || errors?.[name]?.message;

    return (
        <Controller
        as={
            <DatePicker
            inputVariant='outlined'
            size='medium'
            input
            className={className}
            label={label}
            error={hasError}
            helperText={errText}
            {...rest}
            />
        }
        rules={rules}
        control={control}
        name={name}
        defaultValue={defaultValue}
        />
    )
}

export default FormDatePicker