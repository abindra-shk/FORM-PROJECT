import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';

const FormRow = ({
  record,
  onFieldChange,
  onDelete
}: {
  record: FormItem;
  onFieldChange: (id: number, name: string, value: string) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Box className="row">
      <div className="input-label">
        <Typography className="row-item">{record.id}</Typography>
      </div>
      <EditableField
        name={'firstname'}
        id={record.id}
        recordItem={record.firstname}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name={'lastname'}
        id={record.id}
        recordItem={record.lastname}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name={'lastname'}
        id={record.id}
        recordItem={record.address}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name={'ratePerHour'}
        id={record.id}
        recordItem={record.ratePerHour.toString()}
        onFieldChange={onFieldChange}
      />
      <EditableField
        name={'hours'}
        id={record.id}
        recordItem={record.hours.toString()}
        onFieldChange={onFieldChange}
      />
      <div className="input-label">
        <Typography className="row-item">{record.total}</Typography>
      </div>
      <div className="input-label">
        <IconButton aria-label="delete" sx={{textAlign:'center'}} onClick={() => onDelete(record.id)}>
          <DeleteIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
    </Box>
  );
};

export default FormRow;
