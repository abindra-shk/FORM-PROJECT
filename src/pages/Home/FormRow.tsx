import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';
import NumberField from './NumberField';
import CurrencyValidationField from './CurrencyField';

const FormRow = ({
  record,
  index,
  onFieldChange,
  onOpenDialog,
  showError,
}: {
  record: FormItem;
  index: number;
  onFieldChange: (id: string, name: string, value: string) => void;
  onOpenDialog: (id: string) => void;
  showError: (message: string) => void;
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
      <EditableField
        name="email"
        id={record._id}
        recordItem={record.email}
        onFieldChange={onFieldChange}
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
      <Typography className="row-item">${record.total}</Typography>
      <IconButton aria-label="delete" onClick={() => onOpenDialog(record._id)}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default FormRow;
