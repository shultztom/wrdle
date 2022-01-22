const fs = require('fs');

console.log('INFO: Starting to read data');

fs.readFile('popular.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const words = [];
  const lineData = data.toString().split('\n');
  for (let i = 0; i < lineData.length; i++) {
    if (lineData[i].length === 5) {
      words.push(lineData[i].toUpperCase());
    }
  }
  const jsonContent = JSON.stringify(words);

  fs.writeFile('./src/words.json', jsonContent, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('INFO: words.json was saved!');
  });
});
