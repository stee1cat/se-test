const fs = require('fs');
const path = require('path');

const USERS_COUNT = 10;
const TOPICS_COUNT = 20;

function randomInt(min, max) {
  const diff = max - min;

  return Math.floor(Math.floor(Math.random() * (diff + 1)) + min);
}

function toDatetime(date) {
  const p = number => `${number}`.padStart(2, '0');
  const formattedDate = `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
  const formattedTime = `${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`;

  return `${formattedDate} ${formattedTime}`;
}

function saveCsv(data, fileName) {
  const csvData = data.map(u => u.join(';'))
    .join("\n");
  const outputDir = path.resolve(__dirname, 'dist');
  const outputFile = path.resolve(outputDir, `${fileName}.csv`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputFile, csvData);
}

module.exports = {
  USERS_COUNT,
  TOPICS_COUNT,
  toDatetime,
  saveCsv,
  randomInt
};
