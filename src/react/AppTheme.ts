import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#181C14', // Dark green
    },
    secondary: {
      main: '#3C3D37', // Light green
    },
    text: {
      primary: '#ECDFCC', // Light tan
      secondary: '#697565', // Dark tan
    },
    background: {
      default: '#181C14', // Dark green
      paper: '#3C3D37',   // Light green
    },
    action: {
      active: '#ECDFCC', // Light tan
      hover: '#697565',  // Dark tan
      hoverOpacity: 0.1,
      selected: '#ECDFCC', // Light tan
      selectedOpacity: 0.1,
      disabled: '#697565', // Dark tan
      disabledOpacity: 0.3,
    },
  },
  typography: {
    fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
    h1: {
      fontSize: '1.5rem', // Base font size
      fontWeight: 'bold',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '2rem',  // Larger screens
      },
      '@media (min-width:960px)': {
        fontSize: '2.5rem',  // Medium screens
      },
      '@media (min-width:1280px)': {
        fontSize: '3rem',  // Large screens
      },
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '1.8rem',
      },
      '@media (min-width:1280px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 'normal',
      lineHeight: 1.5,
      '@media (min-width:600px)': {
        fontSize: '1.0rem',
      },
      '@media (min-width:960px)': {
        fontSize: '1.0rem',
      },
      '@media (min-width:1280px)': {
        fontSize: '1.1rem',
      },
    },
  },
});
