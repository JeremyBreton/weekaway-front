/* eslint-disable import/prefer-default-export */
import { ThemeOptions } from '@mui/material/styles';
import '@fontsource-variable/comfortaa';
import '@fontsource/coming-soon';

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
    fontFamily: 'Coming Soon',
    h1: {
      fontFamily: 'Comfortaa variable',
    },
    h2: {
      fontFamily: 'Comfortaa variable',
    },
    h3: {
      fontFamily: 'Comfortaa variable',
    },
    h4: {
      fontFamily: 'Comfortaa variable',
    },
    h5: {
      fontFamily: 'Comfortaa variable',
    },
    h6: {
      fontFamily: 'Comfortaa variable',
    },
    button: {
      fontFamily: 'Comfortaa variable',
    },
  },
};
