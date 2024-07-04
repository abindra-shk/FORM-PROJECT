import { useState, useEffect } from 'react';
import { RowItem, StyledTextField } from '../../pages/Home/Form/Form.style';

const NumberField = ({
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
    const newValue = event.target.value;

    // Check if there are more than two digits after the decimal point
    const parts = newValue.split('.');
    if (parts.length === 2 && parts[1].length > 2) {
      setError(true);
      showError('Only two digits after the decimal point is allowed !!');
      return;
    }

    // Regex for decimal numbers with up to two digits after the decimal point
    const decimalRegex = /^\d*(\.\d{0,2})?$/;

    setEditable(true);

    if (!decimalRegex.test(newValue)) {
      setError(true);
      showError('Invalid number format !!');
      return;
    }

    if (name === 'hours' && Number(newValue) > 12) {
      setError(true);
      showError('Only 12 hours of work can be recorded !!');
      return;
    }

    setError(false);
    setValue(newValue);
    showError('');
  };

  return (
    <div>
      {editable || !value || value === '' ? (
        <StyledTextField
          variant="outlined"
          size="small"
          value={value}
          onBlur={onBlur}
          autoFocus
          onChange={handleChange}
          error={error}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Optional: restricts input to numeric only (excluding e and -)
        />
      ) : (
        <RowItem onClick={onFieldClick}>{value}</RowItem>
      )}
    </div>
  );
};

export default NumberField;
