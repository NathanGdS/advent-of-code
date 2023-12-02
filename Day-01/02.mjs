import fs from "fs";

/*
--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?

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
