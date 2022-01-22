import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import words from './words.json';
import utils from './utils';

const getBackgroundColor = (i, index, rowStatus) => {
  if (rowStatus[index][i] === '') {
    return 'gray';
  }
  if (rowStatus[index][i] === 'G') {
    return 'green';
  }
  if (rowStatus[index][i] === 'Y') {
    return 'yellow';
  }
  return 'red';
};

const handleLetterEnter = (
  e,
  rows,
  setRows,
  guessAttempt,
  setGuessAttempt,
  pickedWord,
  rowStatus,
  setRowStatus,
  setFocusId,
) => {
  const { value } = e.target;
  // index should be x;y as string, with both values starting at 0 in top left corner
  const index = e.target.name;
  const x = parseInt(index.split(';')[0], 10);
  const y = parseInt(index.split(';')[1], 10);

  // Validate correct row is being entered
  if (guessAttempt !== y) {
    // TODO error handle?
    return;
  }

  // Validate correct space in row is being entered
  for (let i = x; i >= 0; i--) {
    if (rows[guessAttempt][i - 1] === '' && x !== 0) {
      // TODO error handle?
      return;
    }
  }

  // Set new state
  const newRows = [...rows];
  // Replace
  let newValue = value;
  if (newRows[y][x] !== '') {
    newValue = value.charAt(value.length - 1);
  }
  // Validate value is letter
  if (!(/[a-zA-Z]/).test(newValue)) {
    // TODO error handle?
    return;
  }
  newRows[y][x] = newValue.toUpperCase();

  setRows(newRows);

  // Handle Focus
  if (x !== 4) {
    setFocusId(`${x + 1};${y}`);
  } else if (x === 4) {
    setFocusId(`${0};${y + 1}`);
  }

  const row = newRows[y];
  let newRowStatus = null;

  // Only do after entering last item
  if (x === 4) {
    newRowStatus = utils.checkRowStatus(pickedWord, row);

    // Color Cells
    const newRowStatuses = [...rowStatus];
    newRowStatuses[y] = newRowStatus;
    setRowStatus(newRowStatuses);

    // Determine if winner
    if (newRowStatus.join('') === 'GGGGG') {
      console.log('WINNER');
    } else {
      // Move to next row and lock current row
      setGuessAttempt(guessAttempt + 1);
      console.log('LOSER');
      if (guessAttempt === 5) {
        // TODO overall loser message
      }
    }
  }
};

function App() {
  const [guessAttempt, setGuessAttempt] = useState(0);
  const [rows, setRows] = useState(
    [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
  );
  const wordIndex = utils.getRandomInt(0, words.length - 1);
  const [pickedWord, setPickedWord] = useState(words[wordIndex]);
  const [rowStatus, setRowStatus] = useState(
    [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
  );
  const [focusId, setFocusId] = useState('0;0');

  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        wrdle
      </Typography>

      <p>{pickedWord}</p>

      {rows.map((row, index) => (
        <Grid container>
          <Grid item xs={1} />

          {row.map((r, i) => (
            <Grid item xs={2} padding={1}>
              <TextField
                // eslint-disable-next-line consistent-return
                inputRef={(input) => {
                  if (input) {
                    if (focusId === input.id) {
                      return input && input.focus();
                    }
                  }
                }}
                sx={{
                  backgroundColor: getBackgroundColor(i, index, rowStatus),
                }}
                name={`${i};${index}`}
                id={`${i};${index}`}
                variant="outlined"
                value={r}
                onChange={(e) => handleLetterEnter(
                  e,
                  rows,
                  setRows,
                  guessAttempt,
                  setGuessAttempt,
                  pickedWord,
                  rowStatus,
                  setRowStatus,
                  setFocusId,
                )}
              />
            </Grid>
          ))}

          <Grid item xs={1} />
        </Grid>
      ))}

    </Container>

  );
}

export default App;
