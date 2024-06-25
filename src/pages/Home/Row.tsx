import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Items from './Items';

interface DataRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface RowProps {
  row: DataRow;
  updateRow: (row: DataRow) => void;
  deleteRow: (id: number) => void;
}

const Row: React.FC<RowProps> = ({ row, updateRow, deleteRow }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [rowData, setRowData] = useState(row);

  useEffect(() => {
    setRowData(row);
  }, [row]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRowData({ ...rowData, [name]: name === 'age' || name === 'id' ? +value : value });
  };

  const handleBlur = () => {
    updateRow(rowData);
    setEditingField(null);
  };

  return (
    <div className={styles.tableRow}>
      <Items
        name="id"
        value={rowData.id}
        isEditing={editingField === 'id'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="name"
        value={rowData.name}
        isEditing={editingField === 'name'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="age"
        value={rowData.age}
        isEditing={editingField === 'age'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="email"
        value={rowData.email}
        isEditing={editingField === 'email'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <div className={styles.tableCell}>
        <button onClick={() => deleteRow(row.id)} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default Row;
