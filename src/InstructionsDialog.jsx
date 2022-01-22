import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function WinnerDialog(props) {
  const {
    showInstructions, setShowInstructions,
  } = props;
  return (
    <Dialog
      open={showInstructions}
      onClose={() => setShowInstructions(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        How to Play
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Try to guess the word in 6 tries!
          {' '}
          <br />
          <br />
        </DialogContentText>
        <DialogContentText>
          Unlike WORDLE, your guess does not have to be a real word
          {' '}
          <br />
          <br />
        </DialogContentText>
        <DialogContentText>
          After each guess,
          the color of the tiles will change to show how close your guess was to the word:
          {' '}
          <br />
          <br />
        </DialogContentText>
        <DialogContentText>
          Green: You got the right letter in the right spot!
        </DialogContentText>
        <DialogContentText>
          Yellow: The letter is in the word, but not the right spot
        </DialogContentText>
        <DialogContentText>
          Gray: The letter is not in the word
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowInstructions(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
