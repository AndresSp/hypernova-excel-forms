
import { createMuiTheme } from '@material-ui/core';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#12c4b2',
    },
    secondary: {
      main: '#6b239e',
    },
    // text: {
    //   primary: '#092333',
    //   secondary: '#092333'
    // },
    background: {
      default: '#092333',
    },
  },
  typography: {
    fontFamily: 'Gotham'
  },
});


export default theme;