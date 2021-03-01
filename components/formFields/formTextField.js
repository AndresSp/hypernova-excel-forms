import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormTextField = ({ 
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
        <TextField 
            label={label} 
            variant='outlined'
            size='medium'
            error={hasError}
            helperText={errText}
            className={className}
            {...rest} />
        }
    rules={rules}
    control={control}
    name={name}
    defaultValue={defaultValue}
    />
    )
}
export default FormTextField