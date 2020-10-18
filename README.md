TypeScript Deep Merge
=====================

A deep merge function that automatically infers the return type based on your input,
without mutating the source objects.

Objects and arrays will be merged, but values such as numbers and strings will be overwritten.

All merging/overwriting occurs in the order of the arguments you provide the function with.


Usage
-----
```typescript jsx
import merge from "ts-deepmerge";

const obj1 = {
  a: {
    a: 1
  }
};

const obj2 = {
  b: {
    a: 2,
    b: 2
  }
};

const obj3 = {
  a: {
    b: 3
  },
  b: {
    b: 3,
    c: 3
  },
  c: 3
};

const result = merge(obj1, obj2, obj3);
```

The value of the above `result` is:
```json
{
  "a": {
    "a": 1,
    "b": 3
  },
  "b": {
    "a": 2,
    "b": 3,
    "c": 3
  },
  "c": 3
}
```
