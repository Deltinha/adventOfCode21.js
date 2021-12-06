import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/g);

  const position = [0, 0];

  function move({ direction, step }) {
    if (direction === "up") {
      position[1] -= step;
    }

    if (direction === "down") {
      position[1] += step;
    }

    if (direction === "forward") {
      position[0] += step;
    }
  }

  input.forEach((movement) => {
    const direction = movement.split(" ")[0];
    const step = Number(movement.split(" ")[1]);

    move({ direction, step });
  });

  return position[0] * position[1];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/g);

  const position = [0, 0];
  let aim = 0;

  function move({ direction, step }) {
    if (direction === "up") {
      aim -= step;
    }

    if (direction === "down") {
      aim += step;
    }

    if (direction === "forward") {
      position[0] += step;
      position[1] += step * aim;
    }
  }

  input.forEach((movement) => {
    const direction = movement.split(" ")[0];
    const step = Number(movement.split(" ")[1]);

    move({ direction, step });
  });

  return position[0] * position[1];
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
