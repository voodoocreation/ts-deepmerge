import { merge } from "./index";

describe("merge source accessors", () => {
  it("uses the first value returned by a source getter", () => {
    let value = 0;
    const result = merge({
      get count() {
        return ++value;
      },
    });
    expect(result).toEqual({ count: 1 });
    expect(value).toBe(1);
  });

  it("reads nested object getters once", () => {
    let reads = 0;
    const result = merge({
      get nested() {
        reads++;
        return { value: reads };
      },
    });
    expect(result).toEqual({ nested: { value: 1 } });
    expect(reads).toBe(1);
  });

  it("reads array getters once while combining values", () => {
    let reads = 0;
    const result = merge(
      { values: [0] },
      {
        get values() {
          reads++;
          return [reads];
        },
      },
    );
    expect(result).toEqual({ values: [0, 1] });
    expect(reads).toBe(1);
  });
});
