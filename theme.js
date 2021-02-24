
import { createMuiTheme } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#12c4b2',
    },
    secondary: {
      main: '#fada51',
    },
    // text: {
    //   primary: '#092333',
    //   secondary: '#092333'
    // },
    background: {
      default: '#092333',
    },
  },
});


export default theme;