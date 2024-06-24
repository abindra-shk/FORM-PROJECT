import { useState } from 'react';
import './Form.style.css';
import FormRow from './FormRow';
import { FormItem } from '../../interface/interface';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Form = () => {
  const [formArray, setFormArray] = useState<FormItem[]>([
    {
      id: 1,
      firstname: 'Rome',
      lastname: 'Valley',
      email: 'rome@gmail.com',
      address: 'Texas',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 2,
      firstname: 'Romey',
      lastname: 'Vallerie',
      email: 'romey@gmail.com',
      address: 'Atlanta',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 3,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      address: 'New York',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 4,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      address: 'California',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 5,
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      address: 'Florida',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 6,
      firstname: 'Bob',
      lastname: 'Brown',
      email: 'bob.brown@example.com',
      address: 'Nevada',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

    // eslint-disable-next-line
  const handleFieldChange = (id: number, name: string, value: any) => {
    setFormArray((prevFormArray) =>
      prevFormArray.map((item) => {
        if (item.id !== id) return item;
        const obj = { ...item };
        switch (name) {
          case 'firstname':
            return { ...obj, firstname: value };
          case 'lastname':
            return { ...obj, lastname: value };
          case 'address':
            return { ...obj, address: value };
          case 'ratePerHour':
            return { ...obj, ratePerHour: value, total: obj.hours * value };
          case 'hours':
            return { ...obj, hours: value, total: obj.ratePerHour * value };
          default:
            return obj;
        }
      })
    );
  };

  const handleDelete = (id: number) => {
    setFormArray((prevFormArray) => prevFormArray.filter((item) => item.id !== id));
    setDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleAdd = () => {
    const newId = formArray.length ? formArray[formArray.length - 1].id + 1 : 1;
    const newItem: FormItem = {
      id: newId,
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    };
    setFormArray([...formArray, newItem]);
  };

  const handleOpenDialog = (id: number) => {
    setRecordToDelete(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRecordToDelete(null);
  };

  return (
    <Box className="form">
      <Box className="row">
        <Typography className="row-item" variant="h6">ID</Typography>
        <Typography className="row-item" variant="h6">First Name</Typography>
        <Typography className="row-item" variant="h6">Last Name</Typography>
        <Typography className="row-item" variant="h6">Address</Typography>
        <Typography className="row-item" variant="h6">Rate Per Hour</Typography>
        <Typography className="row-item" variant="h6">Hours</Typography>
        <Typography className="row-item" variant="h6">Total</Typography>
        <Typography className="row-item" variant="h6">Actions</Typography>
      </Box>
      {formArray.map((record: FormItem) => (
        <FormRow
          key={record.id}
          record={record}
          onFieldChange={handleFieldChange}
          onOpenDialog={handleOpenDialog}
        />
      ))}
      <Button variant="contained" color="secondary" onClick={handleAdd}>
        <AddIcon />
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{color:'black'}}>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(recordToDelete!)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;
