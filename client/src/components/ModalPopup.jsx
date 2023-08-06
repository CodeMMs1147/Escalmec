import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

const ModalPopup = ({ 
  text,
  open,
  openChange,
}) => {

  [open, openChange] = useState(false);

  const openPopUp = () => {
    openChange(true);
  }

  const closePopUp = () => {
    openChange(false);
  }

  useEffect((state) => {
    if(state){
      openChange(true);
    } else {
      openChange(false);
    }
  }, [open])

  return ( 
    <div style={{ textAlign: 'center'}}>
      <Dialog open={open} onClose={closePopUp}>
        <DialogTitle>User screen</DialogTitle>
        <DialogContent>
          <DialogContentText>This screen about Userdetails</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalPopup;