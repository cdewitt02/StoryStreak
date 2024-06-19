import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily : [
      'EB Garamond',
    ].join(',')
  },
  palette: {
    primary: {
      main: '#AFDEDC',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: '#564951',
    },
    secondary: {
      main: '#564951',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#776871',
    },
  },
});

export default theme;