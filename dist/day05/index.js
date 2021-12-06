import run from "aocrunner";
const parseInput = (rawInput) => rawInput.trim().split(/[\n]/g).map((line) => line.split(" -> ")).map((line) => ({
  initial: {
    x: Number(line[0].split(",")[0]),
    y: Number(line[0].split(",")[1])
  },
  final: {
    x: Number(line[1].split(",")[0]),
    y: Number(line[1].split(",")[1])
  }
}));
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const linesMap = new Map();
  input.every(({ initial, final }) => {
    if (initial.x === final.x || initial.y === final.y) {
      const deltaXSignal = Math.sign(final.x - initial.x);
      const deltaYSignal = Math.sign(final.y - initial.y);
      for (let x = initial.x, y = initial.y; x !== final.x + deltaXSignal || y !== final.y + deltaYSignal; x += deltaXSignal, y += deltaYSignal) {
        let key = `${x},${y}`;
        let value = (linesMap.get(key) ?? 0) + 1;
        linesMap.set(key, value);
      }
      return true;
    }
    return true;
  });
  return Array.from(linesMap.values()).filter((value) => value > 1).length;
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const linesMap = new Map();
  input.every(({ initial, final }) => {
    const deltaXSignal = Math.sign(final.x - initial.x);
    const deltaYSignal = Math.sign(final.y - initial.y);
    for (let x = initial.x, y = initial.y; x !== final.x + deltaXSignal || y !== final.y + deltaYSignal; x += deltaXSignal, y += deltaYSignal) {
      let key = `${x},${y}`;
      let value = (linesMap.get(key) ?? 0) + 1;
      linesMap.set(key, value);
    }
    return true;
  });
  return Array.from(linesMap.values()).filter((value) => value > 1).length;
};
run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
                8,0 -> 0,8
                9,4 -> 3,4
                2,2 -> 2,1
                7,0 -> 7,4
                6,4 -> 2,0
                0,9 -> 2,9
                3,4 -> 1,4
                0,0 -> 8,8
                5,5 -> 8,2

                `,
        expected: 5
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
                8,0 -> 0,8
                9,4 -> 3,4
                2,2 -> 2,1
                7,0 -> 7,4
                6,4 -> 2,0
                0,9 -> 2,9
                3,4 -> 1,4
                0,0 -> 8,8
                5,5 -> 8,2
                `,
        expected: 12
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
});
