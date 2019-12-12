import merge from "./index";

describe("merge", () => {
  const object1 = {
    array: ["a"],
    functions: {
      func1: () => "Object 1",
      func2: () => "Object 1"
    },
    nest: {
      nest: {
        a: 1,
        b: 2
      }
    },
    object: {
      a: 1,
      b: 2
    }
  };
  const object1Backup = { ...object1 };

  const object2 = {
    nest: {
      nest: {
        b: 3,
        d: 5
      }
    },
    object: {
      b: undefined,
      c: 3,
      d: 5
    }
  };
  const object2Backup = { ...object2 };

  const object3 = {
    array: ["b", "c", "a"],
    functions: {
      func2: () => "Object 3",
      func3: () => "Object 3"
    },
    nest: {
      nest: {
        c: 4
      }
    },
    object: {
      d: null
    }
  };
  const object3Backup = { ...object3 };

  const result = merge(object1, object2, object3);

  it("merges arrays correctly", () => {
    expect(result.array).toEqual(["a", "b", "c"]);
  });

  it("merges objects with functions correctly", () => {
    expect(Object.keys(result.functions)).toEqual(["func1", "func2", "func3"]);

    expect(result.functions.func1()).toBe("Object 1");
    expect(result.functions.func2()).toBe("Object 3");
    expect(result.functions.func3()).toBe("Object 3");
  });

  it("merges nested objects correctly", () => {
    expect(result.nest).toEqual({
      nest: {
        a: 1,
        b: 3,
        c: 4,
        d: 5
      }
    });
  });

  it("merges objects with undefined values correctly", () => {
    expect(result.object).toEqual({
      a: 1,
      c: 3,
      d: null
    });
  });

  it("doesn't mutate the arguments", () => {
    expect(object1).toEqual(object1Backup);
    expect(object2).toEqual(object2Backup);
    expect(object3).toEqual(object3Backup);
  });
});
