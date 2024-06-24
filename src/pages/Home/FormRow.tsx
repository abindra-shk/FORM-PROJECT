import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';

const FormRow = ({
  record,
  index,
  onFieldChange,
  onOpenDialog,
}: {
  record: FormItem;
  index:number;
  onFieldChange: (id: string, name: string, value: string) => void;
  onOpenDialog: (id: string) => void;
}) => {
  return (
    <Box className="row">
      <div className="input-label">
        <Typography className="row-item">{index + 1}</Typography>
      </div>
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
        name="address"
        id={record._id}
        recordItem={record.address}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name="ratePerHour"
        id={record._id}
        recordItem={record.ratePerHour.toString()}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name="hours"
        id={record._id}
        recordItem={record.hours.toString()}
        onFieldChange={onFieldChange}
      />
      <div className="input-label">
        <Typography className="row-item">{record.total}</Typography>
      </div>
      <div className="input-label">
        <IconButton aria-label="delete" onClick={() => onOpenDialog(record._id)}>
          <DeleteIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
    </Box>
  );
};

export default FormRow;
