### Installation

```
npm install ts-hashset
```

### Input validation

```ts
import { HashSet } from 'ts-hashset';

const set = HashSet.of([1, 2, 3]);

function foo(set: Set<number>) {}

foo(set); // OK
```
