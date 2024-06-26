import { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import './Form.style.css';
import FormRow from './FormRow';
import { FormItem } from '../../interface/interface';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const Form = () => {
  const [formArray, setFormArray] = useState<FormItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayAllUsers = async (): Promise<void> => {
    try {
      const res = await axios.get('http://localhost:8000/api/test');
      setFormArray(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    displayAllUsers();
  }, []);

  // eslint-disable-next-line
  const handleFieldChange = (id: string, name: string, value: any) => {
    setFormArray((prevFormArray) =>
      prevFormArray.map((item) => {
        if (item._id !== id) return item;
        const obj = { ...item };

        switch (name) {
          case 'firstName':
            obj.firstName = value;
            updateData(id, { firstName: value });
            break;
          case 'lastName':
            obj.lastName = value;
            updateData(id, { lastName: value });
            break;
          case 'email':
            obj.email = value;
            updateData(id, { email: value });
            break;
          case 'address':
            obj.address = value;
            updateData(id, { address: value });
            break;
          case 'ratePerHour':
            obj.ratePerHour = value;
            if (obj.ratePerHour.toString().trim().length != 0) {
              obj.total = obj.hours * value;
            } else {
              obj.total = NaN;
            }
            updateData(id, { ratePerHour: value });
            updateData(id, { total: obj.total });
            break;
          case 'hours':
            obj.hours = value;
            if (obj.hours.toString().trim().length != 0) {
              obj.total = obj.ratePerHour * value;
            } else {
              obj.total = NaN;
            }
            updateData(id, { hours: value });
            updateData(id, { total: obj.total });
            break;
          default:
            break;
        }

        return obj;
      })
    );
  };

  // eslint-disable-next-line
  const updateData = async (id: string, value: any) => {
    if (value && Object.keys(value).length > 0) {
      try {
        await axios.patch(`http://localhost:8000/api/test/${id}`, value);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/test/${id}`);
      setFormArray((prevFormArray) =>
        prevFormArray.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
    setDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/test', {
        ratePerHour: 100,
      });
      setFormArray([...formArray, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenDialog = (id: string) => {
    setRecordToDelete(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRecordToDelete(null);
  };

  const showError = (message: string) => {
    setError(message);
  };

  return (
    <Box className="form">
      <div
        className="error-message"
        style={{ display: error ? 'block' : 'none' }}
      >
        <Typography variant="h6" color="error">
          <ErrorIcon sx={{ marginRight: 1 }} />
          {error}
        </Typography>
      </div>
      <div className="row">
        <Typography className="row-item" variant="h6">
          ID
        </Typography>
        <Typography className="row-item" variant="h6">
          First Name
        </Typography>
        <Typography className="row-item" variant="h6">
          Last Name
        </Typography>
        <Typography className="row-item" variant="h6">
          Email
        </Typography>
        <Typography className="row-item" variant="h6">
          Address
        </Typography>
        <Typography className="row-item" variant="h6">
          Rate Per Hour
        </Typography>
        <Typography className="row-item" variant="h6">
          Hours
        </Typography>
        <Typography className="row-item" variant="h6">
          Total
        </Typography>
        <Typography className="row-item" variant="h6">
          Actions
        </Typography>
      </div>
      {formArray.map((record: FormItem, index: number) => (
        <FormRow
          index={index}
          key={record._id}
          record={record}
          onFieldChange={handleFieldChange}
          onOpenDialog={handleOpenDialog}
          showError={showError}
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
        <DialogTitle id="alert-dialog-title" sx={{ color: 'black' }}>
          {'Confirm Delete'}
        </DialogTitle>
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
