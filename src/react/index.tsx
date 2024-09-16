import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#181C14',
    },
    secondary: {
      main: '#3C3D37',
    },
    text: {
      primary: '#ECDFCC', 
      secondary: '#697565', 
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
