const { createMuiTheme } = require('@material-ui/core/styles');

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0A2333',
    },
    secondary: {
      main: '#69CC8C',
    },
    yellow: {
      main: '#C3D568'
    },
    text: {
      default: '#0A2333'
    },
    background: {
      default: '#FAFAFA',
    },
  },
});

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       main: '#59CB94',
//     },
//     secondary: {
//       main: '#D9D75F',
//     },
//     text: {
//       default: '#59CB94'
//     },
//     background: {
//       default: '#0A2333',
//     },
//   },
// });

export default theme;