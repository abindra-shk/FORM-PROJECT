import { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import './Form.style';
import FormRow from './FormRow';
import { FormItem } from '../../../interface/interface';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormHeading from './FormHeading';
import {
  GetRequest,
  PostRequest,
  DeleteRequest,
  PatchRequest,
} from '../../../services/services';
import { API_ENDPOINTS } from '../../../utils/constant';
import dayjs, { Dayjs } from 'dayjs';
import { ErrorMessage, StyledForm } from './Form.style';
import ConfirmDialog from './ConfirmDialog';
import AutoCompleteSearch from './AutoCompleteSearch';
import {
  setNetworkInfo,
  clearNetworkInfo,
} from '../../../services/networkSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const dispatch = useDispatch();
  const [formArray, setFormArray] = useState<FormItem[]>([]);
  const [filteredFormArray, setFilteredFormArray] = useState<FormItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const navigate = useNavigate();

  const displayAllUsers = async (): Promise<void> => {
    try {
      dispatch(setNetworkInfo('fetching'));
      const res = await GetRequest(API_ENDPOINTS.TEST);
      // res status
      if (res.status == 402) {
        navigate ('./login')
      }
      dispatch(clearNetworkInfo());
      setFormArray(res.data.data);
      setFilteredFormArray(res.data.data);
      console.log('users', res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    displayAllUsers();
  }, []);

  const handleFieldChange = (id: string, name: string, value: any) => {
    const updateItem = (item: FormItem) => {
      if (item._id !== id) return item;
      const obj = { ...item };

      switch (name) {
        case 'name':
          obj.name = value;
          updateData(id, { name: value });
          break;
        case 'email':
          obj.email = value;
          updateData(id, { email: value });
          break;
        case 'address':
          obj.address = value;
          updateData(id, { address: value });
          break;
        case 'ratePerHour':
          obj.ratePerHour = value;
          if (obj.ratePerHour.toString().trim().length !== 0) {
            obj.total = obj.hours * value;
          } else {
            obj.total = NaN;
          }
          updateData(id, { ratePerHour: value });
          updateData(id, { total: obj.total });
          break;
        case 'hours':
          obj.hours = value;
          if (obj.hours.toString().trim().length !== 0) {
            obj.total = obj.ratePerHour * value;
          } else {
            obj.total = NaN;
          }
          updateData(id, { hours: value });
          updateData(id, { total: obj.total });
          break;
        case 'startDate':
        case 'endDate':
          obj[name] = value;
          if (
            name === 'startDate' &&
            obj.endDate &&
            dayjs(value).isAfter(dayjs(obj.endDate))
          ) {
            setError('Start date cannot be after end date');
          } else if (
            name === 'endDate' &&
            obj.startDate &&
            dayjs(value).isBefore(dayjs(obj.startDate))
          ) {
            setError('End date cannot be before start date');
          } else {
            obj.days = calculateDays(obj.startDate, obj.endDate);
            setError(null);
            updateData(id, { [name]: value });
            updateData(id, { days: obj.days });
          }
          break;
        case 'dateRange':
          obj.startDate = value.startDate;
          obj.endDate = value.endDate;
          obj.days = value.days;
          updateData(id, {
            startDate: value.startDate,
            endDate: value.endDate,
            days: value.days,
          });
          break;
        default:
          break;
      }

      return obj;
    };

    setFormArray((prevFormArray) => prevFormArray.map(updateItem));
    setFilteredFormArray((prevFilteredArray) =>
      prevFilteredArray.map(updateItem)
    );
  };

  const updateData = async (id: string, value: any) => {
    if (value && Object.keys(value).length > 0) {
      try {
        await PatchRequest(`${API_ENDPOINTS.TEST}/${id}`, value);
      } catch (err: any) {
        console.log(err.response.data.message);
        if (err.response.data.message) {
          setErrorId(id);
        }
      }
    }
  };

  const calculateDays = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    if (startDate && endDate) {
      return dayjs(endDate).diff(dayjs(startDate), 'day');
    }
    return 0;
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteRequest(`${API_ENDPOINTS.TEST}/${id}`);
      setFormArray((prevFormArray) =>
        prevFormArray.filter((item) => item._id !== id)
      );
      setFilteredFormArray((prevFilteredArray) =>
        prevFilteredArray.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
    setDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleAdd = async () => {
    try {
      const res = await PostRequest(API_ENDPOINTS.TEST, {
        ratePerHour: 100,
      });
      setFormArray([...formArray, res.data.data]);
      setFilteredFormArray([...formArray, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddRecord = async (username: string) => {
    try {
      const res = await PostRequest(API_ENDPOINTS.TEST, {
        name: username,
        ratePerHour: 100, // default rate per hour
      });
      setFormArray([...formArray, res.data.data]);
      setFilteredFormArray([...formArray, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenDialog = (id: string) => {
    setRecordToDelete(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRecordToDelete(null);
  };

  const showError = (message: string) => {
    setError(message);
  };

  const handleSearchInputChange = (value: string) => {
    const filteredOptions = formArray
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => b.ratePerHour - a.ratePerHour);

    setFilteredFormArray(filteredOptions);
  };

  return (
    <>
      <AutoCompleteSearch
        formArray={formArray}
        onInputChange={handleSearchInputChange}
        onAddRecord={handleAddRecord}
      />
      <StyledForm>
        <ErrorMessage visible={!!error}>
          <Typography variant="h6" color="error">
            <ErrorIcon sx={{ marginRight: 1 }} />
            {error}
          </Typography>
        </ErrorMessage>

        <FormHeading />

        {filteredFormArray.map((record: FormItem, index: number) => (
          <FormRow
            index={index}
            key={record._id}
            record={record}
            errorId={errorId}
            setErrorId={setErrorId}
            onFieldChange={handleFieldChange}
            onOpenDialog={handleOpenDialog}
            showError={showError}
          />
        ))}
        <Button variant="contained" color="secondary" onClick={handleAdd}>
          <AddIcon />
        </Button>
        <ConfirmDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onDelete={() => handleDelete(recordToDelete!)}
        />
      </StyledForm>
    </>
  );
};

export default Form;
