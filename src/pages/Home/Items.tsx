// Items.tsx
import React, { useRef, useEffect, useState } from 'react';
import styles from './Home.module.css';

interface ItemsProps {
  name: string;
  value: string | number;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  setEditingField: (field: string | null) => void;
}

const Items: React.FC<ItemsProps> = ({ name, value, isEditing, handleChange, handleBlur, setEditingField }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setEditingField(null);
      handleBlur();
    }
  };

  const validateInput = (value: string | number) => {
    let errorMessage = null;
    if (name === 'firstName' && !value) {
      errorMessage = 'First Name is required';
    } else if (name === 'lastName' && !value) {
      errorMessage = 'Last Name is required';
    } else if (['ratePerHour', 'hours', 'id'].includes(name) && isNaN(Number(value))) {
      errorMessage = 'Value must be a number';
    } else if (['ratePerHour', 'hours', 'id'].includes(name) && Number(value) <= 0) {
      errorMessage = 'Value must be a positive number';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value.toString())) {
      errorMessage = 'Email is invalid';
    }
    setError(errorMessage);
    return errorMessage === null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateInput((event.target as HTMLInputElement) .value)) {
      handleChange(event);
    }
  };

  return (
    <div className={styles.tableCell} onClick={() => setEditingField(name)}>
      {isEditing ? (
        <div>
          <input
            ref={inputRef}
            name={name}
            value={value}
            onChange={handleInputChange}
            className={styles.inputField}
            onBlur={handleBlur}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>
      ) : (
        value
      )}
    </div>
  );
};

export default Items;
