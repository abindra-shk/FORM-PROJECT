import React from "react";
import styles from "./Home.module.css";

interface ConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  if (!open) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this row?</p>
        <div className={styles.dialogActions}>
          <button onClick={handleClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
