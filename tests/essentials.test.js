import { sum } from "../essentials";

describe("Test suite for Essentials", () => {
  it("adds 1 + 3 to be equal to", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("returns 0 when any of the 2 arguments supplied is null", () => {
    expect(sum(null, 2)).toBe(0);
  });

  it("returns 0 when the 2 arguments supplied is null", () => {
    expect(sum(null, null)).toBe(0);
  });
});
