import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split(",").map(Number);

const part1 = (rawInput) => {
  const fishes = parseInput(rawInput);
  const dayLimit = 80;
  for (let day = 1; day <= dayLimit; day++) {
    const newborn = [];
    fishes.forEach((fish, index) => {
      if (fish === 0) {
        fishes[index] = 6;
        newborn.push(8);
      } else {
        fishes[index] = fish -= 1;
      }
    });
    fishes.push(...newborn);
  }
  return fishes.length;
};

const part2 = (rawInput) => {
  let fishes = parseInput(rawInput);
  const dayLimit = 256;
  for (let day = 1; day <= dayLimit; day++) {
    console.log(day);
    const newborn = [];
    fishes.forEach((fish, index) => {
      if (fish === 0) {
        fishes[index] = 6;
        newborn.push(8);
      } else {
        fishes[index] = fish -= 1;
      }
    });
    fishes = [...fishes, ...newborn];
    console.log(fishes.length);
  }

  return fishes.length;
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
  onlyTests: true,
});
