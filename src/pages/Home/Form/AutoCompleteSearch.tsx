import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormItem } from '../../../interface/interface';

interface AutoCompleteSearchProps {
  formArray: FormItem[];
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({
  formArray,
}) => {
  const [options, setOptions] = React.useState<FormItem[]>(formArray);

  React.useEffect(() => {
    setOptions(formArray);
  }, [formArray]);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault();
    const filteredOptions = formArray.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default AutoCompleteSearch;
