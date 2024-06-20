import { Box } from '@mui/material';
import { FormItem } from '../../interface/interface';
import EditableField from './EditableField';

const FormRow = ({ record }: { record: FormItem }) => {
  return (
    <Box className="row">
      <EditableField recordItem={record.id.toString()} isDisabled={true} />
      <EditableField recordItem={record.firstname} />
      <EditableField recordItem={record.lastname} />
      <EditableField recordItem={record.address} />
    </Box>
  );
};

export default FormRow;
