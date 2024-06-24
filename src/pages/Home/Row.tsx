import React, { useState } from 'react';
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
}

const Row: React.FC<RowProps> = ({ row, updateRow }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [rowData, setRowData] = useState(row);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRowData({ ...rowData, [name]: name === 'age' || name === 'id' ? +value : value });
  };

  const handleEdit = () => {
    if (editingField) {
      updateRow(rowData);
      setEditingField(null);
    }
  };

  return (
    <div className={styles.tableRow} onBlur={handleEdit}>
      <Items
        name="id"
        value={rowData.id}
        isEditing={editingField === 'id'}
        handleChange={handleChange}
        setEditingField={setEditingField}
      />
      <Items
        name="name"
        value={rowData.name}
        isEditing={editingField === 'name'}
        handleChange={handleChange}
        setEditingField={setEditingField}
      />
      <Items
        name="age"
        value={rowData.age}
        isEditing={editingField === 'age'}
        handleChange={handleChange}
        setEditingField={setEditingField}
      />
      <Items
        name="email"
        value={rowData.email}
        isEditing={editingField === 'email'}
        handleChange={handleChange}
        setEditingField={setEditingField}
      />
    </div>
  );
};

export default Row;
