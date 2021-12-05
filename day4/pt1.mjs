import fs from 'fs';
import { format } from 'path/posix';

const input = fs
  .readFileSync('day4/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n\n/g)
  .map((line) =>
    line
      .replace(/[\n,]/g, ' ')
      .replace(/  +/g, ' ')
      .trim()
      .split(' ')
      .map((n) => Number(n))
  );

const [numbers, ...cardArrays] = input;

function splitIntoChunks(inputArray) {
  var result = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 5);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  return result;
}

const cards = cardArrays.map((card) => splitIntoChunks(card));

const drawnNumbers = [];
let winnerCard;
numbers.every((number) => {
  drawnNumbers.push(number);
  winnerCard = cards.find((card) => {
    let lineCount = 0;
    for (let i = 0; i < card.length; i++) {
      for (let j = 0; j < card.length; j++) {
        if (drawnNumbers.includes(card[i][j])) {
          lineCount++;
        }
        if (lineCount === 5) {
          return true;
        }
      }
      lineCount = 0;
    }
    for (let i = 0; i < card.length; i++) {
      for (let j = 0; j < card.length; j++) {
        if (drawnNumbers.includes(card[j][i])) {
          lineCount++;
        }
        if (lineCount === 5) {
          return true;
        }
      }
      lineCount = 0;
    }
  });
  if (winnerCard) return false;
  else return true;
});

let unmarkedNumbersSum = 0;
winnerCard.forEach((line) => {
  for (let i = 0; i < line.length; i++) {
    if (!drawnNumbers.includes(line[i])) {
      unmarkedNumbersSum += line[i];
    }
  }
});

console.log(unmarkedNumbersSum * drawnNumbers.slice(-1));
