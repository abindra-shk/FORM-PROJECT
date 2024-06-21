import { Box } from '@mui/material';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';

const FormRow = ({
  record,
  onFieldChange,
}: {
  record: FormItem;
  onFieldChange: (id: number, field: keyof FormItem, value: string) => void;
}) => {
  return (
    <Box className="row">
      <EditableField recordItem={record.id.toString()} isDisabled={true} />
      <EditableField
        recordItem={record.firstname}
        onFieldChange={(value: string) => onFieldChange(record.id, 'firstname', value)}
      />
      <EditableField
        recordItem={record.lastname}
        onFieldChange={(value: string) => onFieldChange(record.id, 'lastname', value)}
      />
      <EditableField
        recordItem={record.address}
        onFieldChange={(value: string) => onFieldChange(record.id, 'address', value)}
      />
    </Box>
  );
};

export default FormRow;
