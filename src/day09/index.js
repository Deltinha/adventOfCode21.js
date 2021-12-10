import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split("").map(Number));

const part1 = (rawInput) => {
  function isMinimumPoint({ up, down, left, right, center }) {
    if (up !== undefined && up <= center) {
      return false;
    }
    if (down !== undefined && down <= center) {
      return false;
    }
    if (left !== undefined && left <= center) {
      return false;
    }
    if (right !== undefined && right <= center) {
      return false;
    }
    // console.log({ up, down, left, right, center });
    return true;
  }
  const heightMap = parseInput(rawInput);
  const lowLevels = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[0].length; j++) {
      if (
        isMinimumPoint({
          up: heightMap[i - 1] ? heightMap[i - 1][j] : undefined,
          down: heightMap[i + 1] ? heightMap[i + 1][j] : undefined,
          left: heightMap[i][j - 1],
          right: heightMap[i][j + 1],
          center: heightMap[i][j],
        })
      ) {
        lowLevels.push(heightMap[i][j]);
      }
    }
  }

  return lowLevels.reduce((acc, cur) => acc + cur + 1, 0);
};

const part2 = (rawInput) => {
  function isMinimumPoint({ up, down, left, right, center }) {
    if (up !== undefined && up <= center) {
      return false;
    }
    if (down !== undefined && down <= center) {
      return false;
    }
    if (left !== undefined && left <= center) {
      return false;
    }
    if (right !== undefined && right <= center) {
      return false;
    }

    return true;
  }

  const heightMap = parseInput(rawInput);
  const lowLevels = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      if (
        isMinimumPoint({
          up: heightMap[i - 1] ? heightMap[i - 1][j] : undefined,
          down: heightMap[i + 1] ? heightMap[i + 1][j] : undefined,
          left: heightMap[i][j - 1],
          right: heightMap[i][j + 1],
          center: heightMap[i][j],
        })
      ) {
        lowLevels.push([i, j]);
      }
    }
  }

  function calculateBasinSize({ x, y }) {
    function isInsideHeightMap({ x, y }) {
      return (
        y >= 0 && y < heightMap.length && x >= 0 && x < heightMap[y].length
      );
    }
    function isInsideBasin({ x, y }) {
      return heightMap[y][x] < 9 && heightMap[y][x] >= 0;
    }

    if (!isInsideHeightMap({ x, y }) || !isInsideBasin({ x, y })) {
      return 0;
    }

    heightMap[y][x] = -1;

    return (
      1 +
      calculateBasinSize({ y: y + 1, x }) +
      calculateBasinSize({ y: y - 1, x }) +
      calculateBasinSize({ y, x: x + 1 }) +
      calculateBasinSize({ y, x: x - 1 })
    );
  }

  const basinSizes = lowLevels.map((lL) =>
    calculateBasinSize({ y: lL[0], x: lL[1] }),
  );

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc * cur);
};

run({
  part1: {
    tests: [
      {
        input: `
                2199943210
                3987894921
                9856789892
                8767896789
                9899965678
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
                2199943210
                3987894921
                9856789892
                8767896789
                9899965678
        `,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
