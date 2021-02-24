import { makeStyles } from "@material-ui/core";

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
    table: {
        width: '100%'
    },
    tableToolbar: {
        background: theme.palette.primary.dark
        ,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    tableTitle: {
        flex: '1 1 100%',
        color: theme.palette.text.primary
    },
    tableAddButton: {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0)
        }
    },
    tableActions: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center'
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.dark
    },
    dialogActions: {
        paddingLeft: 20,
        paddingRight: 20
    },
    submitButton: {
        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        animation: 'gradient 1s ease infinite',
        transition: '0.5s',
    },
    '@keyframes gradient': { 
        '0%': { 
            backgroundPosition: '0% 50%' 
        },
        '50%': { 
            backgroundPosition: '100% 50%' 
        },
        '100%': { 
            backgroundPosition: '0% 50%' 
        }
      }
  }));


export default useStyles;