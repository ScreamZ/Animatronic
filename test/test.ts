import test from "ava";
import sinon from "sinon";
import { createAnimationController } from "../src/index.ts";

const delay = async (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

test("Create a controller with linear", async (t) => {
	const controller = createAnimationController({
		segments: [{ initialValue: 0, toValue: 100, duration: 1000 }],
	});
	const valuesLists: number[] = [];
	controller.start((v) => valuesLists.push(v));
	await delay(100);
	t.is(valuesLists[0], 100 / 60);
});

test("Don't loop", async (t) => {
	const controller = createAnimationController(
		{
			segments: [{ initialValue: 0, toValue: 100, duration: 100 }],
		},
		{ onLoop: t.fail, onEnd: t.pass },
	);
	controller.start(() => {
		// Do nothing
	});
	await delay(200);
});

test("Loop correctly", async (t) =>
	new Promise((resolve) => {
		const controller = createAnimationController(
			{
				segments: [{ initialValue: 0, toValue: 100, duration: 1000 }],
				loop: true,
			},
			{
				onLoop() {
					t.pass();
					controller.stop();
					resolve();
				},
				onEnd: t.fail,
			},
		);
		controller.start(() => {
			// Do nothing
		});
	}));

test("Stop correctly and call onStop", async (t) => {
	let shouldNotEmitAnymore = false;
	const onStop = sinon.fake();

	const controller = createAnimationController(
		{
			segments: [{ initialValue: 0, toValue: 100, duration: 1000 }],
			loop: true,
		},
		{ onStop },
	);

	controller.start(() => {
		if (shouldNotEmitAnymore) {
			t.fail();
		}
	});

	await delay(100);

	controller.stop();
	shouldNotEmitAnymore = true;

	await delay(100);
	t.true(onStop.calledOnce);
});

test("Override correctly", async (t) =>
	new Promise((resolve) => {
		const controller = createAnimationController({
			segments: [{ initialValue: 0, toValue: 100, duration: 100 }],
			loop: true,
		});

		controller.start(
			(v) => {
				if (v >= 200) {
					t.pass();
					controller.stop();
					resolve();
				}
			},
			[{ initialValue: 0, toValue: 200, duration: 100 }],
		);
	}));
