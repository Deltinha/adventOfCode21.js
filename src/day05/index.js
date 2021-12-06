import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .trim()
    .split(/[\n]/g)
    .map((line) => line.split(" -> "))
    .map((line) => ({
      initial: { x: line[0].split(",")[0], y: line[0].split(",")[1] },
      final: { x: line[1].split(",")[0], y: line[1].split(",")[1] },
    }));

  const diagram = [];

  input.every(({ initial, final }) => {
    if (initial.x != final.x && initial.y != final.y) {
      return true;
    }
    for (
      let y = initial.y;
      initial.y < final.y ? y <= final.y : y >= final.y;
      initial.y < final.y ? y++ : y--
    ) {
      for (
        let x = initial.x;
        initial.x < final.x ? x <= final.x : x >= final.x;
        initial.x < final.x ? x++ : x--
      ) {
        if (!diagram[x]) {
          diagram[x] = [];
        }
        diagram[x][y] ? (diagram[x][y] += 1) : (diagram[x][y] = 1);
      }
    }
    return true;
  });

  let count = 0;

  diagram.forEach((column) => {
    for (let x = 0; x < column.length; x++) {
      if (column[x] > 1) {
        count++;
      }
    }
  });

  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
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
