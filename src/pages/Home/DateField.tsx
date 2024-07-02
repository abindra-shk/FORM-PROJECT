import { Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect, useRef, FocusEventHandler } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const DateField = ({
  recordItem,
  onFieldChange,
  id,
  name,
}: {
  recordItem: Dayjs | null;
  onFieldChange?: (id: string, name: string, value: string) => void;
  id: string;
  name: string;
}) => {
  const [editable, setEditable] = useState(false);
  const [dateValue, setDateValue] = useState<Dayjs | null>(
    recordItem ? dayjs(recordItem) : null
  );
  const [error, setError] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDateValue(recordItem ? dayjs(recordItem) : dayjs());
  }, [recordItem]);

  const onFieldClick = () => {
    setEditable(true);
  };

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isAfter(dayjs())) {
      setError('Future dates are not allowed');
    } else {
      setError(null);
      setDateValue(newValue);
      if (onFieldChange) {
        console.log('here onchange')
        onFieldChange(id, name, newValue ? newValue.format('YYYY-MM-DD') : '');
      }
    }
  };

  const handleBlur: FocusEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    if (
      datePickerRef.current &&
      event.relatedTarget instanceof Node &&
      datePickerRef.current.contains(event.relatedTarget)
    ) {
      return; // Do nothing if blur event is within DatePicker component
    }
    setEditable(false);
  };

  const handleClose = () => {
    setEditable(false);
    // If you need to do something on close, you can add it here.
  };

  return (
    <div ref={datePickerRef}>
      {editable ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateValue}
            onChange={handleChange}
            onClose={handleClose}
            format="YYYY-MM-DD"
            disableFuture
            autoFocus
            slotProps={{
              textField: {
                onBlur: handleBlur,
                autoFocus: true,
                variant: 'outlined',
                size: 'small',
                error: !!error,
                helperText: error,
                InputProps: {
                  style: { height: '42px' },
                },
              },
            }}
          />
        </LocalizationProvider>
      ) : (
        <Typography className="row-item" onClick={onFieldClick}>
          {dateValue ? dateValue.format('YYYY-MM-DD') : ''}
        </Typography>
      )}
    </div>
  );
};

export default DateField;
