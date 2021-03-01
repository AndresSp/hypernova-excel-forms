'use strict';

import {
    Box,
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Typography} from '@material-ui/core';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useStyles from '../../styles';
import FormDatePicker from '../formFields/formDatePicker';
import FormTextField from '../formFields/formTextField';
import FormTimePicker from '../formFields/formTimePicker';


const AddDialog = ({ open, onClose, onSubmit, onEdit, edit = false }) => {
    const classes = useStyles();
    
    const { handleSubmit, control, errors, reset } = useForm();

    useEffect(() => {
        console.log(edit)
        if (!!edit) {
            reset(edit.data)
        }
    }, [edit]);

    const onInnerSubmit = data => {
        onSubmit(data)
    };

    const onEditSubmit = data => {
        onEdit(data, edit.index)
    };

    const onError = error => {
        console.log(error)
    }
    
    return (
    <Dialog
    open={open}
    onClose={onClose}
    maxWidth='sm'
    fullWidth
    aria-labelledby='add-dialog-title'
    aria-describedby='add-dialog-description'>
        <DialogTitle id='add-dialog-title'
        className={classes.dialogTitle}>
            Nuevo día extraordinario
        </DialogTitle>
        <DialogContent>
            <FormProvider { ...{ control, errors } }>
                <form 
                noValidate 
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit, onError)}>
                    <Box mt={2}>
                        <FormDatePicker
                        name='overtimeDate'
                        label='Período'
                        rules={{ required: true }}
                        openTo='month'
                        views={['year', 'month']}
                        defaultValue={new Date()}
                        fullWidth
                        />
                    </Box>
                    <Box mt={2}>
                        <Typography className={classes.label}>Jornada Regular</Typography>
                        <div className={classes.row}>
                            <FormTimePicker
                            name='workdayStart'
                            label='Hora Inicial'
                            rules={{ required: true }}
                            className={classes.textfieldGrow}
                            defaultValue={new Date()}
                            />
                            <FormTimePicker
                            name='workdayEnd'
                            label='Hora Final'
                            rules={{ required: true }}
                            className={classes.textfieldGrow}
                            defaultValue={new Date()}
                            />
                        </div>
                    </Box>
                    <Box mt={2}>
                        <Typography className={classes.label} >Jornada Extraordinaria</Typography>
                        <div className={classes.row}>
                            <FormTimePicker
                            name='overtimeStartTime'
                            label='Hora Inicial'
                            rules={{ required: true }}
                            className={classes.textfieldGrow}
                            defaultValue={new Date()}
                            />
                            <FormTimePicker
                            name='overtimeEndTime'
                            label='Hora FInal'
                            rules={{ required: true }}
                            className={classes.textfieldGrow}
                            defaultValue={new Date()}
                            />
                        </div>
                    </Box>
                    <Box mt={2}>
                        <FormTextField
                        name='details'
                        label='Justificativos'
                        rules={{ required: true }}
                        className={classes.textfieldGrow}
                        fullWidth
                        multiline
                        rows={4}/>
                    </Box>
                </form>
            </FormProvider>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
            <Button variant='outlined' onClick={onClose}>
                Cancelar
            </Button>
            {
                !!edit ? (
                    <Button type='submit' color='secondary' variant='contained' onClick={handleSubmit(onEditSubmit, onError)} autoFocus>
                        Editar
                    </Button>
                ) : (
                    <Button type='submit' color='secondary' variant='contained' onClick={handleSubmit(onInnerSubmit, onError)} autoFocus>
                        Agregar
                    </Button>
                )
            }
        </DialogActions>
    </Dialog>
    )
}

export default AddDialog