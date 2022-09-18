import * as util from 'util';
import { from, Observable } from 'rxjs';

export class HashSet<T> extends Set<T> {
	public static of<T>(items: T[] | null) {
		return new HashSet<T>(items);
	}

	public static empty<T>(): HashSet<T> {
		return new HashSet([]);
	}

	protected constructor(set: T[] | null) {
		super(set);
	}

	/**
	 *
	 * @param: b - The set to intersect with
	 * @returns: A new set containing the intersection of the two sets
	 */
	public intersection(b: HashSet<T>): HashSet<T> {
		return this.filter((x) => b.has(x));
	}

	/**
	 *
	 * @param b - The set to subtract from this set
	 * @returns A new set containing the difference of the two sets
	 */
	public difference(b: HashSet<T>): HashSet<T> {
		return this.filter((x) => !b.has(x));
	}

	/**
	 *
	 * @param b - The set to union with
	 * @returns A new set containing the union of the two sets
	 */
	public union(b: HashSet<T>): HashSet<T> {
		return new HashSet<T>([...this, ...b]);
	}

	/**
	 *
	 * @param b - The set to compare with
	 * @returns Returns a new set containing the elements that are in either sets but not in the intersection
	 */
	public symmetricDifference(b: HashSet<T>): HashSet<T> {
		return this.difference(b).union(b.difference(this));
	}

	public isSubsetOf(b: HashSet<T>): boolean {
		for (const item of this) {
			if (!b.has(item)) {
				return false;
			}
		}
		return true;
	}

	public isSupersetOf(b: HashSet<T>): boolean {
		return !this.isSubsetOf(b);
	}

	public isProperSubsetOf(b: HashSet<T>): boolean {
		return this.isSubsetOf(b) && !this.equals(b);
	}

	public isProperSupersetOf(b: HashSet<T>): boolean {
		return this.isSupersetOf(b) && !this.equals(b);
	}

	public some(fn: (v: T, index: number) => boolean): boolean {
		let index = 0;
		for (const item of this) {
			if (fn(item, index)) {
				return true;
			}
			index++;
		}
		return false;
	}

	public every(fn: (v: T, index: number) => boolean): boolean {
		let index = 0;
		for (const item of this) {
			if (!fn(item, index)) {
				return false;
			}
			index++;
		}
		return true;
	}

	public find(fn: (v: T, index: number) => boolean): T | undefined {
		let index = 0;
		for (const item of this) {
			if (fn(item, index)) {
				return item;
			}
			index++;
		}
	}

	public map<O>(fn: (v: T, index: number) => O): HashSet<O> {
		const result = HashSet.empty<O>();
		let index = 0;
		for (const item of this) {
			result.add(fn(item, index));
			index++;
		}

		return result;
	}

	public flatMap<O>(fn: (v: T, index: number) => HashSet<O>): HashSet<O> {
		const result = HashSet.empty<O>();
		let index = 0;
		for (const item of this) {
			for (const mappedItem of fn(item, index)) {
				result.add(mappedItem);
			}
			index++;
		}
		return result;
	}

	public filter(fn: (v: T, index: number) => boolean): HashSet<T> {
		const result = HashSet.empty<T>();
		let index = 0;
		for (const item of this) {
			if (fn(item, index)) {
				result.add(item);
			}
			index++;
		}
		return result;
	}

	public reduce<O>(fn: (acc: O, v: T, index: number) => O, initial: O): O {
		let acc = initial;
		let index = 0;
		for (const item of this) {
			acc = fn(acc, item, index);
			index++;
		}
		return acc;
	}

	/**
	 *
	 * @param fn - The function to apply to each element
	 * @returns Returns an array of one pair of Sets, the first containing the elements for which the function returned true,
	 * the second containing the elements for which the function returned false
	 */
	public partition(fn: (v: T, index: number) => boolean): [HashSet<T>, HashSet<T>] {
		const result: [HashSet<T>, HashSet<T>] = [HashSet.empty<T>(), HashSet.empty<T>()];
		let index = 0;
		for (const item of this) {
			if (fn(item, index)) {
				result[0].add(item);
			} else {
				result[1].add(item);
			}
			index++;
		}

		return result;
	}

	public equals(other: HashSet<T>): boolean {
		if (this.size !== other.size) {
			return false;
		}
		for (const item of this) {
			if (!other.has(item)) {
				return false;
			}
		}
		return true;
	}

	public isEmpty(): boolean {
		return this.size === 0;
	}

	public toString(): string {
		return `Collections.Set(${this.toArray().toString()})`;
	}

	public toArray(): T[] {
		return Array.from(this);
	}

	public toJsSet(): Set<T> {
		return new Set([...this]);
	}

	public toObservable(): Observable<T> {
		return from(this);
	}

	[Symbol.for('nodejs.util.inspect.custom')](): string {
		return util.inspect(this.toArray(), {
			depth: null,
			colors: true,
			showHidden: false,
		});
	}
}
