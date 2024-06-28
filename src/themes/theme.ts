import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import { darken } from '@mui/material/styles';

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
      display:'flex',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'white', // text color
          },
          '& .Mui-disabled': {
            opacity: 1, // remove default opacity
            '-webkit-text-fill-color': 'white', // change text color
          },
          '& .MuiInputBase-input.Mui-disabled': {
            opacity: 1,
            '-webkit-text-fill-color': 'white', // customize the text color for disabled state
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'dimgrey',
            borderWidth: '2px', // Custom focus border color and width
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: darken('#556cd6', 0.2), // Darken the primary color by 20% on hover
          },
          '& .MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
          {
            borderColor: 'red' ,
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#556cd6',
            borderWidth: '2px', // Custom focus border color and width
          },
  
          '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: red.A400, // Custom error border color
          },

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { width: '40px' },
        containedSecondary: {
          borderRadius: '50%',
          minWidth: '40px',
          height: '40px',
          padding: '10px',
          marginTop: '5px',
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