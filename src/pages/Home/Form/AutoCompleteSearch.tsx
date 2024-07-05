import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormItem } from '../../../interface/interface';

interface AutoCompleteSearchProps {
  formArray: FormItem[];
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({ formArray }) => {
  const [options, setOptions] = React.useState<FormItem[]>(formArray);

  React.useEffect(() => {
    setOptions(formArray);
  }, [formArray]);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault()
    const filteredOptions = formArray
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => b.ratePerHour - a.ratePerHour);

    setOptions(filteredOptions);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      onInputChange={(event, value) => handleInputChange(event, value)}
      renderOption={(props, option) => (
        <li {...props}>
          {option.name} (
          <span style={{ color: 'green' }}>{option.ratePerHour} $/hr</span> )
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Search..." />}
    />
  );
};

export default AutoCompleteSearch;
