import React, { useEffect, useRef, useState } from "react";
import styles from "../Home.module.css";
import { InputField, TableCell } from "./Home.style";


interface ItemsProps {
  name: string;
  value: string;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  setEditingField: (field: string | null) => void;
}

const EditableEmailItems: React.FC<ItemsProps> = ({
  name,
  value,
  isEditing,
  handleChange,
  handleBlur,
  setEditingField,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [localValue, setLocalValue] = useState<string>();

  useEffect(() => {
    setLocalValue(value);
  }, []);

  const validateEmailInput = (value: string | number) => {
    let errorMessage = null;
    if (name === "email" && !/\S+@\S+\.\S+/.test(value.toString())) {
      errorMessage = "Email is invalid";
    }
    setError(errorMessage);
    return errorMessage === null;
  };

  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateEmailInput((event.target as HTMLInputElement).value)) {
      handleChange(event);
    }
  };

  return (


      <TableCell  onClick={() => name !== "_id" && setEditingField(name)}>
      {isEditing && name !== "_id" ? (
        <div>

         <InputField
            ref={inputRef}
            name={name}
            value={value}
            onChange={handleEmailInputChange}

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

export default EditableEmailItems;
