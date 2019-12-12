TypeScript Deep Merge
=====================

A deep merge function that automatically infers the return type based on your input,
without mutating the source objects.


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
    b: 2,
    c: 2
  }
};

const obj3 = {
  a: {
    a: 3
  },
  c: 3
};

const result = merge(obj1, obj2, obj3);
```

The value of the above `result` is:
```json
{
  "a": {
    "a": 3,
    "b": 2,
    "c": 2
  },
  "b": {
    "b": 2
  },
  "c": 3
}
```
