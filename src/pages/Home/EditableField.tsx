import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

const EditableField = ({
  recordItem,
  isDisabled = false,
  onFieldChange,
  id,
  name,
}: {
  recordItem: string;
  isDisabled?: boolean;
  onFieldChange?: (id: number, name: string, value: string) => void;
  id: number;
  name: string;
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(recordItem);

  const onFieldClick = () => {
    if (!isDisabled) {
      setEditable(true);
    }
  };

  const onBlur = () => {
    setEditable(false);
    if (onFieldChange) {
      onFieldChange(id, name, value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
        />
      ) : (
        <Typography className="row-item" onClick={onFieldClick}>
          {value}
        </Typography>
      )}
    </div>
  );
};

export default EditableField;
