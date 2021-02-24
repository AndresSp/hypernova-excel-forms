'use strict';

import {
    Box,
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Typography} from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';

import React from 'react';
import useStyles from '../../styles';

const AddDialog = ({ open, onClose }) => {
    const classes = useStyles();
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
            <Box mt={2}>
                {/* <DatePicker
                inputVariant='outlined'
                size='small'
                input
                fullWidth
                className={classes.textfield}
                label='Fecha'
                format='dd/MM/yyyy'
                value={selectedDate}
                onChange={handleDateChange}
                /> */}
            </Box>
            <Box mt={2}>
                <Typography>Jornada Regular</Typography>
                <div className={classes.row}>
                    <TimePicker 
                    inputVariant='outlined'
                    size='small'
                    className={classes.textfieldGrow} 
                    label='Hora Inicial'/>

                    <TimePicker 
                    inputVariant='outlined'
                    size='small'
                    className={classes.textfieldGrow} 
                    label='Hora Final'/>
                </div>
            </Box>
            <Box mt={2}>
                <Typography color='textSecondary'>Jornada Extraordinaria</Typography>
                <div className={classes.row}>
                    <TimePicker 
                    inputVariant='outlined'
                    size='small'
                    className={classes.textfieldGrow} 
                    label='Hora Inicial'/>
                    
                    <TimePicker 
                    inputVariant='outlined'
                    size='small'
                    className={classes.textfieldGrow} 
                    label='Hora Final'/>
                </div>
            </Box>
            <Box mt={2}>
                <div className={classes.row}>
                    <TextField
                        label='Justificativos' 
                        variant='outlined' 
                        size='small'
                        multiline
                        rows={4}
                        className={classes.textfieldGrow} />
                </div>
            </Box>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
            <Button color='secondary' variant='outlined' onClick={onClose}>
                Cancelar
            </Button>
            <Button color='secondary' variant='contained' onClick={onClose} autoFocus>
                Agregar
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default AddDialog