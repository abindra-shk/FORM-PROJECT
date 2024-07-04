import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect, useRef, FocusEventHandler } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  DateRangeContainer,
  DateWidth,
  RowItem,
  StyledDatePicker,
} from '../../pages/Home/Form/Form.style';

const DateRangeField = ({
  startDate,
  endDate,
  onFieldChange,
  id,
  name,
}: {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onFieldChange?: (
    id: string,
    name: string,
    value: { startDate: string; endDate: string; days: number }
  ) => void;
  id: string;
  name: string;
}) => {
  const [editable, setEditable] = useState(false);
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(
    startDate ? dayjs(startDate) : null
  );
  const [endDateValue, setEndDateValue] = useState<Dayjs | null>(
    endDate ? dayjs(endDate) : null
  );
  const [error, setError] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStartDateValue(startDate ? dayjs(startDate) : dayjs());
    setEndDateValue(endDate ? dayjs(endDate) : dayjs());
  }, [startDate, endDate]);

  const onFieldClick = () => {
    setEditable(true);
  };

  const calculateDays = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    if (startDate && endDate) {
      return dayjs(endDate).diff(dayjs(startDate), 'day');
    }
    return 0;
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isAfter(dayjs())) {
      setError('Future dates are not allowed');
    } else if (endDateValue && newValue && newValue.isAfter(endDateValue)) {
      setError('Start date cannot be after end date');
    } else {
      setError(null);
      setStartDateValue(newValue);
      handleFieldChange(newValue, endDateValue);
    }
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isAfter(dayjs())) {
      setError('Future dates are not allowed');
    } else if (
      startDateValue &&
      newValue &&
      newValue.isBefore(startDateValue)
    ) {
      setError('End date cannot be before start date');
    } else {
      setError(null);
      setEndDateValue(newValue);
      handleFieldChange(startDateValue, newValue);
    }
  };

  const handleFieldChange = (start: Dayjs | null, end: Dayjs | null) => {
    if (onFieldChange && start && end) {
      const days = calculateDays(start, end);
      onFieldChange(id, name, {
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD'),
        days,
      });
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
          <DateRangeContainer>
            <StyledDatePicker
              value={startDateValue}
              onChange={handleStartDateChange}
              onClose={handleClose}
              format="YYYY-MM-DD"
              disableFuture
              slotProps={{
                textField: {
                  onBlur: handleBlur,
                  autoFocus: true,
                  variant: 'outlined',
                  size: 'small',
                  error: !!error,
                  helperText: error,
                  InputProps: {
                    style: { height: '42px', width: '150px' },
                  },
                },
              }}
            />
            <span>-</span>
            <StyledDatePicker
              value={endDateValue}
              onChange={handleEndDateChange}
              onClose={handleClose}
              format="YYYY-MM-DD"
              disableFuture
              slotProps={{
                textField: {
                  onBlur: handleBlur,
                  autoFocus: true,
                  variant: 'outlined',
                  size: 'small',
                  error: !!error,
                  helperText: error,
                  InputProps: {
                    style: { height: '42px', width: '150px' },
                  },
                },
              }}
            />
          </DateRangeContainer>
        </LocalizationProvider>
      ) : (
        <RowItem onClick={onFieldClick}>
          <DateRangeContainer>
            <DateWidth>
              {startDateValue ? dayjs(startDateValue).format('YYYY-MM-DD') : ''}
            </DateWidth>
            <span>-</span>
            <DateWidth>
              {endDateValue ? dayjs(endDateValue).format('YYYY-MM-DD') : ''}
            </DateWidth>
          </DateRangeContainer>
        </RowItem>
      )}
    </div>
  );
};

export default DateRangeField;
