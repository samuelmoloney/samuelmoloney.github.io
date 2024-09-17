import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#181C14', // rgb(24, 28, 20) // Dark green
    },
    secondary: {
      main: '#3C3D37', // rgb(60, 61, 55) // Light green
    },
    text: {
      primary: '#ECDFCC', // rgb(236, 223, 204) // Light tan
      secondary: '#697565', // rgb(105, 117, 101) // Dark tan
    },

  },
  typography: {
    fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
  },
  
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
