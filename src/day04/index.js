import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split(/\n\n/g)
    .map((line) =>
      line
        .replace(/[\n,]/g, " ")
        .replace(/  +/g, " ")
        .trim()
        .split(" ")
        .map((n) => Number(n)),
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

  return unmarkedNumbersSum * drawnNumbers.slice(-1);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split(/\n\n/g)
    .map((line) =>
      line
        .replace(/[\n,]/g, " ")
        .replace(/  +/g, " ")
        .trim()
        .split(" ")
        .map((n) => Number(n)),
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

  return unmarkedNumbersSum * drawnNumbers.slice(-1);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
