import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styles from './Home.module.css';

interface DataRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

const initialData: DataRow[] = [
  { id: 1, name: 'Ram Adhikari', age: 10, email: 'ram@gmail.com' },
  { id: 2, name: 'Sita Nepal', age: 19, email: 'sita@gmail.com' },
  { id: 3, name: 'Hari Kc', age: 80, email: 'Hari@gmail.com' },
];

const Home: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(() => {
    const savedData = localStorage.getItem('tableData');
    return savedData ? JSON.parse(savedData) : initialData;
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<DataRow | null>(null);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(data));
  }, [data]);

  const handleEdit = (row: DataRow) => {
    setEditingId(row.id);
    setEditingData({ ...row });
  };

  const handleSave = () => {
    if (editingData) {
      setData(data.map(item => item.id === editingData.id ? editingData : item));
      setEditingId(null);
      setEditingData(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingData) {
      const { name, value } = event.target as HTMLInputElement;
      setEditingData({ ...editingData, [name]: name === 'age' ? +value : value });
    }
  };

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCell}>Name</TableCell>
            <TableCell className={styles.tableCell}>Age</TableCell>
            <TableCell className={styles.tableCell}>Email</TableCell>
            <TableCell className={styles.tableCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={styles.tableCell}>
                {editingId === row.id ? (
                  <TextField
                    name="name"
                    value={editingData?.name || ''}
                    onChange={handleChange}
                    className={styles.textField}
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell className={styles.tableCell}>
                {editingId === row.id ? (
                  <TextField
                    name="age"
                    type="number"
                    value={editingData?.age || ''}
                    onChange={handleChange}
                    className={styles.textField}
                  />
                ) : (
                  row.age
                )}
              </TableCell>
              <TableCell className={styles.tableCell}>
                {editingId === row.id ? (
                  <TextField
                    name="email"
                    value={editingData?.email || ''}
                    onChange={handleChange}
                    className={styles.textField}
                  />
                ) : (
                  row.email
                )}
              </TableCell>
              <TableCell className={styles.tableCell}>
                {editingId === row.id ? (
                  <IconButton onClick={handleSave} className={styles.iconButton}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleEdit(row)} className={styles.iconButton}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
