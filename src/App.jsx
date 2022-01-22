import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
} from '@mui/material';

const handleLetterEnter = (e, rows, setRows, guessAttempt) => {
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
  // eslint-disable-next-line no-plusplus
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
};

function gameBox(rows, setRows, guessAttempt, setGuessAttempt) {
  return (
    rows.map((row, index) => (
      <Grid container>
        <Grid item xs={1} />

        {row.map((r, i) => (
          <Grid item xs={2} padding={1}>
            <TextField
              name={`${i};${index}`}
              id={`${i};${index}`}
              variant="outlined"
              value={r}
              onChange={(e) => handleLetterEnter(e, rows, setRows, guessAttempt)}
            />
          </Grid>
        ))}

        <Grid item xs={1} />
      </Grid>
    ))
  );
}

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

      {gameBox(rows, setRows, guessAttempt, setGuessAttempt)}

    </Container>

  );
}

export default App;
