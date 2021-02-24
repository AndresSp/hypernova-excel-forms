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
    TextField, 
    Toolbar, 
    Tooltip, 
    Typography, 
    useMediaQuery, 
    useTheme 
} from '@material-ui/core';
import { 
    DatePicker
} from '@material-ui/pickers';
import Head from 'next/head';
import React, { useState } from 'react';
import { 
    Help as HelpIcon, 
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon 
} from '@material-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import AddDialog from '../components/horasextras/addDialog';
import useStyles from '../styles';


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

    const handleAddDialogOpen = () => {
        setOpenAddDialog(true);
    };

    const handleAddDialogClose = () => {
        setOpenAddDialog(false);
    };

    
    //#endregion add dialog

    //#region form
    const { register, handleSubmit, control, watch, errors } = useForm();
      const onSubmit = data => console.log(data);
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
    //#endregion form

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
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
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
                    alignItems='center'
                    width='100%'
                    component='div'
                    my={2}
                    px={ sm ? 0 : 3 }>
                        <TextField 
                        name='name'
                        label='Nombres y Apellidos' 
                        variant='outlined'
                        size='small'
                        fullWidth 
                        className={classes.textfield}
                        inputRef={register({ required: true })} />

                        <div className={classes.row}>
                            <TextField 
                            name='role'
                            label='Cargo' 
                            variant='outlined' 
                            size='small' 
                            className={classes.textfieldGrow} 
                            inputRef={register({ required: true })}/>

                            <TextField 
                            name='department'
                            label='Departamento' 
                            variant='outlined' 
                            size='small' 
                            className={classes.textfieldGrow}
                            inputRef={register({ required: true })} />
                        </div>

                        <div className={classes.row}>
                        <Controller
                            name='month'
                            control={control}
                            defaultValue={false}
                            rules={{ required: true }}
                            render={({ ref, ...rest }) =>
                                <DatePicker
                                name='month'
                                openTo='month'
                                views={['year', 'month']}
                                inputVariant='outlined'
                                size='small'
                                input
                                fullWidth
                                className={classes.textfield}
                                label='Período'
                                {...rest}
                                />
                            } // props contains: onChange, onBlur and value
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
                                            <HelpIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                {
                                    sm ? (
                                    <IconButton 
                                    onClick={handleAddDialogOpen}
                                    className={classes.tableAddButton}>
                                        <AddIcon/>
                                    </IconButton>
                                    ) : (
                                    <Button
                                    
                                    startIcon={<AddIcon/>}
                                    onClick={handleAddDialogOpen}
                                    className={classes.tableAddButton}>
                                        Agregar
                                    </Button>
                                    )
                                }
                                <AddDialog open={openAddDialog} onClose={handleAddDialogClose}/>
                            </Toolbar>
                            <TableContainer>
                                <Table className={classes.table} aria-label='Jornada Extraordinaria'>
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
                                                <IconButton size='small'>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton size='small'>
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
                        <Button type='submit' variant='contained' color='secondary' fullWidth>
                            Generar Excel
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

