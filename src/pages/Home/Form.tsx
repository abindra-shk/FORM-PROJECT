import { useState } from 'react';

const Form = () => {
  const [formArray, setFormArray] = useState([
    { id: 1, name: 'Rome', email: 'rome@gmail.com' },
    { id: 2, name: 'Romey', email: 'romey@gmail.com' },
  ]);

  return (
    <div >
      {formArray.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
export default Form;
