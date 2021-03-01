'use strict';

import { 
    Box, 
    Button, 
    Container,  
    IconButton, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Toolbar, 
    Tooltip, 
    Typography, 
    useMediaQuery, 
    useTheme 
} from '@material-ui/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { 
    Help as HelpIcon, 
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon 
} from '@material-ui/icons';
import { FormProvider, useForm } from 'react-hook-form';
import AddDialog from '../components/horasextras/addDialog';
import useStyles from '../styles';
import FormTextField from '../components/formFields/formTextField';
import FormDatePicker from '../components/formFields/formDatePicker';
import { differenceInMinutes } from 'date-fns';


export default function ExtraHours() {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

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

    //#region add dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [overtimeWork, setOvertimeWork] = useState([]);

    const handleAddDialogOpen = () => {
        setOpenAddDialog(true);
    };

    const handleAddDialogClose = () => {
        setOpenAddDialog(false)
    };

    const handleAddDialogSubmit = (data) => {
        addOvertimeWork(data)
        setOpenAddDialog(false)
    };

    const handleEditDialogSubmit = (data, idx) => {
        const temp = [...overtimeWork]
        temp.splice(idx, 1, data)
        setOvertimeWork(temp)
        setOpenAddDialog(false)
    }

    
    //#endregion add dialog

    //#region form
    const { handleSubmit, control, errors } = useForm();


    const addOvertimeWork = (data) => {
        setOvertimeWork([ ...overtimeWork, data ])
    }

    const editOvertimeWork = (data, idx) => {
        setEdit({ data: data, index: idx })
        setOpenAddDialog(data)
    }
    

    const removeOvertimeWork = (idx) => {
        const temp = [...overtimeWork]
        temp.splice(idx, 1)
        setOvertimeWork(temp)
    }

    const onSubmit = (data) => {
        console.log({ 
            ... { overtimework: overtimeWork },
            ...data 
        })
    };

    const onError = error => {
        console.log(error)
    }
      
    //#endregion form

    const diffInHours = (start, end) => {
        const minutes = differenceInMinutes(end, start) 
        const hours = minutes/60
        return Math.round((hours + Number.EPSILON) * 100) / 100
    }

    return (
        <>
            <Head>
                <title>Pago de Horas Extraordinarias - Hypernovalabs</title>
            </Head>
            <Container maxWidth='md' disableGutters>
            <FormProvider { ...{ control, errors } }>
                <Box 
                display='flex'
                flexDirection='column'
                alignItems='center' 
                borderRadius={10} 
                boxShadow={3}
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit, onError)}
                padding={sm ? 2 : 5}>
                    <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width='100%'>
                        <img  src='/img/logo.png' className={classes.logo}/>
                        <Typography 
                        variant={sm? 'h5': 'h4'}>
                            Formulario para Pago de Horas Extraordinarias
                        </Typography>
                    </Box>

                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='stretch'
                    width='100%'
                    component='div'
                    my={2}
                    px={ sm ? 0 : 3 }>
                        <Box mt={2}>
                                <FormTextField
                                name='fullname'
                                label='Nombres y Apellidos'
                                rules={{ required: true }}
                                fullWidth
                                />
                        </Box>
                        <Box mt={2}>
                            <div className={classes.row}>
                                <FormTextField
                                name='role'
                                label='Cargo'
                                rules={{ required: true }}
                                className={classes.textfieldGrow}
                                fullWidth
                                />

                                <FormTextField
                                name='dept'
                                label='Departamento'
                                rules={{ required: true }}
                                className={classes.textfieldGrow}
                                fullWidth
                                />
                            </div>
                        </Box>
                        <Box mt={2}>
                            <div className={classes.row}>
                                <FormDatePicker
                                name='month'
                                label='Período'
                                rules={{ required: true }}
                                openTo='month'
                                views={['year', 'month']}
                                defaultValue={new Date()}
                                fullWidth
                                />
                            </div>
                        </Box>

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
                                            <HelpIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                {
                                    sm ? (
                                    <IconButton 
                                    onClick={handleAddDialogOpen}
                                    cl8assName={classes.tableAddButton}>
                                        <AddIcon/>
                                    </IconButton>
                                    ) : (
                                    <Button
                                    size='large'
                                    startIcon={<AddIcon/>}
                                    onClick={handleAddDialogOpen}
                                    className={classes.tableAddButton}>
                                        Agregar
                                    </Button>
                                    )
                                }
                            </Toolbar>
                            <TableContainer>
                                <Table className={classes.table} aria-label='Jornada Extraordinaria'>
                                    <TableHead>
                                    {
                                        overtimeWork?.length > 0 ? (
                                        <TableRow>
                                            <TableCell>Justificativos</TableCell>
                                            <TableCell align='center'>Horas Trabajadas</TableCell>
                                            <TableCell align='center'>Acciones</TableCell>
                                        </TableRow>
                                        ) : ''
                                    }
                                    </TableHead>
                                    <TableBody>
                                    { overtimeWork?.length > 0 ?
                                        overtimeWork.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell component='th' scope='row'>{row.details}</TableCell>
                                                <TableCell align='center'>{ diffInHours(row.overtimeStartTime, row.overtimeEndTime) }</TableCell>
                                                <TableCell align='center' className={classes.tableActions}>
                                                    <IconButton size='small' onClick={() => editOvertimeWork(row, i)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton size='small' onClick={() => removeOvertimeWork(i)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow >
                                                <TableCell component='th' align='center' colSpan={3} scope='row'>
                                                    <Typography>No hay datos</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        </Box>
                        <Box my={2} px={sm ? 0 : 3} width='100%'>
                            <Button type='submit' variant='contained' size='large' color='secondary' fullWidth>
                                Generar Excel
                            </Button>
                        </Box>
                    </Box>
                </FormProvider>
            </Container>

            <AddDialog 
            open={openAddDialog} 
            onSubmit={handleAddDialogSubmit}
            onEdit={handleEditDialogSubmit}
            onClose={handleAddDialogClose}
            edit={edit} />
        </>
    )
}

