import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#242B37',
    },
    secondary: {
      main: '#c7821c',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
