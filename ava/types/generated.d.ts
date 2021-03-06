export default test;

export type ErrorValidator
	= (new (...args: any[]) => any)
	| RegExp
	| string
	| ((error: any) => boolean);

export interface Observable {
	subscribe(observer: (value: {}) => void): void;
}

export type Test = (t: TestContext) => PromiseLike<void> | Iterator<any> | Observable | void;
export type ContextualTest = (t: ContextualTestContext) => PromiseLike<void> | Iterator<any> | Observable | void;
export type CallbackTest = (t: CallbackTestContext) => void;
export type ContextualCallbackTest = (t: ContextualCallbackTestContext) => void;

export interface AssertContext {
	/**
	 * Passing assertion.
	 */
	pass(message?: string): void;
	/**
	 * Failing assertion.
	 */
	fail(message?: string): void;
	/**
	 * Assert that value is truthy.
	 */
	truthy(value: any, message?: string): void;
	/**
	 * Assert that value is falsy.
	 */
	falsy(value: any, message?: string): void;
	/**
	 * DEPRECATED, use `truthy`. Assert that value is truthy.
	 */
	ok(value: any, message?: string): void;
	/**
	 * DEPRECATED, use `falsy`. Assert that value is falsy.
	 */
	notOk(value: any, message?: string): void;
	/**
	 * Assert that value is true.
	 */
	true(value: boolean, message?: string): void;
	/**
	 * Assert that value is false.
	 */
	false(value: boolean, message?: string): void;
	/**
	 * Assert that value is equal to expected.
	 */
	is<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that value is not equal to expected.
	 */
	not<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that value is deep equal to expected.
	 */
	deepEqual<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that value is not deep equal to expected.
	 */
	notDeepEqual<U>(value: U, expected: U, message?: string): void;
	/**
	 * Assert that function throws an error or promise rejects.
	 * DEPRECATED, use `deepEqual`. Assert that value is deep equal to expected.
	 * @param error Can be a constructor, regex, error message or validation function.
	 */
	same<U>(value: U, expected: U, message?: string): void;
 	/**
 	 * DEPRECATED use `notDeepEqual`. Assert that value is not deep equal to expected.
 	 */
 	notSame<U>(value: U, expected: U, message?: string): void;
 	/**
 	 * Assert that function throws an error or promise rejects.
 	 * @param error Can be a constructor, regex, error message or validation function.
 	 */
	throws(value: PromiseLike<any>, error?: ErrorValidator, message?: string): Promise<any>;
	throws(value: () => void, error?: ErrorValidator, message?: string): any;
	/**
	 * Assert that function doesn't throw an error or promise resolves.
	 */
	notThrows<U>(value: PromiseLike<U>, message?: string): Promise<U>;
	notThrows(value: () => void, message?: string): void;
	/**
	 * Assert that contents matches regex.
	 */
	regex(contents: string, regex: RegExp, message?: string): void;
	/**
	 * Assert that contents does not match regex.
	 */
	notRegex(contents: string, regex: RegExp, message?: string): void;
	/**
	 * Assert that error is falsy.
	 */
	ifError(error: any, message?: string): void;
}
export interface TestContext extends AssertContext {
	/**
	 * Plan how many assertion there are in the test.
	 * The test will fail if the actual assertion count doesn't match planned assertions.
	 */
	plan(count: number): void;

	skip: AssertContext;
}
export interface CallbackTestContext extends TestContext {
	/**
	 * End the test.
	 */
	end(): void;
}
export interface ContextualTestContext extends TestContext {
	context: any;
}
export interface ContextualCallbackTestContext extends CallbackTestContext {
	context: any;
}

export interface Macro<T> {
	(t: T, ...args: any[]): void;
	title? (providedTitle: string, ...args: any[]): string;
}
export type Macros<T> = Macro<T> | Macro<T>[];

export function test(name: string, run: ContextualTest): void;
export function test(run: ContextualTest): void;
export function test(name: string, run: Macros<ContextualTestContext>, ...args: any[]): void;
export function test(run: Macros<ContextualTestContext>, ...args: any[]): void;
export namespace test {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function before(name: string, implementation: Test): void;
	export function before(implementation: Test): void;
	export function before(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function before(implementation: Macros<TestContext>, ...args: any[]): void;
	export function after(name: string, implementation: Test): void;
	export function after(implementation: Test): void;
	export function after(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function after(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualTest): void;
	export function failing(implementation: ContextualTest): void;
	export function failing(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function only(name: string, implementation: ContextualTest): void;
	export function only(implementation: ContextualTest): void;
	export function only(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function only(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function beforeEach(name: string, implementation: ContextualTest): void;
	export function beforeEach(implementation: ContextualTest): void;
	export function beforeEach(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function beforeEach(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function afterEach(name: string, implementation: ContextualTest): void;
	export function afterEach(implementation: ContextualTest): void;
	export function afterEach(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function afterEach(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: ContextualCallbackTest): void;
	export function cb(implementation: ContextualCallbackTest): void;
	export function cb(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.serial {
	export const before: typeof test.before.serial;
	export const after: typeof test.after.serial;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const failing: typeof test.failing.serial;
	export const only: typeof test.only.serial;
	export const beforeEach: typeof test.beforeEach.serial;
	export const afterEach: typeof test.afterEach.serial;
	export const cb: typeof test.cb.serial;
	export const always: typeof test.always.serial;
}
export namespace test.serial.skip {
	export const before: typeof test.before.serial.skip;
	export const after: typeof test.after.serial.skip;
	export const failing: typeof test.failing.serial.skip;
	export const beforeEach: typeof test.beforeEach.serial.skip;
	export const afterEach: typeof test.afterEach.serial.skip;
	export const cb: typeof test.cb.serial.skip;
	export const always: typeof test.always.serial.skip;
}
export namespace test.serial.todo {
	export const before: typeof test.before.serial.todo;
	export const after: typeof test.after.serial.todo;
	export const failing: typeof test.failing.serial.todo;
	export const beforeEach: typeof test.beforeEach.serial.todo;
	export const afterEach: typeof test.afterEach.serial.todo;
	export const cb: typeof test.cb.serial.todo;
	export const always: typeof test.always.serial.todo;
}
export namespace test.before {
	export function serial(name: string, implementation: Test): void;
	export function serial(implementation: Test): void;
	export function serial(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: Test): void;
	export function failing(implementation: Test): void;
	export function failing(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<TestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: CallbackTest): void;
	export function cb(implementation: CallbackTest): void;
	export function cb(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.before.serial {
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const failing: typeof test.before.failing.serial;
	export const cb: typeof test.before.cb.serial;
}
export namespace test.before.serial.skip {
	export const failing: typeof test.before.failing.serial.skip;
	export const cb: typeof test.before.cb.serial.skip;
}
export namespace test.before.serial.todo {
	export const failing: typeof test.before.failing.serial.todo;
	export const cb: typeof test.before.cb.serial.todo;
}
export namespace test.before.skip {
	export const serial: typeof test.before.serial.skip;
	export const failing: typeof test.before.failing.skip;
	export const cb: typeof test.before.cb.skip;
}
export namespace test.before.todo {
	export const serial: typeof test.before.serial.todo;
	export const failing: typeof test.before.failing.todo;
	export const cb: typeof test.before.cb.todo;
}
export namespace test.before.failing {
	export function serial(name: string, implementation: Test): void;
	export function serial(implementation: Test): void;
	export function serial(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const cb: typeof test.before.cb.failing;
}
export namespace test.before.failing.serial {
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const cb: typeof test.before.cb.failing.serial;
}
export namespace test.before.failing.serial.skip {
	export const cb: typeof test.before.cb.failing.serial.skip;
}
export namespace test.before.failing.serial.todo {
	export const cb: typeof test.before.cb.failing.serial.todo;
}
export namespace test.before.failing.skip {
	export const serial: typeof test.before.failing.serial.skip;
	export const cb: typeof test.before.cb.failing.skip;
}
export namespace test.before.failing.todo {
	export const serial: typeof test.before.failing.serial.todo;
	export const cb: typeof test.before.cb.failing.todo;
}
export namespace test.before.cb {
	export function serial(name: string, implementation: CallbackTest): void;
	export function serial(implementation: CallbackTest): void;
	export function serial(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: CallbackTest): void;
	export function failing(implementation: CallbackTest): void;
	export function failing(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.before.cb.serial {
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.before.cb.failing.serial;
}
export namespace test.before.cb.serial.skip {
	export const failing: typeof test.before.cb.failing.serial.skip;
}
export namespace test.before.cb.serial.todo {
	export const failing: typeof test.before.cb.failing.serial.todo;
}
export namespace test.before.cb.skip {
	export const serial: typeof test.before.cb.serial.skip;
	export const failing: typeof test.before.cb.failing.skip;
}
export namespace test.before.cb.todo {
	export const serial: typeof test.before.cb.serial.todo;
	export const failing: typeof test.before.cb.failing.todo;
}
export namespace test.before.cb.failing {
	export function serial(name: string, implementation: CallbackTest): void;
	export function serial(implementation: CallbackTest): void;
	export function serial(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.before.cb.failing.serial {
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.before.cb.failing.skip {
	export const serial: typeof test.before.cb.failing.serial.skip;
}
export namespace test.before.cb.failing.todo {
	export const serial: typeof test.before.cb.failing.serial.todo;
}
export namespace test.after {
	export function serial(name: string, implementation: Test): void;
	export function serial(implementation: Test): void;
	export function serial(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: Test): void;
	export function failing(implementation: Test): void;
	export function failing(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<TestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: CallbackTest): void;
	export function cb(implementation: CallbackTest): void;
	export function cb(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function always(name: string, implementation: Test): void;
	export function always(implementation: Test): void;
	export function always(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function always(implementation: Macros<TestContext>, ...args: any[]): void;
}
export namespace test.after.serial {
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const failing: typeof test.after.failing.serial;
	export const cb: typeof test.after.cb.serial;
	export const always: typeof test.after.always.serial;
}
export namespace test.after.serial.skip {
	export const failing: typeof test.after.failing.serial.skip;
	export const cb: typeof test.after.cb.serial.skip;
	export const always: typeof test.after.always.serial.skip;
}
export namespace test.after.serial.todo {
	export const failing: typeof test.after.failing.serial.todo;
	export const cb: typeof test.after.cb.serial.todo;
	export const always: typeof test.after.always.serial.todo;
}
export namespace test.after.skip {
	export const serial: typeof test.after.serial.skip;
	export const failing: typeof test.after.failing.skip;
	export const cb: typeof test.after.cb.skip;
	export const always: typeof test.after.always.skip;
}
export namespace test.after.todo {
	export const serial: typeof test.after.serial.todo;
	export const failing: typeof test.after.failing.todo;
	export const cb: typeof test.after.cb.todo;
	export const always: typeof test.after.always.todo;
}
export namespace test.after.failing {
	export function serial(name: string, implementation: Test): void;
	export function serial(implementation: Test): void;
	export function serial(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const cb: typeof test.after.cb.failing;
	export const always: typeof test.after.always.failing;
}
export namespace test.after.failing.serial {
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const cb: typeof test.after.cb.failing.serial;
	export const always: typeof test.after.always.failing.serial;
}
export namespace test.after.failing.serial.skip {
	export const cb: typeof test.after.cb.failing.serial.skip;
	export const always: typeof test.after.always.failing.serial.skip;
}
export namespace test.after.failing.serial.todo {
	export const cb: typeof test.after.cb.failing.serial.todo;
	export const always: typeof test.after.always.failing.serial.todo;
}
export namespace test.after.failing.skip {
	export const serial: typeof test.after.failing.serial.skip;
	export const cb: typeof test.after.cb.failing.skip;
	export const always: typeof test.after.always.failing.skip;
}
export namespace test.after.failing.todo {
	export const serial: typeof test.after.failing.serial.todo;
	export const cb: typeof test.after.cb.failing.todo;
	export const always: typeof test.after.always.failing.todo;
}
export namespace test.after.cb {
	export function serial(name: string, implementation: CallbackTest): void;
	export function serial(implementation: CallbackTest): void;
	export function serial(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: CallbackTest): void;
	export function failing(implementation: CallbackTest): void;
	export function failing(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export const always: typeof test.after.always.cb;
}
export namespace test.after.cb.serial {
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.after.cb.failing.serial;
	export const always: typeof test.after.always.cb.serial;
}
export namespace test.after.cb.serial.skip {
	export const failing: typeof test.after.cb.failing.serial.skip;
	export const always: typeof test.after.always.cb.serial.skip;
}
export namespace test.after.cb.serial.todo {
	export const failing: typeof test.after.cb.failing.serial.todo;
	export const always: typeof test.after.always.cb.serial.todo;
}
export namespace test.after.cb.skip {
	export const serial: typeof test.after.cb.serial.skip;
	export const failing: typeof test.after.cb.failing.skip;
	export const always: typeof test.after.always.cb.skip;
}
export namespace test.after.cb.todo {
	export const serial: typeof test.after.cb.serial.todo;
	export const failing: typeof test.after.cb.failing.todo;
	export const always: typeof test.after.always.cb.todo;
}
export namespace test.after.cb.failing {
	export function serial(name: string, implementation: CallbackTest): void;
	export function serial(implementation: CallbackTest): void;
	export function serial(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export const always: typeof test.after.always.cb.failing;
}
export namespace test.after.cb.failing.serial {
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export const always: typeof test.after.always.cb.failing.serial;
}
export namespace test.after.cb.failing.serial.skip {
	export const always: typeof test.after.always.cb.failing.serial.skip;
}
export namespace test.after.cb.failing.serial.todo {
	export const always: typeof test.after.always.cb.failing.serial.todo;
}
export namespace test.after.cb.failing.skip {
	export const serial: typeof test.after.cb.failing.serial.skip;
	export const always: typeof test.after.always.cb.failing.skip;
}
export namespace test.after.cb.failing.todo {
	export const serial: typeof test.after.cb.failing.serial.todo;
	export const always: typeof test.after.always.cb.failing.todo;
}
export namespace test.after.always {
	export function serial(name: string, implementation: Test): void;
	export function serial(implementation: Test): void;
	export function serial(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: Test): void;
	export function failing(implementation: Test): void;
	export function failing(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<TestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: CallbackTest): void;
	export function cb(implementation: CallbackTest): void;
	export function cb(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.after.always.serial {
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const failing: typeof test.after.always.failing.serial;
	export const cb: typeof test.after.always.cb.serial;
}
export namespace test.after.always.serial.skip {
	export const failing: typeof test.after.always.failing.serial.skip;
	export const cb: typeof test.after.always.cb.serial.skip;
}
export namespace test.after.always.serial.todo {
	export const failing: typeof test.after.always.failing.serial.todo;
	export const cb: typeof test.after.always.cb.serial.todo;
}
export namespace test.after.always.skip {
	export const serial: typeof test.after.always.serial.skip;
	export const failing: typeof test.after.always.failing.skip;
	export const cb: typeof test.after.always.cb.skip;
}
export namespace test.after.always.todo {
	export const serial: typeof test.after.always.serial.todo;
	export const failing: typeof test.after.always.failing.todo;
	export const cb: typeof test.after.always.cb.todo;
}
export namespace test.after.always.failing {
	export function serial(name: string, implementation: Test): void;
	export function serial(implementation: Test): void;
	export function serial(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const cb: typeof test.after.always.cb.failing;
}
export namespace test.after.always.failing.serial {
	export function skip(name: string, implementation: Test): void;
	export function skip(implementation: Test): void;
	export function skip(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: Test): void;
	export function todo(implementation: Test): void;
	export function todo(name: string, implementation: Macros<TestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<TestContext>, ...args: any[]): void;
	export const cb: typeof test.after.always.cb.failing.serial;
}
export namespace test.after.always.failing.serial.skip {
	export const cb: typeof test.after.always.cb.failing.serial.skip;
}
export namespace test.after.always.failing.serial.todo {
	export const cb: typeof test.after.always.cb.failing.serial.todo;
}
export namespace test.after.always.failing.skip {
	export const serial: typeof test.after.always.failing.serial.skip;
	export const cb: typeof test.after.always.cb.failing.skip;
}
export namespace test.after.always.failing.todo {
	export const serial: typeof test.after.always.failing.serial.todo;
	export const cb: typeof test.after.always.cb.failing.todo;
}
export namespace test.after.always.cb {
	export function serial(name: string, implementation: CallbackTest): void;
	export function serial(implementation: CallbackTest): void;
	export function serial(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: CallbackTest): void;
	export function failing(implementation: CallbackTest): void;
	export function failing(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.after.always.cb.serial {
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.after.always.cb.failing.serial;
}
export namespace test.after.always.cb.serial.skip {
	export const failing: typeof test.after.always.cb.failing.serial.skip;
}
export namespace test.after.always.cb.serial.todo {
	export const failing: typeof test.after.always.cb.failing.serial.todo;
}
export namespace test.after.always.cb.skip {
	export const serial: typeof test.after.always.cb.serial.skip;
	export const failing: typeof test.after.always.cb.failing.skip;
}
export namespace test.after.always.cb.todo {
	export const serial: typeof test.after.always.cb.serial.todo;
	export const failing: typeof test.after.always.cb.failing.todo;
}
export namespace test.after.always.cb.failing {
	export function serial(name: string, implementation: CallbackTest): void;
	export function serial(implementation: CallbackTest): void;
	export function serial(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.after.always.cb.failing.serial {
	export function skip(name: string, implementation: CallbackTest): void;
	export function skip(implementation: CallbackTest): void;
	export function skip(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: CallbackTest): void;
	export function todo(implementation: CallbackTest): void;
	export function todo(name: string, implementation: Macros<CallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<CallbackTestContext>, ...args: any[]): void;
}
export namespace test.after.always.cb.failing.skip {
	export const serial: typeof test.after.always.cb.failing.serial.skip;
}
export namespace test.after.always.cb.failing.todo {
	export const serial: typeof test.after.always.cb.failing.serial.todo;
}
export namespace test.skip {
	export const serial: typeof test.serial.skip;
	export const before: typeof test.before.skip;
	export const after: typeof test.after.skip;
	export const failing: typeof test.failing.skip;
	export const beforeEach: typeof test.beforeEach.skip;
	export const afterEach: typeof test.afterEach.skip;
	export const cb: typeof test.cb.skip;
	export const always: typeof test.always.skip;
}
export namespace test.todo {
	export const serial: typeof test.serial.todo;
	export const before: typeof test.before.todo;
	export const after: typeof test.after.todo;
	export const failing: typeof test.failing.todo;
	export const beforeEach: typeof test.beforeEach.todo;
	export const afterEach: typeof test.afterEach.todo;
	export const cb: typeof test.cb.todo;
	export const always: typeof test.always.todo;
}
export namespace test.failing {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const before: typeof test.before.failing;
	export const after: typeof test.after.failing;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function only(name: string, implementation: ContextualTest): void;
	export function only(implementation: ContextualTest): void;
	export function only(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function only(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const beforeEach: typeof test.beforeEach.failing;
	export const afterEach: typeof test.afterEach.failing;
	export const cb: typeof test.cb.failing;
	export const always: typeof test.always.failing;
}
export namespace test.failing.serial {
	export const before: typeof test.before.failing.serial;
	export const after: typeof test.after.failing.serial;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const only: typeof test.failing.only.serial;
	export const beforeEach: typeof test.beforeEach.failing.serial;
	export const afterEach: typeof test.afterEach.failing.serial;
	export const cb: typeof test.cb.failing.serial;
	export const always: typeof test.always.failing.serial;
}
export namespace test.failing.serial.skip {
	export const before: typeof test.before.failing.serial.skip;
	export const after: typeof test.after.failing.serial.skip;
	export const beforeEach: typeof test.beforeEach.failing.serial.skip;
	export const afterEach: typeof test.afterEach.failing.serial.skip;
	export const cb: typeof test.cb.failing.serial.skip;
	export const always: typeof test.always.failing.serial.skip;
}
export namespace test.failing.serial.todo {
	export const before: typeof test.before.failing.serial.todo;
	export const after: typeof test.after.failing.serial.todo;
	export const beforeEach: typeof test.beforeEach.failing.serial.todo;
	export const afterEach: typeof test.afterEach.failing.serial.todo;
	export const cb: typeof test.cb.failing.serial.todo;
	export const always: typeof test.always.failing.serial.todo;
}
export namespace test.failing.skip {
	export const serial: typeof test.failing.serial.skip;
	export const before: typeof test.before.failing.skip;
	export const after: typeof test.after.failing.skip;
	export const beforeEach: typeof test.beforeEach.failing.skip;
	export const afterEach: typeof test.afterEach.failing.skip;
	export const cb: typeof test.cb.failing.skip;
	export const always: typeof test.always.failing.skip;
}
export namespace test.failing.todo {
	export const serial: typeof test.failing.serial.todo;
	export const before: typeof test.before.failing.todo;
	export const after: typeof test.after.failing.todo;
	export const beforeEach: typeof test.beforeEach.failing.todo;
	export const afterEach: typeof test.afterEach.failing.todo;
	export const cb: typeof test.cb.failing.todo;
	export const always: typeof test.always.failing.todo;
}
export namespace test.failing.only {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.cb.failing.only;
}
export namespace test.failing.only.serial {
	export const cb: typeof test.cb.failing.only.serial;
}
export namespace test.only {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const failing: typeof test.failing.only;
	export const cb: typeof test.cb.only;
}
export namespace test.only.serial {
	export const failing: typeof test.failing.only.serial;
	export const cb: typeof test.cb.only.serial;
}
export namespace test.beforeEach {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualTest): void;
	export function failing(implementation: ContextualTest): void;
	export function failing(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: ContextualCallbackTest): void;
	export function cb(implementation: ContextualCallbackTest): void;
	export function cb(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.beforeEach.serial {
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const failing: typeof test.beforeEach.failing.serial;
	export const cb: typeof test.beforeEach.cb.serial;
}
export namespace test.beforeEach.serial.skip {
	export const failing: typeof test.beforeEach.failing.serial.skip;
	export const cb: typeof test.beforeEach.cb.serial.skip;
}
export namespace test.beforeEach.serial.todo {
	export const failing: typeof test.beforeEach.failing.serial.todo;
	export const cb: typeof test.beforeEach.cb.serial.todo;
}
export namespace test.beforeEach.skip {
	export const serial: typeof test.beforeEach.serial.skip;
	export const failing: typeof test.beforeEach.failing.skip;
	export const cb: typeof test.beforeEach.cb.skip;
}
export namespace test.beforeEach.todo {
	export const serial: typeof test.beforeEach.serial.todo;
	export const failing: typeof test.beforeEach.failing.todo;
	export const cb: typeof test.beforeEach.cb.todo;
}
export namespace test.beforeEach.failing {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.beforeEach.cb.failing;
}
export namespace test.beforeEach.failing.serial {
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.beforeEach.cb.failing.serial;
}
export namespace test.beforeEach.failing.serial.skip {
	export const cb: typeof test.beforeEach.cb.failing.serial.skip;
}
export namespace test.beforeEach.failing.serial.todo {
	export const cb: typeof test.beforeEach.cb.failing.serial.todo;
}
export namespace test.beforeEach.failing.skip {
	export const serial: typeof test.beforeEach.failing.serial.skip;
	export const cb: typeof test.beforeEach.cb.failing.skip;
}
export namespace test.beforeEach.failing.todo {
	export const serial: typeof test.beforeEach.failing.serial.todo;
	export const cb: typeof test.beforeEach.cb.failing.todo;
}
export namespace test.beforeEach.cb {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualCallbackTest): void;
	export function failing(implementation: ContextualCallbackTest): void;
	export function failing(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.beforeEach.cb.serial {
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.beforeEach.cb.failing.serial;
}
export namespace test.beforeEach.cb.serial.skip {
	export const failing: typeof test.beforeEach.cb.failing.serial.skip;
}
export namespace test.beforeEach.cb.serial.todo {
	export const failing: typeof test.beforeEach.cb.failing.serial.todo;
}
export namespace test.beforeEach.cb.skip {
	export const serial: typeof test.beforeEach.cb.serial.skip;
	export const failing: typeof test.beforeEach.cb.failing.skip;
}
export namespace test.beforeEach.cb.todo {
	export const serial: typeof test.beforeEach.cb.serial.todo;
	export const failing: typeof test.beforeEach.cb.failing.todo;
}
export namespace test.beforeEach.cb.failing {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.beforeEach.cb.failing.serial {
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.beforeEach.cb.failing.skip {
	export const serial: typeof test.beforeEach.cb.failing.serial.skip;
}
export namespace test.beforeEach.cb.failing.todo {
	export const serial: typeof test.beforeEach.cb.failing.serial.todo;
}
export namespace test.afterEach {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualTest): void;
	export function failing(implementation: ContextualTest): void;
	export function failing(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: ContextualCallbackTest): void;
	export function cb(implementation: ContextualCallbackTest): void;
	export function cb(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function always(name: string, implementation: ContextualTest): void;
	export function always(implementation: ContextualTest): void;
	export function always(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function always(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
}
export namespace test.afterEach.serial {
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const failing: typeof test.afterEach.failing.serial;
	export const cb: typeof test.afterEach.cb.serial;
	export const always: typeof test.afterEach.always.serial;
}
export namespace test.afterEach.serial.skip {
	export const failing: typeof test.afterEach.failing.serial.skip;
	export const cb: typeof test.afterEach.cb.serial.skip;
	export const always: typeof test.afterEach.always.serial.skip;
}
export namespace test.afterEach.serial.todo {
	export const failing: typeof test.afterEach.failing.serial.todo;
	export const cb: typeof test.afterEach.cb.serial.todo;
	export const always: typeof test.afterEach.always.serial.todo;
}
export namespace test.afterEach.skip {
	export const serial: typeof test.afterEach.serial.skip;
	export const failing: typeof test.afterEach.failing.skip;
	export const cb: typeof test.afterEach.cb.skip;
	export const always: typeof test.afterEach.always.skip;
}
export namespace test.afterEach.todo {
	export const serial: typeof test.afterEach.serial.todo;
	export const failing: typeof test.afterEach.failing.todo;
	export const cb: typeof test.afterEach.cb.todo;
	export const always: typeof test.afterEach.always.todo;
}
export namespace test.afterEach.failing {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.afterEach.cb.failing;
	export const always: typeof test.afterEach.always.failing;
}
export namespace test.afterEach.failing.serial {
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.afterEach.cb.failing.serial;
	export const always: typeof test.afterEach.always.failing.serial;
}
export namespace test.afterEach.failing.serial.skip {
	export const cb: typeof test.afterEach.cb.failing.serial.skip;
	export const always: typeof test.afterEach.always.failing.serial.skip;
}
export namespace test.afterEach.failing.serial.todo {
	export const cb: typeof test.afterEach.cb.failing.serial.todo;
	export const always: typeof test.afterEach.always.failing.serial.todo;
}
export namespace test.afterEach.failing.skip {
	export const serial: typeof test.afterEach.failing.serial.skip;
	export const cb: typeof test.afterEach.cb.failing.skip;
	export const always: typeof test.afterEach.always.failing.skip;
}
export namespace test.afterEach.failing.todo {
	export const serial: typeof test.afterEach.failing.serial.todo;
	export const cb: typeof test.afterEach.cb.failing.todo;
	export const always: typeof test.afterEach.always.failing.todo;
}
export namespace test.afterEach.cb {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualCallbackTest): void;
	export function failing(implementation: ContextualCallbackTest): void;
	export function failing(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const always: typeof test.afterEach.always.cb;
}
export namespace test.afterEach.cb.serial {
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.afterEach.cb.failing.serial;
	export const always: typeof test.afterEach.always.cb.serial;
}
export namespace test.afterEach.cb.serial.skip {
	export const failing: typeof test.afterEach.cb.failing.serial.skip;
	export const always: typeof test.afterEach.always.cb.serial.skip;
}
export namespace test.afterEach.cb.serial.todo {
	export const failing: typeof test.afterEach.cb.failing.serial.todo;
	export const always: typeof test.afterEach.always.cb.serial.todo;
}
export namespace test.afterEach.cb.skip {
	export const serial: typeof test.afterEach.cb.serial.skip;
	export const failing: typeof test.afterEach.cb.failing.skip;
	export const always: typeof test.afterEach.always.cb.skip;
}
export namespace test.afterEach.cb.todo {
	export const serial: typeof test.afterEach.cb.serial.todo;
	export const failing: typeof test.afterEach.cb.failing.todo;
	export const always: typeof test.afterEach.always.cb.todo;
}
export namespace test.afterEach.cb.failing {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const always: typeof test.afterEach.always.cb.failing;
}
export namespace test.afterEach.cb.failing.serial {
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const always: typeof test.afterEach.always.cb.failing.serial;
}
export namespace test.afterEach.cb.failing.serial.skip {
	export const always: typeof test.afterEach.always.cb.failing.serial.skip;
}
export namespace test.afterEach.cb.failing.serial.todo {
	export const always: typeof test.afterEach.always.cb.failing.serial.todo;
}
export namespace test.afterEach.cb.failing.skip {
	export const serial: typeof test.afterEach.cb.failing.serial.skip;
	export const always: typeof test.afterEach.always.cb.failing.skip;
}
export namespace test.afterEach.cb.failing.todo {
	export const serial: typeof test.afterEach.cb.failing.serial.todo;
	export const always: typeof test.afterEach.always.cb.failing.todo;
}
export namespace test.afterEach.always {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualTest): void;
	export function failing(implementation: ContextualTest): void;
	export function failing(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function cb(name: string, implementation: ContextualCallbackTest): void;
	export function cb(implementation: ContextualCallbackTest): void;
	export function cb(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function cb(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.afterEach.always.serial {
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const failing: typeof test.afterEach.always.failing.serial;
	export const cb: typeof test.afterEach.always.cb.serial;
}
export namespace test.afterEach.always.serial.skip {
	export const failing: typeof test.afterEach.always.failing.serial.skip;
	export const cb: typeof test.afterEach.always.cb.serial.skip;
}
export namespace test.afterEach.always.serial.todo {
	export const failing: typeof test.afterEach.always.failing.serial.todo;
	export const cb: typeof test.afterEach.always.cb.serial.todo;
}
export namespace test.afterEach.always.skip {
	export const serial: typeof test.afterEach.always.serial.skip;
	export const failing: typeof test.afterEach.always.failing.skip;
	export const cb: typeof test.afterEach.always.cb.skip;
}
export namespace test.afterEach.always.todo {
	export const serial: typeof test.afterEach.always.serial.todo;
	export const failing: typeof test.afterEach.always.failing.todo;
	export const cb: typeof test.afterEach.always.cb.todo;
}
export namespace test.afterEach.always.failing {
	export function serial(name: string, implementation: ContextualTest): void;
	export function serial(implementation: ContextualTest): void;
	export function serial(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.afterEach.always.cb.failing;
}
export namespace test.afterEach.always.failing.serial {
	export function skip(name: string, implementation: ContextualTest): void;
	export function skip(implementation: ContextualTest): void;
	export function skip(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualTest): void;
	export function todo(implementation: ContextualTest): void;
	export function todo(name: string, implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualTestContext>, ...args: any[]): void;
	export const cb: typeof test.afterEach.always.cb.failing.serial;
}
export namespace test.afterEach.always.failing.serial.skip {
	export const cb: typeof test.afterEach.always.cb.failing.serial.skip;
}
export namespace test.afterEach.always.failing.serial.todo {
	export const cb: typeof test.afterEach.always.cb.failing.serial.todo;
}
export namespace test.afterEach.always.failing.skip {
	export const serial: typeof test.afterEach.always.failing.serial.skip;
	export const cb: typeof test.afterEach.always.cb.failing.skip;
}
export namespace test.afterEach.always.failing.todo {
	export const serial: typeof test.afterEach.always.failing.serial.todo;
	export const cb: typeof test.afterEach.always.cb.failing.todo;
}
export namespace test.afterEach.always.cb {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualCallbackTest): void;
	export function failing(implementation: ContextualCallbackTest): void;
	export function failing(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.afterEach.always.cb.serial {
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.afterEach.always.cb.failing.serial;
}
export namespace test.afterEach.always.cb.serial.skip {
	export const failing: typeof test.afterEach.always.cb.failing.serial.skip;
}
export namespace test.afterEach.always.cb.serial.todo {
	export const failing: typeof test.afterEach.always.cb.failing.serial.todo;
}
export namespace test.afterEach.always.cb.skip {
	export const serial: typeof test.afterEach.always.cb.serial.skip;
	export const failing: typeof test.afterEach.always.cb.failing.skip;
}
export namespace test.afterEach.always.cb.todo {
	export const serial: typeof test.afterEach.always.cb.serial.todo;
	export const failing: typeof test.afterEach.always.cb.failing.todo;
}
export namespace test.afterEach.always.cb.failing {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.afterEach.always.cb.failing.serial {
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.afterEach.always.cb.failing.skip {
	export const serial: typeof test.afterEach.always.cb.failing.serial.skip;
}
export namespace test.afterEach.always.cb.failing.todo {
	export const serial: typeof test.afterEach.always.cb.failing.serial.todo;
}
export namespace test.cb {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const before: typeof test.before.cb;
	export const after: typeof test.after.cb;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(name: string, implementation: ContextualCallbackTest): void;
	export function failing(implementation: ContextualCallbackTest): void;
	export function failing(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function failing(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function only(name: string, implementation: ContextualCallbackTest): void;
	export function only(implementation: ContextualCallbackTest): void;
	export function only(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function only(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const beforeEach: typeof test.beforeEach.cb;
	export const afterEach: typeof test.afterEach.cb;
	export const always: typeof test.always.cb;
}
export namespace test.cb.serial {
	export const before: typeof test.before.cb.serial;
	export const after: typeof test.after.cb.serial;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.cb.failing.serial;
	export const only: typeof test.cb.only.serial;
	export const beforeEach: typeof test.beforeEach.cb.serial;
	export const afterEach: typeof test.afterEach.cb.serial;
	export const always: typeof test.always.cb.serial;
}
export namespace test.cb.serial.skip {
	export const before: typeof test.before.cb.serial.skip;
	export const after: typeof test.after.cb.serial.skip;
	export const failing: typeof test.cb.failing.serial.skip;
	export const beforeEach: typeof test.beforeEach.cb.serial.skip;
	export const afterEach: typeof test.afterEach.cb.serial.skip;
	export const always: typeof test.always.cb.serial.skip;
}
export namespace test.cb.serial.todo {
	export const before: typeof test.before.cb.serial.todo;
	export const after: typeof test.after.cb.serial.todo;
	export const failing: typeof test.cb.failing.serial.todo;
	export const beforeEach: typeof test.beforeEach.cb.serial.todo;
	export const afterEach: typeof test.afterEach.cb.serial.todo;
	export const always: typeof test.always.cb.serial.todo;
}
export namespace test.cb.skip {
	export const serial: typeof test.cb.serial.skip;
	export const before: typeof test.before.cb.skip;
	export const after: typeof test.after.cb.skip;
	export const failing: typeof test.cb.failing.skip;
	export const beforeEach: typeof test.beforeEach.cb.skip;
	export const afterEach: typeof test.afterEach.cb.skip;
	export const always: typeof test.always.cb.skip;
}
export namespace test.cb.todo {
	export const serial: typeof test.cb.serial.todo;
	export const before: typeof test.before.cb.todo;
	export const after: typeof test.after.cb.todo;
	export const failing: typeof test.cb.failing.todo;
	export const beforeEach: typeof test.beforeEach.cb.todo;
	export const afterEach: typeof test.afterEach.cb.todo;
	export const always: typeof test.always.cb.todo;
}
export namespace test.cb.failing {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const before: typeof test.before.cb.failing;
	export const after: typeof test.after.cb.failing;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function only(name: string, implementation: ContextualCallbackTest): void;
	export function only(implementation: ContextualCallbackTest): void;
	export function only(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function only(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const beforeEach: typeof test.beforeEach.cb.failing;
	export const afterEach: typeof test.afterEach.cb.failing;
	export const always: typeof test.always.cb.failing;
}
export namespace test.cb.failing.serial {
	export const before: typeof test.before.cb.failing.serial;
	export const after: typeof test.after.cb.failing.serial;
	export function skip(name: string, implementation: ContextualCallbackTest): void;
	export function skip(implementation: ContextualCallbackTest): void;
	export function skip(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function skip(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(name: string, implementation: ContextualCallbackTest): void;
	export function todo(implementation: ContextualCallbackTest): void;
	export function todo(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function todo(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const only: typeof test.cb.failing.only.serial;
	export const beforeEach: typeof test.beforeEach.cb.failing.serial;
	export const afterEach: typeof test.afterEach.cb.failing.serial;
	export const always: typeof test.always.cb.failing.serial;
}
export namespace test.cb.failing.serial.skip {
	export const before: typeof test.before.cb.failing.serial.skip;
	export const after: typeof test.after.cb.failing.serial.skip;
	export const beforeEach: typeof test.beforeEach.cb.failing.serial.skip;
	export const afterEach: typeof test.afterEach.cb.failing.serial.skip;
	export const always: typeof test.always.cb.failing.serial.skip;
}
export namespace test.cb.failing.serial.todo {
	export const before: typeof test.before.cb.failing.serial.todo;
	export const after: typeof test.after.cb.failing.serial.todo;
	export const beforeEach: typeof test.beforeEach.cb.failing.serial.todo;
	export const afterEach: typeof test.afterEach.cb.failing.serial.todo;
	export const always: typeof test.always.cb.failing.serial.todo;
}
export namespace test.cb.failing.skip {
	export const serial: typeof test.cb.failing.serial.skip;
	export const before: typeof test.before.cb.failing.skip;
	export const after: typeof test.after.cb.failing.skip;
	export const beforeEach: typeof test.beforeEach.cb.failing.skip;
	export const afterEach: typeof test.afterEach.cb.failing.skip;
	export const always: typeof test.always.cb.failing.skip;
}
export namespace test.cb.failing.todo {
	export const serial: typeof test.cb.failing.serial.todo;
	export const before: typeof test.before.cb.failing.todo;
	export const after: typeof test.after.cb.failing.todo;
	export const beforeEach: typeof test.beforeEach.cb.failing.todo;
	export const afterEach: typeof test.afterEach.cb.failing.todo;
	export const always: typeof test.always.cb.failing.todo;
}
export namespace test.cb.failing.only {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
}
export namespace test.cb.only {
	export function serial(name: string, implementation: ContextualCallbackTest): void;
	export function serial(implementation: ContextualCallbackTest): void;
	export function serial(name: string, implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export function serial(implementation: Macros<ContextualCallbackTestContext>, ...args: any[]): void;
	export const failing: typeof test.cb.failing.only;
}
export namespace test.cb.only.serial {
	export const failing: typeof test.cb.failing.only.serial;
}
export namespace test.always {
	export const after: typeof test.after.always;
	export const afterEach: typeof test.afterEach.always;
}
export namespace test.always.serial {
	export const after: typeof test.after.always.serial;
	export const failing: typeof test.always.failing.serial;
	export const afterEach: typeof test.afterEach.always.serial;
	export const cb: typeof test.always.cb.serial;
}
export namespace test.always.serial.skip {
	export const after: typeof test.after.always.serial.skip;
	export const failing: typeof test.always.failing.serial.skip;
	export const afterEach: typeof test.afterEach.always.serial.skip;
	export const cb: typeof test.always.cb.serial.skip;
}
export namespace test.always.serial.todo {
	export const after: typeof test.after.always.serial.todo;
	export const failing: typeof test.always.failing.serial.todo;
	export const afterEach: typeof test.afterEach.always.serial.todo;
	export const cb: typeof test.always.cb.serial.todo;
}
export namespace test.always.skip {
	export const serial: typeof test.always.serial.skip;
	export const after: typeof test.after.always.skip;
	export const failing: typeof test.always.failing.skip;
	export const afterEach: typeof test.afterEach.always.skip;
	export const cb: typeof test.always.cb.skip;
}
export namespace test.always.todo {
	export const serial: typeof test.always.serial.todo;
	export const after: typeof test.after.always.todo;
	export const failing: typeof test.always.failing.todo;
	export const afterEach: typeof test.afterEach.always.todo;
	export const cb: typeof test.always.cb.todo;
}
export namespace test.always.failing {
	export const after: typeof test.after.always.failing;
	export const afterEach: typeof test.afterEach.always.failing;
	export const cb: typeof test.always.cb.failing;
}
export namespace test.always.failing.serial {
	export const after: typeof test.after.always.failing.serial;
	export const afterEach: typeof test.afterEach.always.failing.serial;
	export const cb: typeof test.always.cb.failing.serial;
}
export namespace test.always.failing.serial.skip {
	export const after: typeof test.after.always.failing.serial.skip;
	export const afterEach: typeof test.afterEach.always.failing.serial.skip;
	export const cb: typeof test.always.cb.failing.serial.skip;
}
export namespace test.always.failing.serial.todo {
	export const after: typeof test.after.always.failing.serial.todo;
	export const afterEach: typeof test.afterEach.always.failing.serial.todo;
	export const cb: typeof test.always.cb.failing.serial.todo;
}
export namespace test.always.failing.skip {
	export const serial: typeof test.always.failing.serial.skip;
	export const after: typeof test.after.always.failing.skip;
	export const afterEach: typeof test.afterEach.always.failing.skip;
	export const cb: typeof test.always.cb.failing.skip;
}
export namespace test.always.failing.todo {
	export const serial: typeof test.always.failing.serial.todo;
	export const after: typeof test.after.always.failing.todo;
	export const afterEach: typeof test.afterEach.always.failing.todo;
	export const cb: typeof test.always.cb.failing.todo;
}
export namespace test.always.cb {
	export const after: typeof test.after.always.cb;
	export const afterEach: typeof test.afterEach.always.cb;
}
export namespace test.always.cb.serial {
	export const after: typeof test.after.always.cb.serial;
	export const failing: typeof test.always.cb.failing.serial;
	export const afterEach: typeof test.afterEach.always.cb.serial;
}
export namespace test.always.cb.serial.skip {
	export const after: typeof test.after.always.cb.serial.skip;
	export const failing: typeof test.always.cb.failing.serial.skip;
	export const afterEach: typeof test.afterEach.always.cb.serial.skip;
}
export namespace test.always.cb.serial.todo {
	export const after: typeof test.after.always.cb.serial.todo;
	export const failing: typeof test.always.cb.failing.serial.todo;
	export const afterEach: typeof test.afterEach.always.cb.serial.todo;
}
export namespace test.always.cb.skip {
	export const serial: typeof test.always.cb.serial.skip;
	export const after: typeof test.after.always.cb.skip;
	export const failing: typeof test.always.cb.failing.skip;
	export const afterEach: typeof test.afterEach.always.cb.skip;
}
export namespace test.always.cb.todo {
	export const serial: typeof test.always.cb.serial.todo;
	export const after: typeof test.after.always.cb.todo;
	export const failing: typeof test.always.cb.failing.todo;
	export const afterEach: typeof test.afterEach.always.cb.todo;
}
export namespace test.always.cb.failing {
	export const after: typeof test.after.always.cb.failing;
	export const afterEach: typeof test.afterEach.always.cb.failing;
}
export namespace test.always.cb.failing.serial {
	export const after: typeof test.after.always.cb.failing.serial;
	export const afterEach: typeof test.afterEach.always.cb.failing.serial;
}
export namespace test.always.cb.failing.serial.skip {
	export const after: typeof test.after.always.cb.failing.serial.skip;
	export const afterEach: typeof test.afterEach.always.cb.failing.serial.skip;
}
export namespace test.always.cb.failing.serial.todo {
	export const after: typeof test.after.always.cb.failing.serial.todo;
	export const afterEach: typeof test.afterEach.always.cb.failing.serial.todo;
}
export namespace test.always.cb.failing.skip {
	export const serial: typeof test.always.cb.failing.serial.skip;
	export const after: typeof test.after.always.cb.failing.skip;
	export const afterEach: typeof test.afterEach.always.cb.failing.skip;
}
export namespace test.always.cb.failing.todo {
	export const serial: typeof test.always.cb.failing.serial.todo;
	export const after: typeof test.after.always.cb.failing.todo;
	export const afterEach: typeof test.afterEach.always.cb.failing.todo;
}
