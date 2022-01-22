import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function WinnerDialog(props) {
  const {
    open, setIsLoser, pickedWord,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setIsLoser(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Try Again!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Too bad! Better luck next time! The word was
          {' '}
          {pickedWord}
          !
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsLoser(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
