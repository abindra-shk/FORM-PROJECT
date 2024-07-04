import { useState, useEffect } from 'react';
import { RowItem, StyledTextField } from '../../pages/Home/Form/Form.style';

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
      onFieldChange(id, name, value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditable(true);
    const newValue = event.target.value;
    setValue(newValue);
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
        />
      ) : (
        <RowItem onClick={onFieldClick}>{value}</RowItem>
      )}
    </div>
  );
};

export default EditableField;
