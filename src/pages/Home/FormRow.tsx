import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';
import NumberField from './NumberField';
import CurrencyValidationField from './CurrencyField';
import EmailField from './EmailField';
import DateField from './DateField';

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
  errorId: string | null;
  setErrorId: (id: string | null) => void;
}) => {

  return (
    <Box className="row">
      <Typography className="row-item">{index + 1}</Typography>
      <EditableField
        name="name"
        id={record._id}
        recordItem={record.name}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name="address"
        id={record._id}
        recordItem={record.address}
        onFieldChange={onFieldChange}
      />
      <EmailField
        name="email"
        id={record._id}
        errorId={errorId}
        recordItem={record.email}
        onFieldChange={onFieldChange}
        showError={showError}
        setErrorId={setErrorId}
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
      {/* <Typography className="row-item">
        {startDate ? startDate.format('YYYY-MM-DD') : ''}
      </Typography> */}
      <DateField
        recordItem={record.startDate}
        id={record._id}
        name="startDate"
        onFieldChange={onFieldChange}
      />
      <DateField
        recordItem={record.endDate}
        id={record._id}
        name="endDate"
        onFieldChange={onFieldChange}
      />
      <Typography className="row-item"> {record.days? record.days : 0}</Typography>
      <IconButton aria-label="delete" onClick={() => onOpenDialog(record._id)}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default FormRow;
