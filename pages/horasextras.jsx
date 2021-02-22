'use strict';

import { Box, Container, makeStyles, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { DateRangeDelimiter, DateRangePicker, DatePicker } from '@material-ui/pickers';
import Head from 'next/head';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 120,
        [theme.breakpoints.down('sm')]: {
            width: 100
        }
    },
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    row: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(1)
    },
    textfieldGrow: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        flexGrow: 1
    }
  }));


export default function ExtraHours() {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Head>
                <title>Pago de Horas Extraordinarias - Hypernovalabs</title>
            </Head>
            <Container maxWidth='md'>
                <Box 
                display='flex'
                flexDirection='column'
                alignItems='center' 
                borderRadius={10} 
                boxShadow={3}
                padding={5}>
                    <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width='100%'>
                        <img  src='/img/logo.png' className={classes.logo}/>
                        <Typography 
                        variant={sm? 'h5': 'h4'}
                        color='primary'>
                            Formulario para Pago de Horas Extraordinarias
                        </Typography>
                    </Box>

                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    width='100%'
                    component='form'
                    noValidate
                    autoComplete='off'
                    my={2}
                    pl={3}
                    pr={3}>
                        {/* <div> */}
                            <TextField 
                            label='Nombres y Apellidos' 
                            variant='outlined'
                            size='small'
                            fullWidth 
                            className={classes.textfield} />
                        {/* </div> */}
                        <div className={classes.row}>

                            <TextField 
                            label='Cargo' 
                            variant='outlined' 
                            size='small' 
                            className={classes.textfieldGrow} />

                            <TextField 
                            label='Departamento' 
                            variant='outlined' 
                            size='small' 
                            className={classes.textfieldGrow} />
                        </div>
                        <div className={classes.row}>
                            <DatePicker
                            openTo='month'
                            views={['year', 'month']}
                            inputVariant='outlined'
                            size='small'
                            input
                            InputAdornmentProps={{ position: 'end' }}
                            fullWidth
                            className={classes.textfield}
                            label='Período'
                            value={selectedDate}
                            onChange={handleDateChange}
                            />
                        </div>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

