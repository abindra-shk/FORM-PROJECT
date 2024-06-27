import { TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const EmailField = ({
  recordItem,
  isDisabled = false,
  onFieldChange,
  id,
  name,
  showError,
}: {
  recordItem: string;
  isDisabled?: boolean;
  onFieldChange?: (id: string, name: string, value: string) => void;
  id: string;
  name: string;
  showError: (message: string) => void;
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(recordItem);
  const [error, setError] = useState(false);

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
    if (!error && onFieldChange && value !== recordItem) {
      onFieldChange(id, name, value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEditable(true);
    setValue(newValue);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newValue)) {
      setError(true);
      showError('Invalid email format !!');
    } else {
      setError(false);
      showError('');
    }
  };

  return (
    <div>
      {editable || !value || value === '' ? (
        <TextField
          className="row-item"
          variant="outlined"
          size="small"
          value={value}
          onBlur={onBlur}
          autoFocus
          onChange={handleChange}
          error={error}
        />
      ) : (
        <Typography
          className={`row-item ${error ? 'error-border' : ''}`}
          onClick={onFieldClick}
        >
          {value}
        </Typography>
      )}
    </div>
  );
};

export default EmailField;
