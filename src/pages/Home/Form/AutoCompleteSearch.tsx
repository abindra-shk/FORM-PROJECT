import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormItem } from '../../../interface/interface';

interface AutoCompleteSearchProps {
  formArray: FormItem[];
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({ formArray }) => {
  const [options, setOptions] = React.useState<{ label: string; name: string; ratePerHour: number }[]>([]);

  React.useEffect(() => {
    const formattedOptions = formArray
      .map((item) => ({
        label: `${item.name} (${item.ratePerHour} $/hr)`,
        name: item.name,
        ratePerHour: item.ratePerHour,
      }))
      .sort((a, b) => b.ratePerHour - a.ratePerHour);
    setOptions(formattedOptions);
  }, [formArray]);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault()
    const filteredOptions = formArray
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({
        label: `${item.name} (${item.ratePerHour} $/hr)`,
        name: item.name,
        ratePerHour: item.ratePerHour,
      }))
      .sort((a, b) => b.ratePerHour - a.ratePerHour);

    setOptions(filteredOptions);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      onInputChange={(_, value) => handleInputChange(_, value)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default AutoCompleteSearch;
