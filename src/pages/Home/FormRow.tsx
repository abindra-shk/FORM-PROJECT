import { FormItem } from '../../interface/interface';

const FormRow = ({ item }: { item: FormItem }) => {
  return (
    <div className="row">
      <div className='row-item'>{item.id}</div>
      <div className='row-item'>{item.firstname}</div>
      <div className='row-item'>{item.lastname}</div>
      <div className='row-item'>{item.address}</div>
    </div>
  );
};

export default FormRow;
