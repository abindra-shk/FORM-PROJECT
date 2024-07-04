import React, { useState, useEffect } from "react";
import styles from "../Home.module.css";
import Items from "./EditableItem";
import EditableEmailItems from "./EditableEmailItem";
import ConfirmDialog from "../ConfirmDialog";
import { FormItem } from "../../../interface/index";
import CurrentField from "./CurrencyField";
import { Button, TableCell,TableRow } from "./Home.style";
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



  const handleFieldUpdate = async (record: {
    ratePerHour: number;
    hours: number;
    total: number;
  }) => {
    const updatedRow = { ...rowData, ...record };

    setRowData(updatedRow);
    if (record.ratePerHour == 0 && record.hours == 0 && record.total == 0) {
      return;
    }
    await updateRow(updatedRow);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    const updatedValue = ["ratePerHour", "hours"].includes(name)
      ? +value
      : value;
    const updatedRow = { ...rowData, [name]: updatedValue };
  
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
 <TableRow>


      <TableCell>{index + 1}
      </TableCell>
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
      <EditableEmailItems
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
      

      <CurrentField
        ratePerHour={rowData.ratePerHour || 0}
        hours={rowData.hours || 0}
        total={rowData.total || 0}
        onFieldUpdate={handleFieldUpdate}
      />

    
<TableCell>
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
        </TableCell>
        </TableRow>
    
  );
};

export default Row;
