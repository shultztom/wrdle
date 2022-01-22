import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function WinnerDialog(props) {
  const { open, setIsWinner } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setIsWinner(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        🎉 Winner!! 🎉
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Congrats on guessing the word!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsWinner(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
