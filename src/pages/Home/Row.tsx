import React, { useState, useRef, useEffect } from 'react';
import { TableRow } from '@mui/material';
import Items from './Items';
import styles from './Home.module.css';

interface DataRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface RowProps {
  row: DataRow;
  updateRow: (row: DataRow) => void;
}

const Row: React.FC<RowProps> = ({ row, updateRow }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(row);
  const rowRef = useRef<HTMLTableRowElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (rowRef.current && !rowRef.current.contains(event.target as Node)) {
      saveChanges();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    updateRow(rowData);
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRowData({ ...rowData, [name]: name === 'age' ? +value : value });
  };

  return (
    <TableRow ref={rowRef} className={styles.row}>
      <Items
        rowData={rowData}
        isEditing={isEditing}
        handleChange={handleChange}
        handleEdit={handleEdit}
      />
    </TableRow>
  );
};

export default Row;
