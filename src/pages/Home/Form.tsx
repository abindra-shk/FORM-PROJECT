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
    },
    {
      id: 2,
      firstname: 'Romey',
      lastname: 'Vallerie',
      email: 'romey@gmail.com',
      address: 'Atlanta',
    },
    {
      id: 3,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      address: 'New York',
    },
    {
      id: 4,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      address: 'California',
    },
    {
      id: 5,
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      address: 'Florida',
    },
    {
      id: 6,
      firstname: 'Bob',
      lastname: 'Brown',
      email: 'bob.brown@example.com',
      address: 'Nevada',
    },
  ]);

  const handleFieldChange = (id: number, field: keyof FormItem, value: string) => {
    setFormArray((prevFormArray) =>
      prevFormArray.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
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
      </Box>
      {formArray.map((record: FormItem) => (
        <FormRow key={record.id} record={record} onFieldChange={handleFieldChange} />
      ))}
    </Box>
  );
};

export default Form;
