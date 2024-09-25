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
      
      background: {
        default: '#181C14', // rgb(24, 28, 20) // Dark green
        paper: '#3C3D37',    // rgb(60, 61, 55) // Light green
      },

      action: {
        active: '#ECDFCC', // rgb(236, 223, 204) // Light tan
        hover: '#697565',  // rgb(105, 117, 101) // Dark tan
        hoverOpacity: 0.1,
        selected: '#ECDFCC', // rgb(236, 223, 204) // Light tan
        selectedOpacity: 0.1,
        disabled: '#697565', // rgb(105, 117, 101) // Dark tan
        disabledOpacity: 0.3,
      },
  
    },
    typography: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
    },
    
  });