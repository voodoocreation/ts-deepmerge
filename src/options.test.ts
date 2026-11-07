import { merge } from "./index";

describe("merge.withOptions cleanup", () => {
  it("restores defaults after a merge throws", () => {
    const original = merge.options;
    try {
      expect(() => merge.withOptions({ mergeArrays: false }, [1])).toThrow(
        TypeError,
      );
      expect(merge({ values: [1] }, { values: [2] })).toEqual({
        values: [1, 2],
      });
    } finally {
      merge.options = original;
    }
  });

  it("restores the enclosing options after a nested call", () => {
    const input = {
      get values() {
        merge.withOptions(
          { mergeArrays: true },
          { nested: [1] },
          { nested: [2] },
        );
        return [2];
      },
    };
    expect(
      merge.withOptions({ mergeArrays: false }, { values: [1] }, input),
    ).toEqual({ values: [2] });
  });
});
