import { TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const CurrencyField = ({
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
    setError(false);
    showError('');
    if (onFieldChange && value !== recordItem) {
      onFieldChange(id, name, value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditable(true);
    const newValue = event.target.value;

    // Check for invalid characters (any character that is not a digit or a dollar sign)
    if (/[^0-9$.]/.test(newValue)) {
      setError(true);
      showError('Only numbers are allowed !!');
      return;
    }

    // Remove dollar signs in the middle of the value (if any)
    const numericValue = newValue.replace(/\$/g, '');

    // Check for more than two digits after the decimal point
    const parts = numericValue.split('.');
    if (parts.length === 2 && parts[1].length > 2) {
      setError(true);
      showError('Only up to two digits are allowed after the decimal point !!');
      return;
    }

    if (Number(numericValue) > 1000) {
      setError(true);
      showError('Value cannot exceed 1000 !!');
      return;
    }

    setError(false);
    setValue(numericValue);
    showError('');
  };

  return (
    <div>
      {editable || !value || value === '' ? (
        <TextField
          className="row-item"
          variant="outlined"
          size="small"
          value={value ? `$${value}` : ''}
          onBlur={onBlur}
          autoFocus
          onChange={handleChange}
          error={error}
        />
      ) : (
        <Typography className="row-item" onClick={onFieldClick}>
          {value ? `$${value}` : ''}
        </Typography>
      )}
    </div>
  );
};

export default CurrencyField;
