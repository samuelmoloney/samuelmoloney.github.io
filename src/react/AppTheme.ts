import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
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