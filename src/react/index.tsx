import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#ec407a',
    },
    background: {
      default: 'transparent',
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
