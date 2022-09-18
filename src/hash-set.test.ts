import { Collections } from './';
import * as assert from 'assert';
import { lastValueFrom, Observable, toArray } from 'rxjs';

describe('Having a set instance', () => {
	describe('and an intersection is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		const b = Collections.HashSet.of([2, 3, 4]);
		it('should produce a set with the common values between the first and the second set', () => {
			assert.ok(Collections.HashSet.of([2, 3]).equals(a.intersection(b)));
		});
		describe('and there are no common values', () => {
			const a = Collections.HashSet.of([1, 2, 3]);
			const b = Collections.HashSet.of([4, 5, 6]);
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty().equals(a.intersection(b)));
			});
		});
	});
	describe('and a difference is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		const b = Collections.HashSet.of([2, 3, 4]);
		it('should produce a set with the values from the first set that aren not in the second set', () => {
			assert.ok(Collections.HashSet.of([1]).equals(a.difference(b)));
		});
		describe('and there are no values in the first set that aren not in the second set', () => {
			const a = Collections.HashSet.of([2, 3]);
			const b = Collections.HashSet.of([2, 3, 4]);
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty().equals(a.difference(b)));
			});
		});
	});
	describe('and a union is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		const b = Collections.HashSet.of([2, 3, 4]);
		it('should produce a set with the values from both sets', () => {
			assert.ok(Collections.HashSet.of([1, 2, 3, 4]).equals(a.union(b)));
		});
		describe('and both sets are empty', () => {
			const a = Collections.HashSet.empty();
			const b = Collections.HashSet.empty();
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty().equals(a.union(b)));
			});
		});
	});
	describe('and a symmetric difference is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		const b = Collections.HashSet.of([2, 3, 4]);
		it('should produce a set with the values from both sets that are not in the intersection', () => {
			assert.ok(Collections.HashSet.of([1, 4]).equals(a.symmetricDifference(b)));
		});
		describe('and both sets are empty', () => {
			const a = Collections.HashSet.empty();
			const b = Collections.HashSet.empty();
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty().equals(a.symmetricDifference(b)));
			});
		});
	});
	describe('and a subset is checked', () => {
		const a = Collections.HashSet.of([2, 3]);
		const b = Collections.HashSet.of([1, 2, 3, 4]);
		it('should produce true if the first set is a subset of the second set', () => {
			assert.ok(a.isSubsetOf(b));
		});
		it('should produce false if the first set is not a subset of the second set', () => {
			assert.ok(!b.isSubsetOf(a));
		});
	});
	describe('and a superset is checked', () => {
		const a = Collections.HashSet.of([2, 3]);
		const b = Collections.HashSet.of([2, 3, 4]);
		it('should produce true if the first set is a superset of the second set', () => {
			assert.ok(b.isSupersetOf(a));
		});
		it('should produce false if the first set is not a superset of the second set', () => {
			assert.ok(!a.isSupersetOf(b));
		});
	});
	describe('and a proper subset is checked', () => {
		const a = Collections.HashSet.of([2, 3]);
		const b = Collections.HashSet.of([1, 2, 3, 4]);
		it('should produce true if the first set is a proper subset of the second set', () => {
			assert.ok(a.isProperSubsetOf(b));
		});
		it('should produce false if the first set is not a proper subset of the second set', () => {
			assert.ok(!b.isProperSubsetOf(a));
		});
	});
	describe('and a proper superset is checked', () => {
		const a = Collections.HashSet.of([2, 3]);
		const b = Collections.HashSet.of([2, 3, 4]);
		it('should produce true if the first set is a proper superset of the second set', () => {
			assert.ok(b.isProperSupersetOf(a));
		});
		it('should produce false if the first set is not a proper superset of the second set', () => {
			assert.ok(!a.isProperSupersetOf(b));
		});
	});
	describe('and a some operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce true if the predicate is true for at least one element', () => {
			assert.ok(a.some((x) => x === 2));
		});
		it('should produce false if the predicate is false for all elements', () => {
			assert.ok(!a.some((x) => x === 4));
		});
	});
	describe('and a every operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce true if the predicate is true for all elements', () => {
			assert.ok(a.every((x) => x < 4));
		});
		it('should produce false if the predicate is false for at least one element', () => {
			assert.ok(!a.every((x) => x < 3));
		});
	});
	describe('and a find operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce the first element that matches the predicate', () => {
			assert.equal(
				2,
				a.find((x) => x === 2),
			);
		});
		it('should produce undefined if no element matches the predicate', () => {
			assert.equal(
				undefined,
				a.find((x) => x === 4),
			);
		});
	});
	describe('and a map operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce a set with the values from the given set mapped by the given function', () => {
			assert.ok(Collections.HashSet.of([2, 4, 6]).equals(a.map((x) => x * 2)));
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty<number>().equals(a.map((x) => x * 2)));
			});
		});
	});
	describe('and a flatMap operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce a set with the values from the given set flatMapped by the given function', () => {
			assert.ok(Collections.HashSet.of([2, 4, 6]).equals(a.flatMap((x) => Collections.HashSet.of([x * 2]))));
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty<number>().equals(a.flatMap((x) => Collections.HashSet.of([x * 2]))));
			});
		});
	});
	describe('and a filter operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce a set with the values from the given set that match the given predicate', () => {
			assert.ok(Collections.HashSet.of([2]).equals(a.filter((x) => x % 2 === 0)));
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce an empty set', () => {
				assert.ok(Collections.HashSet.empty<number>().equals(a.filter((x) => x % 2 === 0)));
			});
		});
	});
	describe('and a reduce operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce a value by reducing the given set by the given function', () => {
			assert.equal(
				6,
				a.reduce((x, y) => x + y, 0),
			);
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce the initial value', () => {
				assert.equal(
					0,
					a.reduce((x, y) => x + y, 0),
				);
			});
		});
	});
	describe('and a partition operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce a tuple of sets with the values from the given set that match and do not match the given predicate', () => {
			assert.deepStrictEqual(
				[Collections.HashSet.of([2]), Collections.HashSet.of([1, 3])],
				a.partition((x) => x % 2 === 0),
			);
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce a tuple of empty sets', () => {
				assert.deepStrictEqual(
					[Collections.HashSet.empty(), Collections.HashSet.empty()],
					a.partition((x) => x % 2 === 0),
				);
			});
		});
	});
	describe('and a toArray() operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce an array with the values from the given set', () => {
			assert.deepStrictEqual([1, 2, 3], a.toArray());
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce an empty array', () => {
				assert.deepStrictEqual([], a.toArray());
			});
		});
	});
	describe('and a toJsSet() operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce a js set with the values from the given set', () => {
			assert.deepStrictEqual(new Set([1, 2, 3]), a.toJsSet());
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce an empty array', () => {
				assert.deepStrictEqual(new Set(), a.toJsSet());
			});
		});
	});
	describe('and a isEmpty() operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce false', () => {
			assert.equal(false, a.isEmpty());
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce true', () => {
				assert.equal(true, a.isEmpty());
			});
		});
	});
	describe('and a toObservable() operation is performed', () => {
		const a = Collections.HashSet.of([1, 2, 3]);
		it('should produce an observable with the values from the given set', async () => {
			assert.ok(a.toObservable() instanceof Observable);
			assert.deepStrictEqual(await lastValueFrom(a.toObservable().pipe(toArray())), a.toArray());
		});
		describe('and the given set is empty', () => {
			const a = Collections.HashSet.empty<number>();
			it('should produce an empty observable', async () => {
				assert.ok(a.toObservable() instanceof Observable);
				assert.deepStrictEqual(await lastValueFrom(a.toObservable().pipe(toArray())), a.toArray());
			});
		});
	});
});
