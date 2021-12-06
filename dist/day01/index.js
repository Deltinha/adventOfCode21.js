import run from "aocrunner";
const parseInput = (rawInput) => rawInput;
const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/g).map(Number);
  let n = 0;
  for (let i = 1; i <= input.length; i++) {
    if (input[i] > input[i - 1]) {
      n++;
    }
  }
  return n;
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/g).map(Number);
  let n = 0;
  function getLastThreeSum(i) {
    return input[i] + input[i - 1] + input[i - 2];
  }
  for (let i = 3; i <= input.length; i++) {
    if (getLastThreeSum(i) > getLastThreeSum(i - 1)) {
      n++;
    }
  }
  return n;
};
run({
  part1: {
    tests: [],
    solution: part1
  },
  part2: {
    tests: [],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
});
