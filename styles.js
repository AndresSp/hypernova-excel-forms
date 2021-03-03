import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    body: {
        background: 'rgb(8,107,97)',
        background: 'linear-gradient(0deg, rgba(8,107,97,1) 0%, rgba(9,35,51,1) 30%, rgba(9,35,51,1) 70%, rgba(78,26,115,1) 100%)'
    },
    cardBackground: {
        background: theme.palette.background.default,
    },
    logo: {
        width: 120,
        [theme.breakpoints.down('sm')]: {
            width: 100
        }
    },
    label: {
        marginBottom: theme.spacing(1)
    },
    row: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(1)
    },
    textfieldGrow: {
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