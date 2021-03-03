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
    Add as AddIcon,
    FileCopy as DuplicateIcon, 
} from '@material-ui/icons';
import { FormProvider, useForm } from 'react-hook-form';
import AddDialog from '../components/horasextras/addDialog';
import useStyles from '../styles';
import FormTextField from '../components/formFields/formTextField';
import FormDatePicker from '../components/formFields/formDatePicker';
import moment from 'moment';
import { JUST_LETTERS_AND_SPACES_REGEXP, SPANISH_REGEXP } from '../utils/regexp';
import axios from 'axios';


export default function ExtraHours() {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    //#region Tooltip
    const [openTitleTooltip, setOpenTitleTooltip] = useState(false);
    const [openMax20Rows, setOpenMax20Rows] = useState(false);

    const handleTooltipClick = () => {
        setOpenTitleTooltip(!openTitleTooltip);
    };
    const handleTooltipMouseEnter = () => {
        setOpenTitleTooltip(true);
    };
    const handleTooltipMouseLeave = () => {
        setOpenTitleTooltip(false);
    };
    //#endregion Tooltip

    //#region add dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [overtimeWork, setOvertimeWork] = useState([]);

    useEffect(() => {
        setOpenMax20Rows(overtimeWork.length >= 20)
    }, [overtimeWork])

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
    const { handleSubmit, control, errors, reset } = useForm();

    const [loading, setLoading] = useState(false);


    const addOvertimeWork = (data) => {
        setOvertimeWork([ ...overtimeWork, data ])
    }

    const editOvertimeWork = (data, idx) => {
        setEdit({ data: data, index: idx })
        setOpenAddDialog(data)
    }

    const duplicateOvertimeWork = (data, idx) => {
        setOvertimeWork([ ...overtimeWork, data ])
    }
    

    const removeOvertimeWork = (idx) => {
        const temp = [...overtimeWork]
        temp.splice(idx, 1)
        setOvertimeWork(temp)
    }

    useEffect(() => {
        const fullname = localStorage.getItem('fullname')
        const role = localStorage.getItem('role')
        const dept = localStorage.getItem('dept')

        reset({
            fullname: fullname,
            role: role,
            dept: dept
        })
    }, [])

    const onSubmit = async (data) => {
        localStorage.setItem('fullname', data.fullname)
        localStorage.setItem('role', data.role)
        localStorage.setItem('dept', data.dept)

        const payload = { 
                fullname: String(data.fullname).trim(),
                role: String(data.role).trim(),
                dept: String(data.dept).trim(),
                company: String(data.company).trim(),
                month: new Date(data.month).toISOString(),
                overtimework: overtimeWork.map(obj => ({
                    overtimeDate: new Date(obj.overtimeDate).toISOString(),
                    workdayStart: new Date(obj.workdayStart).toISOString(),
                    workdayEnd: new Date(obj.workdayEnd).toISOString(),
                    overtimeStartTime: new Date(obj.overtimeStartTime).toISOString(),
                    overtimeEndTime: new Date(obj.overtimeEndTime).toISOString(),
                    details: String(obj.details).trim()
                })) 
        }

        try {
            setLoading(true)
            const response = await axios.post(`/excel/overtimework`, payload, {
                responseType: 'blob'
            })

            const { fullname, month } = payload

            const monthText = new Date(month).toLocaleDateString('es-ES', { month: 'long' })
            const yearNumber = new Date(month).toLocaleDateString('es-ES', { year: 'numeric' })
            const docName = `Formulario de Horas Extras - ${fullname} ${monthText} ${yearNumber}.xlsx`
    
            const href = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', docName); //or any other extension
            document.body.appendChild(link);
            link.click();
            setLoading(false)
        } catch (e) {
            console.error(e)
            setLoading(false)
        }

    };

    const onError = error => {
        console.log(error)
    }
      
    //#endregion form

    const diffInHours = (start, end) => {
        const minutes = moment.utc(end).diff(start, 'minutes')
        const hours = minutes/60
        return Math.round((hours + Number.EPSILON) * 100) / 100
    }

    return (
        <>
            <Head>
                <title>Pago de Horas Extraordinarias - Hypernovalabs</title>
            </Head>
            <Container maxWidth='md' 
            disableGutters>
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
                className={classes.cardBackground}
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
                                rules={{ 
                                    required: 'Campo es requerido', 
                                    pattern: {
                                        value: JUST_LETTERS_AND_SPACES_REGEXP,
                                        message: 'Solo se permiten letras y espacios'
                                    }
                                }}
                                fullWidth
                                />
                        </Box>
                        <Box mt={2}>
                            <div className={classes.row}>
                                <FormTextField
                                name='role'
                                label='Cargo'
                                placeholder='Backend Developer'
                                rules={{ 
                                    required: 'Campo es requerido', 
                                    pattern: {
                                        value: SPANISH_REGEXP, 
                                        message: 'No se permiten caracteres especiales'
                                    }
                                }}
                                className={classes.textfieldGrow}
                                fullWidth
                                />

                                <FormTextField
                                name='dept'
                                label='Departamento'
                                placeholder='Awesome Outsourcing'
                                rules={{ 
                                    required: 'Campo es requerido', 
                                    pattern: {
                                        value: SPANISH_REGEXP, 
                                        message: 'No se permiten caracteres especiales'
                                    } 
                                }}
                                className={classes.textfieldGrow}
                                fullWidth
                                />
                            </div>
                        </Box>
                        <Box mt={2}>
                            <div className={classes.row}>
                                <FormTextField
                                name='company'
                                label='Empresa'
                                helperText='Opcional'
                                rules={{ 
                                    pattern: {
                                        value: SPANISH_REGEXP, 
                                        message: 'No se permiten caracteres especiales'
                                    } 
                                }}
                                className={classes.textfieldGrow}
                                fullWidth
                                />
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
                                    open={openTitleTooltip}>
                                        <IconButton 
                                        onClick={handleTooltipClick} 
                                        onMouseEnter={handleTooltipMouseEnter} 
                                        onMouseLeave={handleTooltipMouseLeave}
                                        disableRipple>
                                            <HelpIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                <Tooltip 
                                    title='Máximo 20 filas'
                                    open={openMax20Rows}
                                    placement='top'>
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
                                </Tooltip>
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
                                                <TableCell component='th' scope='row'>
                                                        <Typography noWrap style={{width: 110}}>
                                                            {row.details}
                                                        </Typography>
                                                    </TableCell>
                                                <TableCell align='center'>{ diffInHours(row.overtimeStartTime, row.overtimeEndTime) }</TableCell>
                                                <TableCell align='center' className={classes.tableActions}>
                                                    <IconButton size='small' onClick={() => editOvertimeWork(row, i)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton size='small' onClick={() => duplicateOvertimeWork(row, i)}>
                                                        <DuplicateIcon/>
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
                            <Button type='submit' variant='contained' size='large' color='secondary' disabled={loading} fullWidth>
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

