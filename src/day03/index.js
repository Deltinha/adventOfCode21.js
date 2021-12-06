import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/g);

  const gamma = [];

  function binaryArrayToDecimal(array) {
    let n = "";
    array.forEach((bit) => (n = n + bit));
    return parseInt(n, 2);
  }

  for (let i = 0; i < input[i].length; i++) {
    let sum = 0;
    input.forEach((binary) => {
      if (binary[i] === "0") {
        sum--;
      } else {
        sum++;
      }
    });

    if (sum > 0) {
      gamma[i] = 1;
    } else {
      gamma[i] = 0;
    }
  }

  const epsilon = [];
  gamma.forEach((bit) => (bit === 0 ? epsilon.push(1) : epsilon.push(0)));

  return binaryArrayToDecimal(gamma) * binaryArrayToDecimal(epsilon);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/g);

  let oxigenGenerator = input;

  function binaryArrayToDecimal(array) {
    let n = "";
    array.forEach((bit) => (n = n + bit));
    return parseInt(n, 2);
  }

  for (let i = 0; i < oxigenGenerator[0].length; i++) {
    let sum = 0;
    oxigenGenerator.forEach((binary) => {
      if (binary[i] === "0") {
        sum--;
      } else {
        sum++;
      }
    });
    if (sum >= 0) {
      oxigenGenerator = oxigenGenerator.filter((binary) => binary[i] === "1");
    } else {
      oxigenGenerator = oxigenGenerator.filter((binary) => binary[i] === "0");
    }
    if (oxigenGenerator.length === 1) {
      break;
    }
  }

  let co2Scrubbing = input;

  for (let i = 0; i < co2Scrubbing[0].length; i++) {
    let sum = 0;
    co2Scrubbing.forEach((binary) => {
      if (binary[i] === "0") {
        sum--;
      } else {
        sum++;
      }
    });
    if (sum >= 0) {
      co2Scrubbing = co2Scrubbing.filter((binary) => binary[i] === "0");
    } else {
      co2Scrubbing = co2Scrubbing.filter((binary) => binary[i] === "1");
    }
    if (co2Scrubbing.length === 1) {
      break;
    }
  }

  return (
    binaryArrayToDecimal(oxigenGenerator) * binaryArrayToDecimal(co2Scrubbing)
  );
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
