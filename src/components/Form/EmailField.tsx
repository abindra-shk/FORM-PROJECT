import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { RowItem, StyledTextField } from '../../pages/Home/Form/Form.style';

const EmailField = ({
  recordItem,
  isDisabled = false,
  onFieldChange,
  id,
  name,
  showError,
  errorId,
  setErrorId,
}: {
  recordItem: string;
  isDisabled?: boolean;
  onFieldChange?: (id: string, name: string, value: string) => void;
  id: string;
  name: string;
  showError: (message: string) => void;
  errorId: string | null;
  setErrorId: (id: string | null) => void;
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(recordItem);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    setValue(recordItem);
    if (errorId && errorId === id) {
      setError(true);
      setHelperText('User with this email already exists.');
    }
  }, [recordItem, errorId, id]);

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
      // setHelperText('Invalid email format.');
      showError('Invalid email format !!');
    } else {
      setError(false);
      setHelperText('');
      showError('');
      if (errorId === id) {
        setErrorId(null);
      }
    }
  };

  return (
    <Box>
      {editable || !value || value === '' ? (
        <StyledTextField
          variant="outlined"
          size="small"
          value={value}
          onBlur={onBlur}
          autoFocus
          onChange={handleChange}
          error={error}
          helperText={helperText}
        />
      ) : (
        <>
          <RowItem error={error} onClick={onFieldClick}>
            {value}
          </RowItem>
          {error && (
            <Typography variant="caption" color="error">
              {helperText}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default EmailField;
