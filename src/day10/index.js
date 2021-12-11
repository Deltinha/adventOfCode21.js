import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const charScores = new Map();
  charScores.set(")", 3);
  charScores.set("]", 57);
  charScores.set("}", 1197);
  charScores.set(">", 25137);
  let finalScore = 0;

  input.forEach((line) => {
    const stack = new Array();
    line.split("").every((char, index) => {
      if (char === "(" || char === "[" || char === "{" || char === "<") {
        stack.push(char);
      }
      if (char === ")") {
        if (stack[stack.length - 1] !== "(") {
          finalScore += charScores.get(")");
          return false;
        }
        stack.pop();
      }
      if (char === "]") {
        if (stack[stack.length - 1] !== "[") {
          finalScore += charScores.get("]");
          return false;
        }
        stack.pop();
      }
      if (char === "}") {
        if (stack[stack.length - 1] !== "{") {
          finalScore += charScores.get("}");
          return false;
        }
        stack.pop();
      }
      if (char === ">") {
        if (stack[stack.length - 1] !== "<") {
          finalScore += charScores.get(">");
          return false;
        }
        stack.pop();
      }
      return true;
    });
  });

  return finalScore;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const charScores = new Map();
  charScores.set("(", 1);
  charScores.set("[", 2);
  charScores.set("{", 3);
  charScores.set("<", 4);
  const incompletesStack = [];

  input.forEach((line) => {
    const stack = new Array();
    const isIncomplete = line.split("").every((char, index) => {
      if (char === "(" || char === "[" || char === "{" || char === "<") {
        stack.push(char);
      }
      if (char === ")") {
        if (stack[stack.length - 1] !== "(") {
          return false;
        }
        stack.pop();
      }
      if (char === "]") {
        if (stack[stack.length - 1] !== "[") {
          return false;
        }
        stack.pop();
      }
      if (char === "}") {
        if (stack[stack.length - 1] !== "{") {
          return false;
        }
        stack.pop();
      }
      if (char === ">") {
        if (stack[stack.length - 1] !== "<") {
          return false;
        }
        stack.pop();
      }
      return true;
    });
    if (isIncomplete) incompletesStack.push(stack);
    return false;
  });

  const scoresArray = [];
  incompletesStack.forEach((line) => {
    let score = 0;
    line.reverse().forEach((char) => {
      score = score * 5 + charScores.get(char);
    });
    scoresArray.push(score);
  });
  return scoresArray.sort((a, b) => a - b)[(scoresArray.length - 1) / 2];
};

run({
  part1: {
    tests: [
      {
        input: `
          [({(<(())[]>[[{[]{<()<>>
          [(()[<>])]({[<{<<[]>>(
          {([(<{}[<>[]}>{[]{[(<()>
          (((({<>}<{<{<>}{[]{[]{}
          [[<[([]))<([[{}[[()]]]
          [{[{({}]{}}([{[{{{}}([]
          {<[[]]>}<{[{[{[]{()[[[]
          [<(<(<(<{}))><([]([]()
          <{([([[(<>()){}]>(<<{{
          <{([{{}}[<[[[<>{}]]]>[]]
        `,
        expected: 26397,
      },
      {
        input: `
        {([(<{}[<>[]}>{[]{[(<()> 
        `,
        expected: 1197,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          [({(<(())[]>[[{[]{<()<>>
          [(()[<>])]({[<{<<[]>>(
          {([(<{}[<>[]}>{[]{[(<()>
          (((({<>}<{<{<>}{[]{[]{}
          [[<[([]))<([[{}[[()]]]
          [{[{({}]{}}([{[{{{}}([]
          {<[[]]>}<{[{[{[]{()[[[]
          [<(<(<(<{}))><([]([]()
          <{([([[(<>()){}]>(<<{{
          <{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
