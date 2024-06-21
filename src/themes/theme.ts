import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'white',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '150px',
          '& .MuiInputBase-input': {
            color: 'white', // text color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#556cd6', // border color
            },
            '&:hover fieldset': {
              borderColor: '#19857b', // border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#19857b', // border color when focused
            },
          },
          '& .Mui-disabled': {
            opacity: 1, // remove default opacity
            '-webkit-text-fill-color': 'white', // change text color
          },
          '& .MuiInputBase-input.Mui-disabled': {
            opacity: 1,
            '-webkit-text-fill-color': 'white', // customize the text color for disabled state
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root:{width: '40px'},
        containedSecondary: {
          borderRadius:'50%',
          minWidth: '40px', 
          height: '40px', 
          padding: '10px',
          marginTop:'5px', 
          backgroundColor: grey[500], 
          '&.MuiButton-containedSecondary': {
            color: 'white', 
            '&:hover': {
              backgroundColor: grey[700], 
            },
          },
        },
      },
    },
  },
});

export default theme;
