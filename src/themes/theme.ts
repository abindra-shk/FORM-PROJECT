import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
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
          width:'200px',
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
  },
});

export default theme;
