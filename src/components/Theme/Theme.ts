/* eslint-disable import/prefer-default-export */
import { ThemeOptions } from '@mui/material/styles';
import '@fontsource-variable/nunito';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#001e1d',
    },
    secondary: {
      main: '#f9bc60',
    },
    background: {
      default: '#004643',
      paper: '#abd1c6',
    },
    text: {
      primary: '#001E1D',
      secondary: '#001E1D',
    },
  },
  typography: {
    fontFamily: 'Nunito Variable',
    h1: {
      fontFamily: 'Nunito Variable',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Nunito Variable',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Nunito Variable',
      fontWeight: 500,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: 'Nunito Variable',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Nunito Variable',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Nunito Variable',
      fontWeight: 500,
    },
    button: {
      fontFamily: 'Nunito Variable',
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: 'Nunito Variable',
      fontSize: '1.1rem',
      fontWeight: 400,
    },
  },
};
