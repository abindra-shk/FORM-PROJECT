import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Items from "./Items";
import ConfirmDialog from "./ConfirmDialog";

interface DataRow {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  ratePerHour: number;
  hours: number;
  total: number;
}

interface RowProps {
  row: DataRow;
  updateRow: (updatedRow: DataRow) => Promise<void>;
  deleteRow: (id: string) => Promise<void>;
}

const Row: React.FC<RowProps> = ({ row, updateRow, deleteRow }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [rowData, setRowData] = useState<DataRow>(row);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRowData(row);
  }, [row]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    const updatedValue = ["ratePerHour", "hours"].includes(name) ? +value : value;
    const updatedRow = { ...rowData, [name]: updatedValue };
    if (name === "ratePerHour" || name === "hours") {
      updatedRow.total = updatedRow.ratePerHour * updatedRow.hours;
    }
    setRowData(updatedRow);
  };

  const handleBlur = async () => {
    try {
      await updateRow(rowData);
    } catch (error) {
      console.error("Error updating row", error);
    }
    setEditingField(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await deleteRow(row._id);
    } catch (error) {
      console.error("Error deleting row", error);
    }
    setOpen(false);
  };

  return (
    <div className={styles.tableRow}>
      <Items
        name="_id"
        value={rowData._id}
        isEditing={editingField === "_id"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="firstName"
        value={rowData.firstName}
        isEditing={editingField === "firstName"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="lastName"
        value={rowData.lastName}
        isEditing={editingField === "lastName"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="email"
        value={rowData.email}
        isEditing={editingField === "email"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="address"
        value={rowData.address}
        isEditing={editingField === "address"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="ratePerHour"
        value={rowData.ratePerHour}
        isEditing={editingField === "ratePerHour"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <Items
        name="hours"
        value={rowData.hours}
        isEditing={editingField === "hours"}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setEditingField={setEditingField}
      />
      <div className={styles.tableCell}>{rowData.total}</div>
      <div className={styles.tableCell}>
        <button onClick={handleClickOpen} className={styles.deleteButton}>
          Delete
        </button>
        {open && (
          <ConfirmDialog
            open={open}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Row;
