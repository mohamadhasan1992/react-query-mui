import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Error({detail}) {

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>Oops!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {detail}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}