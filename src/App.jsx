import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import words from './words.json';
import utils from './utils';

const checkRowStatus = (pickedWord, row) => {
  // Three status
  /*
    G - green, it's the right letter in the right spot
    Y - yellow, the letter is in the word, but the wrong spot
    R - red, the letter is not in the word
  */

  const rowStatus = [
    '', '', '', '', '',
  ];

  // Check for Yellow
  // Do this first to overwrite if green
  for (let i = 0; i < 5; i++) {
    if (
      row[i] === pickedWord[0]
      || row[i] === pickedWord[1]
      || row[i] === pickedWord[2]
      || row[i] === pickedWord[3]
      || row[i] === pickedWord[4]

    ) {
      rowStatus[i] = 'Y';
    }
  }

  // Check for Green
  for (let i = 0; i < 5; i++) {
    if (pickedWord[i] === row[i]) {
      rowStatus[i] = 'G';
    }
  }

  // If any are left, they are not in it, so set Red
  for (let i = 0; i < 5; i++) {
    if (
      rowStatus[i] === ''
    ) {
      rowStatus[i] = 'R';
    }
  }

  return rowStatus;
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
) => {
  const { value } = e.target;
  // Validate value is letter
  if (!(/[a-zA-Z]/).test(value)) {
    // TODO error handle?
    return;
  }
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
  newRows[y][x] = newValue.toUpperCase();

  setRows(newRows);

  // TODO focus on next element

  const row = newRows[y];
  let newRowStatus = null;
  if (x === 4) {
    newRowStatus = checkRowStatus(pickedWord, row);
  }

  if (newRowStatus) {
    if (newRowStatus.join('') === 'GGGGG') {
      console.log('WINNER');
    } else {
      console.log('LOSER');
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
