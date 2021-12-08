import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const inputLength = input.length;
  let median;
  let fuelCost = 0;

  if (inputLength % 2 !== 0) {
    median = input[Math.floor(inputLength / 2)];
  } else {
    median = (input[inputLength / 2 - 1] + input[inputLength / 2]) / 2;
  }

  for (const position of input) {
    fuelCost += Math.abs(median - position);
  }
  return fuelCost;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const sum = input.reduce((acc, cur) => acc + cur);
  const mean = sum / input.length;
  // The true solution is guaranteed to be within 0.5 of the mean
  // Just check the two possible integer results with Math.floor() and Math.ceil() on the next uncommented line
  // Take the one that minimizes fuelCost
  const roundedMean = Math.floor(mean);
  let fuelCost = 0;

  for (const position of input) {
    const distance = Math.abs(roundedMean - position);
    fuelCost += (distance * (distance + 1)) / 2;
  }
  return fuelCost;
};

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
      {
        input: `10,10,10,0,10,10,10,10,10,10`,
        expected: 10,
      },
      {
        input: `5,2,1,4,3`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: '',
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
