'use strict';

import { Box, Button, Container, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { DateRangeDelimiter, DateRangePicker, DatePicker } from '@material-ui/pickers';
import Head from 'next/head';
import React, { useState } from 'react';
import { 
    Help as HelpIcon, 
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon } from '@material-ui/icons';

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
    },
    tableToolbar: {
        backgroundColor: theme.palette.secondary.main,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    tableTitle: {
        flex: '1 1 100%',
        color: theme.palette.primary.contrastText
    },
    tableAddButton: {
        color: 'white',
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0)
        }
    },
    tableActions: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center'
    }
  }));


export default function ExtraHours() {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    //#region datepickers
    const [selectedDate, handleDateChange] = useState(new Date());
    //#endregion datepickers

    //#region Tooltip
    const [open, setOpen] = useState(false);

    const handleTooltipClick = () => {
        setOpen(!open);
    };
    const handleTooltipMouseEnter = () => {
        setOpen(true);
    };
    const handleTooltipMouseLeave = () => {
        setOpen(false);
    };
    //#endregion Tooltip

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

    return (
        <>
            <Head>
                <title>Pago de Horas Extraordinarias - Hypernovalabs</title>
            </Head>
            <Container maxWidth='md' disableGutters>
                <Box 
                display='flex'
                flexDirection='column'
                alignItems='center' 
                borderRadius={10} 
                boxShadow={3}
                padding={sm ? 2 : 5}>
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
                    px={ sm ? 0 : 3 }>
                        <TextField 
                        label='Nombres y Apellidos' 
                        variant='outlined'
                        size='small'
                        fullWidth 
                        className={classes.textfield} />

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
                    <Box my={2} px={ sm ? 0 : 3 } width='100%'>
                        <Paper>
                            <Toolbar component='div' className={classes.tableToolbar}>
                                <Typography className={classes.tableTitle} variant='h6' id='tableTitle' component='div'>
                                    Jornada Extraordinaria
                                    <Tooltip 
                                    title='Días en los cuales se realizó la jornada extraordinaria'
                                    open={open}>
                                        <IconButton 
                                        onClick={handleTooltipClick} 
                                        onMouseEnter={handleTooltipMouseEnter} 
                                        onMouseLeave={handleTooltipMouseLeave}
                                        disableRipple>
                                            <HelpIcon
                                            style={{ color: 'white' }}/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                {
                                    sm ? (
                                    <IconButton className={classes.tableAddButton}>
                                        <AddIcon/>
                                    </IconButton>
                                    ) : (
                                    <Button 
                                    startIcon={<AddIcon/>}
                                    className={classes.tableAddButton}>
                                        Agregar
                                    </Button>
                                    )
                                }
                            </Toolbar>
                            <TableContainer>
                                <Table style={{width: '100%'}} aria-label='Jornada Extraordinaria'>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Justificativos</TableCell>
                                        {/* <TableCell align='center'>Fecha y Hora</TableCell>
                                        <TableCell align='center'>Hora Ingreso</TableCell>
                                        <TableCell align='center'>Hora Salida</TableCell> */}
                                        {/* <TableCell align='center'>Total de Horas</TableCell> */}
                                        <TableCell align='center'>Horas Trabajadas</TableCell>
                                        <TableCell align='center'>Acciones</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component='th' scope='row'>{row.name}</TableCell>
                                            <TableCell align='center'>{row.fat}</TableCell>
                                            <TableCell align='center' className={classes.tableActions}>
                                                <IconButton size='small' color='primary'>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton size='small' color='primary'>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                    <Box my={2} px={sm ? 0 : 3} width='100%'>
                        <Button variant='contained' color='secondary' style={{color: 'white'}} fullWidth>
                            Generar Excel
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

