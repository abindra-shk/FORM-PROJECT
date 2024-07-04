import React, { useRef, useState } from "react";
import styles from "../Home.module.css";
import { InputField, TableCell } from "./Home.style";
// import EditableEmailItems from "./EditableEmailItem";
interface ItemsProps {
  name: string;
  value: string | number;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  setEditingField: (field: string | null) => void;
}

const Items: React.FC<ItemsProps> = ({
  name,
  value,
  isEditing,
  handleChange,
  handleBlur,
  setEditingField,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);


  //   if (isEditing) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     inputRef.current?.focus();
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isEditing]);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
  //     setEditingField(null);
  //     handleBlur();
  //   }
  // };

  const validateInput = (value: string | number) => {
    let errorMessage = null;
    if (name === "firstName" && !value) {
      errorMessage = "First Name is required";
    } else if (name === "lastName" && !value) {
      errorMessage = "Last Name is required";
    } else if (
      ["ratePerHour", "hours"].includes(name) &&
      isNaN(Number(value))
    ) {
      errorMessage = "Value must be a number";
    } 

 
    setError(errorMessage);
    return errorMessage === null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateInput((event.target as HTMLInputElement).value)){
      handleChange(event);
    }
  };

  return (

      <TableCell   onClick={() => name !== "_id" && setEditingField(name)}>
      {isEditing && name !== "_id" ? (
        <div>
        <InputField
            ref={inputRef}
            name={name}
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>
      ) : (
        value
      )}
   
    </TableCell>
  );
};

export default Items;
