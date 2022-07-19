import merge from "./index";

interface INamedObject {
  propertyA: string[];
  propertyB: string;
}

describe("merge", () => {
  const object1 = {
    array: ["a"],
    date: new Date("2020-01-01"),
    functions: {
      func1: () => "Object 1",
      func2: () => "Object 1",
    },
    nest: {
      nest: {
        a: 1,
        b: 2,
      },
    },
    object: {
      a: 1,
      b: 2,
    },
  };
  const object1Backup = { ...object1 };

  const object2 = {
    nest: {
      nest: {
        b: 3,
        d: 5,
      },
    },
    object: {
      b: undefined,
      c: 3,
      d: 5,
    },
  };
  const object2Backup = { ...object2 };

  const object3 = {
    array: ["b", "c", "a"],
    date: new Date("2020-01-02"),
    functions: {
      func2: () => "Object 3",
      func3: () => "Object 3",
    },
    nest: {
      nest: {
        c: 4,
      },
    },
    object: {
      d: null,
    },
  };
  const object3Backup = { ...object3 };

  const namedObject: INamedObject = {
    propertyA: ["a", "b"],
    propertyB: "propertyB",
  };

  describe("without options", () => {
    const result = merge(object1, object2, object3);

    it("merges arrays correctly", () => {
      expect(result.array).toEqual(["a", "b", "c"]);
    });

    it("merges objects with functions correctly", () => {
      expect(Object.keys(result.functions)).toEqual([
        "func1",
        "func2",
        "func3",
      ]);

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
          d: 5,
        },
      });
    });

    it("merges objects with undefined values correctly", () => {
      expect(result.object).toEqual({
        a: 1,
        c: 3,
        d: null,
      });
    });

    it("doesn't mutate the arguments", () => {
      expect(object1).toEqual(object1Backup);
      expect(object2).toEqual(object2Backup);
      expect(object3).toEqual(object3Backup);
    });

    it("overrides date correctly", () => {
      expect(result.date).toEqual(object3.date);
    });

    it("retains Date instance", () => {
      expect(result.date instanceof Date).toBe(true);
    });

    it("merges a named object", () => {
      expect(merge(namedObject, { propertyB: "merged" })).toEqual({
        propertyA: namedObject.propertyA,
        propertyB: "merged",
      });
    });
  });

  describe("with options", () => {
    const result = merge.withOptions(
      {
        mergeArrays: false,
      },
      object1,
      object2,
      object3
    );

    it("doesn't merge arrays when mergeArrays is false", () => {
      expect(result.array).toEqual(object3.array);
    });

    it("resets the options after calling it", () => {
      expect(merge(object1, object2, object3).array).toEqual(["a", "b", "c"]);
    });
  });

  describe("reported issues", () => {
    it("can merge objects with array-like properties", () => {
      expect(merge({ length: 1 }, { length: 2 })).toEqual({ length: 2 });
    });

    it("can't merge arrays when provided directly as args", () => {
      expect(() => merge([1], [2])).toThrowError(
        new TypeError(
          "Arguments provided to ts-deepmerge must be objects, not arrays."
        )
      );
    });

    it("safeguards against prototype pollution", () => {
      const merged: any = merge(
        {},
        JSON.parse('{ "__proto__": { "hasProto": true } }')
      );

      // eslint-disable-next-line no-proto
      expect(merged.__proto__.hasProto).toBe(undefined);
    });
  });
});
