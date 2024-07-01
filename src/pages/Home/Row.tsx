

import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Items from "./Items";
import ConfirmDialog from "./ConfirmDialog";
import { FormItem } from "../../interface/index"; 

interface RowProps {
  row: FormItem;
  index: number;
  updateRow: (updatedRow: FormItem) => Promise<void>;
  deleteRow: (id?: string) => Promise<void>;
}

const Row: React.FC<RowProps> = ({ row, index, updateRow, deleteRow }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [rowData, setRowData] = useState<FormItem>(row);
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
      console.log("Updating row with data:", rowData);
      await updateRow(rowData);
      console.log("Row updated successfully");
    } catch (error) {
      console.error("Error updating row:", error);
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
      console.error("Error deleting row:", error);
    }
    setOpen(false);
  };

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>{index + 1}</div>
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

                  