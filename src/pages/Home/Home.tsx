import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, Paper, TableHead, TableRow, TableCell, IconButton } from '@mui/material';
import Row from './Row';
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

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(data));
  }, [data]);

  const addRow = () => {
    const newRow: DataRow = {
      id: data.length + 1,
      name: '',
      age: 0,
      email: '',
    };
    setData([...data, newRow]);
  };

  const updateRow = (updatedRow: DataRow) => {
    const newData = data.map(item => item.id === updatedRow.id ? updatedRow : item);
    setData(newData);
    localStorage.setItem('tableData', JSON.stringify(newData));
  };

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}>Name</TableCell>
            <TableCell className={styles.tableHeaderCell}>Age</TableCell>
            <TableCell className={styles.tableHeaderCell}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} updateRow={updateRow} />
          ))}
          <TableRow>
            <TableCell colSpan={3} align="center">
              <IconButton onClick={addRow} className={styles.iconButton}>
                +
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
