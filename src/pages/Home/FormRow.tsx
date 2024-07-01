import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';
import NumberField from './NumberField';
import CurrencyValidationField from './CurrencyField';
import EmailField from './EmailField';

const FormRow = ({
  record,
  index,
  onFieldChange,
  onOpenDialog,
  showError,
  errorId,
  setErrorId,
}: {
  record: FormItem;
  index: number;
  onFieldChange: (id: string, name: string, value: string) => void;
  onOpenDialog: (id: string) => void;
  showError: (message: string) => void;
  errorId :string | null;
  setErrorId: (id: string | null) => void;
}) => {
  return (
    <Box className="row">
      <Typography className="row-item">{index + 1}</Typography>
      <EditableField
        name="firstName"
        id={record._id}
        recordItem={record.firstName}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name="lastName"
        id={record._id}
        recordItem={record.lastName}
        onFieldChange={onFieldChange}
      />
      <EmailField
        name="email"
        id={record._id}
        errorId ={errorId}
        recordItem={record.email}
        onFieldChange={onFieldChange}
        showError={showError}
        setErrorId = {setErrorId}
  
      />
      <EditableField
        name="address"
        id={record._id}
        recordItem={record.address}
        onFieldChange={onFieldChange}
      />

      <CurrencyValidationField
        name="ratePerHour"
        id={record._id}
        recordItem={record.ratePerHour.toString()}
        onFieldChange={onFieldChange}
        showError={showError}
      />
      <NumberField
        name="hours"
        id={record._id}
        recordItem={record.hours.toString()}
        onFieldChange={onFieldChange}
        showError={showError}
      />
      <Typography className="row-item"> ${record.total.toFixed(2)}</Typography>
      <IconButton aria-label="delete" onClick={() => onOpenDialog(record._id)}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default FormRow;
