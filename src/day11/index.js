import run from "aocrunner";
import { join } from "path/posix";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split("").map(Number));

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);
  const maxStep = 100;
  let flashesCount = 0;
  function calculateFlashes({ x, y }) {
    function isInsideGrid({ x, y }) {
      return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
    }

    if (!isInsideGrid({ x, y })) return;

    if (grid[y][x] === 0) return;

    grid[y][x] += 1;

    if (grid[y][x] > 9) {
      flashesCount += 1;
      grid[y][x] = 0;
      calculateFlashes({ y: y + 1, x: x - 1 });
      calculateFlashes({ y: y + 1, x });
      calculateFlashes({ y: y + 1, x: x + 1 });
      calculateFlashes({ y, x: x - 1 });
      calculateFlashes({ y, x: x + 1 });
      calculateFlashes({ y: y - 1, x: x - 1 });
      calculateFlashes({ y: y - 1, x });
      calculateFlashes({ y: y - 1, x: x + 1 });
    }
  }
  for (let step = 0; step < maxStep; step++) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        grid[y][x] += 1;
      }
    }

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        if (grid[y][x] > 9) {
          calculateFlashes({ y, x });
        }
      }
    }
  }
  return flashesCount;
};

const part2 = (rawInput) => {
  const grid = parseInput(rawInput);
  const gridSize = 100;

  const maxStep = 1000;

  function calculateFlashes({ x, y }) {
    function isInsideGrid({ x, y }) {
      return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
    }

    if (!isInsideGrid({ x, y })) return;

    if (grid[y][x] === 0) return;

    grid[y][x] += 1;

    if (grid[y][x] > 9) {
      grid[y][x] = 0;
      calculateFlashes({ y: y + 1, x: x - 1 });
      calculateFlashes({ y: y + 1, x });
      calculateFlashes({ y: y + 1, x: x + 1 });
      calculateFlashes({ y, x: x - 1 });
      calculateFlashes({ y, x: x + 1 });
      calculateFlashes({ y: y - 1, x: x - 1 });
      calculateFlashes({ y: y - 1, x });
      calculateFlashes({ y: y - 1, x: x + 1 });
    }
  }
  for (let step = 1; step <= maxStep; step++) {
    let zeroesCount = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        grid[y][x] += 1;
      }
    }

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        if (grid[y][x] > 9) {
          calculateFlashes({ y, x });
        }
      }
    }
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        if (grid[y][x] === 0) {
          zeroesCount += 1;
        }
      }
    }
    if (zeroesCount === gridSize) {
      return step;
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `
          5483143223
          2745854711
          5264556173
          6141336146
          6357385478
          4167524645
          2176841721
          6882881134
          4846848554
          5283751526
        `,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          5483143223
          2745854711
          5264556173
          6141336146
          6357385478
          4167524645
          2176841721
          6882881134
          4846848554
          5283751526
        `,
        expected: 195,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
