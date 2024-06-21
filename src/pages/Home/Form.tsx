import { useState } from 'react';
import './Form.style.css';
import FormRow from './FormRow';
import { FormItem } from '../../interface/interface';
import { Box, Typography } from '@mui/material';

const Form = () => {
  const [formArray, setFormArray] = useState<FormItem[]>([
    {
      id: 1,
      firstname: 'Rome',
      lastname: 'Valley',
      email: 'rome@gmail.com',
      address: 'Texas',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 2,
      firstname: 'Romey',
      lastname: 'Vallerie',
      email: 'romey@gmail.com',
      address: 'Atlanta',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 3,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      address: 'New York',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 4,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      address: 'California',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 5,
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      address: 'Florida',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
    {
      id: 6,
      firstname: 'Bob',
      lastname: 'Brown',
      email: 'bob.brown@example.com',
      address: 'Nevada',
      ratePerHour: 100,
      hours: 0,
      total: 0,
    },
  ]);
  // eslint-disable-next-line
  const handleFieldChange = (id: number, name: String, value: any) => {
    console.log('id', id, 'field', name, 'value', value);
    setFormArray((prevFormArray) =>
      prevFormArray.map((item) => {
        if (item.id != id) return item;
        const obj = { ...item };
        switch (name) {
          case 'firstname':
            return { ...obj, firstname: value };
            break;
          case 'lastname':
            return { ...obj, lastname: value };
            break;
          case 'address':
            return { ...obj, address: value };
            break;
          case 'ratePerHour':
            return { ...obj, ratePerHour: value, total: obj.hours * value };
            break;
          case 'hours':
            return { ...obj, hours: value, total: obj.ratePerHour * value };
            break;
        }

        return obj;
      })
    );
  };

  const handleDelete = (id: number) => {
    setFormArray((prevFormArray) => prevFormArray.filter((item) => item.id !== id));
  };

  return (
    <Box className="form">
      <Box className="row">
        <Typography className="row-item" variant="h6">
          ID
        </Typography>
        <Typography className="row-item" variant="h6">
          First Name
        </Typography>
        <Typography className="row-item" variant="h6">
          Last Name
        </Typography>
        <Typography className="row-item" variant="h6">
          Address
        </Typography>
        <Typography className="row-item" variant="h6">
          Rate Per Hour
        </Typography>
        <Typography className="row-item" variant="h6">
          Hours
        </Typography>
        <Typography className="row-item" variant="h6">
          Total
        </Typography>
        <Typography className="row-item" variant="h6">
          Actions
        </Typography>
      </Box>
      {formArray.map((record: FormItem) => (
        <FormRow
          key={record.id}
          record={record}
          onFieldChange={handleFieldChange}
          onDelete={handleDelete}git 
        />
      ))}
    </Box>
  );
};

export default Form;
