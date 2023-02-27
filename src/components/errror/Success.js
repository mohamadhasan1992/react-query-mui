import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Success({detail}) {


  const [open, setOpen] = React.useState(true);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle color="green">congratulation!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {detail}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}