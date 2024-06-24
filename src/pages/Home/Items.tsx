import React from 'react';
import { TableCell, TextField } from '@mui/material';
import styles from './Home.module.css';

interface DataRow {
  id: string;
  name: string;
  age: number;
  email: string;
}

interface ItemsProps {
  rowData: DataRow;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: () => void;
}

const Items: React.FC<ItemsProps> = ({ rowData, isEditing, handleChange, handleEdit }) => {
  return (
    <>
      <TableCell className={styles.tableCell} onClick={handleEdit}>
        {isEditing ? (
          <TextField
            name="name"
            value={rowData.name}
            onChange={handleChange}
            className={styles.textField}
            autoFocus
          />
        ) : (
          rowData.name
        )}
      </TableCell>
      <TableCell className={styles.tableCell} onClick={handleEdit}>
        {isEditing ? (
          <TextField
            name="age"
            type="number"
            value={rowData.age}
            onChange={handleChange}
            className={styles.textField}
            autoFocus
          />
        ) : (
          rowData.age
        )}
      </TableCell>
      <TableCell className={styles.tableCell} onClick={handleEdit}>
        {isEditing ? (
          <TextField
            name="email"
            value={rowData.email}
            onChange={handleChange}
            className={styles.textField}
            autoFocus
          />
        ) : (
          rowData.email
        )}
      </TableCell>
    </>
  );
};

export default Items;
