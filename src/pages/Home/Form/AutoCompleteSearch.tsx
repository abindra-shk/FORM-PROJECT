import React, { useEffect, useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormItem } from "../../../interface/interface";
import { debounce } from "@mui/material";

interface AutoCompleteSearchProps {
  formArray: FormItem[];
  onInputChange: (value: string) => void;
  onAddRecord: (value: string) => void;
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({
  formArray,
  onInputChange,
  onAddRecord,
}) => {
  const [options, setOptions] = useState<FormItem[]>(formArray);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault();
    setInputValue(value);
    debouncedInputChange(value);
  };

  const debouncedInputChange = useCallback(
    debounce((value: string) => {
      const filteredOptions = formArray.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setOptions(filteredOptions);

      if (filteredOptions.length === 0 && value.trim() !== "") {
        setOptions([
          {
            name: `${value}`,
            _id: "add",
            ratePerHour: 500,
            email: "",
            address: "",
            hours: 0,
            total: 0,
            startDate: null,
            endDate: null,
            days: 0,
          },
          ...filteredOptions,
        ]);
      }

      onInputChange(value);
    }, 500),
    [formArray]
  );

  useEffect(() => {
    setOptions(formArray);
  }, [formArray]);

  const handleOptionSelect = (
    event: React.SyntheticEvent,
    value: FormItem | null
  ) => {
    event.preventDefault();
    if (value && value._id === "add") {
      onAddRecord(inputValue);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      size="small"
      sx={{
        width: 300,
        backgroundColor: "#1c1f26",
        borderRadius:'10px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
        }
      }}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      renderOption={(props, option) => (
        <li {...props} key={option._id}>
          {option.name}{" "}
          {option._id === "add"
            ? "(Add New Record)"
            : `(${option.ratePerHour} $/hr)`}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Search..." />}
    />
  );
};

export default AutoCompleteSearch;
