import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split(",").map(Number);

const part1 = (rawInput) => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let input = parseInput(rawInput);
  const dayLimit = 80;
  const fishesByGeneration = new Array(9).fill(0);
  input.map((fish) => {
    fishesByGeneration[fish] += 1;
  });
  for (let day = 1; day <= dayLimit; day++) {
    const timerZero = fishesByGeneration.shift();
    fishesByGeneration[6] += timerZero;
    fishesByGeneration.push(timerZero);
  }
  return fishesByGeneration.reduce(reducer);
};

const part2 = (rawInput) => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let input = parseInput(rawInput);
  const dayLimit = 256;
  const fishesByGeneration = new Array(9).fill(0);
  input.map((fish) => {
    fishesByGeneration[fish] += 1;
  });
  for (let day = 1; day <= dayLimit; day++) {
    const timerZero = fishesByGeneration.shift();
    fishesByGeneration[6] += timerZero;
    fishesByGeneration.push(timerZero);
  }
  return fishesByGeneration.reduce(reducer);
};

run({
  part1: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 5934,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 26984457539,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
