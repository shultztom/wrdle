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

  // Get count of each letter
  const letterCount = [...pickedWord].reduce((a, e) => {
    // eslint-disable-next-line no-param-reassign
    a[e] = a[e] ? a[e] + 1 : 1;
    return a;
  }, {});

  // Keep count of each letter match for yellows
  const guessLetterCount = {};

  // Check for Green
  for (let i = 0; i < 5; i++) {
    if (pickedWord[i] === row[i]) {
      rowStatus[i] = 'G';

      if (guessLetterCount[row[i]]) {
        guessLetterCount[row[i]] += 1;
      } else {
        guessLetterCount[row[i]] = 1;
      }
    }
  }

  // Check for Yellow
  for (let i = 0; i < 5; i++) {
    if (
      row[i] === pickedWord[0]
        || row[i] === pickedWord[1]
        || row[i] === pickedWord[2]
        || row[i] === pickedWord[3]
        || row[i] === pickedWord[4]

    ) {
      // Ensure we only have as many yellows as in letter if not in word
      if (guessLetterCount[row[i]]) {
        // if counts are the same, leave gray
        if (guessLetterCount[row[i]] === letterCount[row[i]]) {
          // do nothing
        } else {
          // Don't overwrite green, but set yellow if needed
          // eslint-disable-next-line no-lonely-if
          if (pickedWord[i] !== row[i]) {
            rowStatus[i] = 'Y';
            guessLetterCount[row[i]] += 1;
          }
        }
      } else {
        guessLetterCount[row[i]] = 1;
        rowStatus[i] = 'Y';
      }
    }
  }

  // If any are left, they are not in it, so set Gray
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
