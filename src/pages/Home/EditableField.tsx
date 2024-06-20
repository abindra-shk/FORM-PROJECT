import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

const EditableField = ({
  recordItem,
  isDisabled = true,
}: {
  recordItem: string;
  isDisabled?: boolean;
}) => {
  const [editable, setEditable] = useState(isDisabled);
  const [value, setValue] = useState(recordItem);

  const onFieldClick = () => {
    setEditable(false);
  };

  const onBlur = () => {
    setEditable(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className='input-label'>
      {editable ? (
        <Typography className='row-item' onClick={onFieldClick}>
          {value}
        </Typography>
      ) : (
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
      )}
    </div>
  );
};

export default EditableField;
