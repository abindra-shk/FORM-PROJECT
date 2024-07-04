import React from "react";
// import styles from "./Home.module.css";
import {
  DialogOverlay,
  Dialog,
  DialogActions,
  Button
} from "./Row/Home.style";

interface ConfirmDialogProps {
  open: boolean;
  // onClick: () => void;
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
    <DialogOverlay>
      <Dialog>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this row?</p>
        <DialogActions>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </DialogOverlay>
  );
};

export default ConfirmDialog;
