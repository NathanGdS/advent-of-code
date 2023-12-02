import fs from "fs";
/*
--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values? 
*/

const mapper = {};
const digits = [];
const numberDigits = [
  {
    key: "one",
    value: "1",
  },
  {
    key: "two",
    value: "2",
  },
  {
    key: "three",
    value: "3",
  },
  {
    key: "four",
    value: "4",
  },
  {
    key: "five",
    value: "5",
  },
  {
    key: "six",
    value: "6",
  },
  {
    key: "seven",
    value: "7",
  },
  {
    key: "eight",
    value: "8",
  },
  {
    key: "nine",
    value: "9",
  },
];

function readFile(input) {
  const filePath = `./${input}`;
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("\n");
}

function verifyDigitsInStr(str) {
  for (const digit of numberDigits) {
    if (str.includes(digit.key)) {
      str = str.replace(
        digit.key,
        `${digit.value}${digit.key[digit.key.length - 1]}`
      );
    }
  }
  //   console.log(str);
  return str;
}

function verifyNumberDigitsFromStr(str) {
  //   return verifyDigitsInStr(str);
  let tempStr = "";
  for (let i = 0; i < str.length; i++) {
    tempStr += str[i];
    // console.log(tempStr);
    tempStr = verifyDigitsInStr(tempStr);
  }
  return tempStr;
}

function assignMapper(input) {
  for (let i = 0; i < input.length; i++) {
    const str = verifyNumberDigitsFromStr(input[i]);
    // console.log(str);
    for (let j = 0; j < str.length; j++) {
      const element = Number(str[j]);
      if (Number.isInteger(element)) {
        Object.assign(mapper, {
          [str]: {
            values: mapper[str] ? [...mapper[str].values, element] : [element],
          },
        });
      }
    }
  }
  //   console.log(mapper);
}

function pushDigits() {
  for (const key in mapper) {
    const values = mapper[key].values;
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    digits.push({
      key: `${firstValue}${lastValue}`,
    });
  }
  //   console.log(digits);
}

function sumValues() {
  let totalSum = 0;
  //   console.log(digits.length);
  for (const value of digits) {
    const key = value.key;
    totalSum += Number(key);
  }
  return totalSum;
}

function main() {
  const input = readFile("input.txt");
  assignMapper(input);
  pushDigits();
  const sum = sumValues();
  console.log(sum);
}
main();
