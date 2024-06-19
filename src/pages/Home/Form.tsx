import { useState } from 'react';
import './Form.style.css';
import FormRow from './FormRow';
import { FormItem } from '../../interface/interface';

const Form = () => {
  const [formArray, setFormArray] = useState<FormItem[]>([
    {
      id: 1,
      firstname: 'Romeaaaaaa',
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
  ]);

  return (
    <>
      <div className="form">
        <div className="row">
          <div className="row-item ">id</div>
          <div className="row-item">firstname</div>
          <div className="row-item">lastname</div>
          <div className="row-item">address</div>
        </div>
        {formArray.map((item: FormItem) => (
          <FormRow item={item} />
        ))}
      </div>
    </>
  );
};
export default Form;
