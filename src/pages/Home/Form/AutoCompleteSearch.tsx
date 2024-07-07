import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormItem } from "../../../interface/interface";

interface AutoCompleteSearchProps {
  formArray: FormItem[];
  onInputChange: (value: string) => void;
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({
  formArray,
  onInputChange,
}) => {
  const [options, setOptions] = React.useState<FormItem[]>(formArray);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault();
    const filteredOptions = formArray.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(filteredOptions);
    onInputChange(value);
  };

  React.useEffect(() => {
    setOptions(formArray);
  }, [formArray]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      sx={{ width: 300 }}
      onInputChange={(event, value) => handleInputChange(event, value)}
      renderOption={(props, option) => (
        <li {...props} key={option._id}>
          {option.name} (
          <span style={{ color: "green" }}>{option.ratePerHour} $/hr</span>)
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Search..." />}
    />
  );
};

export default AutoCompleteSearch;
