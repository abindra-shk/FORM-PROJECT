import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

const EditableField = ({
  recordItem,
  isDisabled = false,
  onFieldChange,
}: {
  recordItem: string;
  isDisabled?: boolean;
  onFieldChange?: (value: string) => void;
}) => {
  const [editable, setEditable] = useState(false);

  const onFieldClick = () => {
    if (!isDisabled) {
      setEditable(true);
    }
  };

  const onBlur = () => {
    setEditable(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onFieldChange) {
      onFieldChange(event.target.value);
    }
  };

  return (
    <div className='input-label'>
      {editable ? (
        <TextField
          className="row-item"
          variant="outlined"
          size="small"
          value={recordItem}
          fullWidth
          onBlur={onBlur}
          autoFocus
          onChange={handleChange}
        />
      ) : (
        <Typography className='row-item' onClick={onFieldClick}>
          {recordItem}
        </Typography>
      )}
    </div>
  );
};

export default EditableField;
