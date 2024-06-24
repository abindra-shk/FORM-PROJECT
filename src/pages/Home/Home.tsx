import React, { useState, useEffect } from 'react';
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
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={styles.tableRow}>
            <div className={styles.tableHeaderCell}>ID</div>
            <div className={styles.tableHeaderCell}>Name</div>
            <div className={styles.tableHeaderCell}>Age</div>
            <div className={styles.tableHeaderCell}>Email</div>
          </div>
        </div>
        <div className={styles.tableBody}>
          {data.map((row) => (
            <Row key={row.id} row={row} updateRow={updateRow} />
          ))}
          <div className={styles.tableRow}>
            <div className={styles.tableCell} style={{ textAlign: 'center' }}>
              <button onClick={addRow} className={styles.addButton}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
