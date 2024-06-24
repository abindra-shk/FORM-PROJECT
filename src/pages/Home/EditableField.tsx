import { TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

const EditableField = ({
  recordItem,
  isDisabled = false,
  onFieldChange,
  id,
  name,
}: {
  recordItem: string;
  isDisabled?: boolean;
  onFieldChange?: (id: string, name: string, value: string) => void;
  id: string;
  name: string;
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(recordItem);
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setValue(recordItem);
  }, [recordItem]);

  const onFieldClick = () => {
    if (!isDisabled) {
      setEditable(true);
    }
  };

  const onBlur = () => {
    setEditable(false);
    if (onFieldChange && value !== recordItem) {
      console.log('id inside onblur', id);
      onFieldChange(id, name, value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEditable(true);
    if (name === 'ratePerHour' || name === 'hours') {
      if (!/^\d*$/.test(newValue)) {
        setError(true);
        setSnackbarOpen(true);
      } else {
        setError(false);
        setSnackbarOpen(false);
      }
    }
    setValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="input-label">
      {editable || !value || value == '' ? (
        <TextField
          className="row-item"
          variant="outlined"
          size="small"
          value={value}
          fullWidth
          onBlur={onBlur}
          autoFocus
          onChange={handleChange}
          error={error}
          InputProps={{
            style: { borderColor: error ? 'red' : '' },
          }}
        />
      ) : (
        <Typography className="row-item" onClick={onFieldClick}>
          {value}
        </Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Only numbers are allowed!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditableField;
