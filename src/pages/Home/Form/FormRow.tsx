import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormItem } from '../../../interface/interface';
import EditableField from '../../../components/Form/EditableField';
import NumberField from '../../../components/Form/NumberField';
import CurrencyField from '../../../components/Form/CurrencyField';
import EmailField from '../../../components/Form/EmailField';
import DateRangeField from '../../../components/Form/DateRangeField';
import { Row, RowItem } from './Form.style';

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
  onFieldChange: (id: string, name: string, value: any) => void;
  onOpenDialog: (id: string) => void;
  showError: (message: string) => void;
  errorId: string | null;
  setErrorId: (id: string | null) => void;
}) => {
  return (
    <Row>
      <RowItem>{index + 1}</RowItem>
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
      <CurrencyField
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
      <RowItem> ${record.total.toFixed(2)}</RowItem>
      <DateRangeField
        startDate={record.startDate}
        endDate={record.endDate}
        id={record._id}
        name="dateRange"
        onFieldChange={onFieldChange}
      />
      <RowItem> {record.days ? record.days : 0}</RowItem>
      <IconButton aria-label="delete" onClick={() => onOpenDialog(record._id)}>
        <DeleteIcon sx={{ color: 'white' }} />
      </IconButton>
    </Row>
  );
};

export default FormRow;
