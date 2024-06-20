import { Box, TextField } from '@mui/material';
import { FormItem } from '../../interface/interface';

const FormRow = ({ item }: { item: FormItem }) => {
  return (
    <Box className="row" sx={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      className='row-item'
      variant="outlined"
      size="small"
      value={item.id}
      disabled
      sx={{color:'white'}}
    />
    <TextField
      className='row-item'
      variant="outlined"
      size="small"
      value={item.firstname}
      disabled
    />
    <TextField
      className='row-item'
      variant="outlined"
      size="small"
      value={item.lastname}
      disabled
    />
    <TextField
      className='row-item'
      variant="outlined"
      size="small"
      value={item.address}
      disabled
    />
  </Box>
  );
};

export default FormRow;
