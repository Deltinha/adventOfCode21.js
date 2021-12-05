import fs from 'fs';

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
let cardsLeft = cards.length;
let winnerCardIndex = -1;

while (cardsLeft > 1) {
  drawnNumbers.length = 0;
  numbers.every((number) => {
    winnerCardIndex = cards.findIndex((card) => {
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
    drawnNumbers.push(number);
    if (winnerCardIndex !== -1) {
      cards.splice(winnerCardIndex, 1);
      winnerCardIndex = -1;
      cardsLeft--;
      return false;
    }
    return true;
  });
}

const winnerCard = cards[0];

let unmarkedNumbersSum = 0;
winnerCard.forEach((line) => {
  for (let i = 0; i < line.length; i++) {
    if (!drawnNumbers.includes(line[i])) {
      unmarkedNumbersSum += line[i];
    }
  }
});

console.log(unmarkedNumbersSum * drawnNumbers.slice(-1));
