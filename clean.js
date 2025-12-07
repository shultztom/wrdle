const data = require('./src/words.json');

const clean = [];
for (const d of data) {
  const last = d.slice(-1);
  const lastTwo = d.slice(d.length - 2);
  if (last === 'S' && lastTwo !== 'SS') {
    continue;
  }
  clean.push(d);
}

const fs = require('fs');

const dataStr = JSON.stringify(clean);
fs.writeFileSync('wordsCleaned.json', dataStr);
