import { isNumber } from "lodash";
import { randomNumber, randomNumberToTwo } from "./helpers";

describe("Should return a single random number", function () {
  it("should return true if function returns a number", () => {
    expect(isNumber(randomNumber())).toBe(true);
  });
  it("Given 2 numbers should return a random number between", () => {
    expect(randomNumber(1, 10)).toBeGreaterThanOrEqual(1);
    expect(randomNumber(1, 10)).toBeLessThanOrEqual(10);
  });
  it("Given the same number twice should return same number", () => {
    expect(randomNumber(5, 5)).toEqual(5);
  });
});

describe("Should return a single random number to two decimal places", function () {
  const result = randomNumberToTwo(1, 10);
  it("should return true if function returns a number", () => {
    expect(result).toEqual(expect.stringMatching(/^[0-9]+?\.[0-9]{2}$/));
  });
  it("Given 2 numbers should return a random number between", () => {
    expect(+result).toBeGreaterThanOrEqual(1);
    expect(+result).toBeLessThanOrEqual(10);
  });
  it("Given the same number twice should return same number as a string", () => {
    expect(randomNumberToTwo(5, 5)).toEqual("5.00");
  });
});
