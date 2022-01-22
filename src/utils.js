const getRandomInt = (min, max) => {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

export default {
  getRandomInt,
  checkRowStatus,
};
