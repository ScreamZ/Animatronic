import { createAnimationController } from "../src/index.js";

// This example will animate the HSL color from red to black and black to red over 6000
const controller = createAnimationController(
	{
		loop: true,
		fps: 30,
		segments: [
			{ initialValue: 0, duration: 3000, toValue: 100 },
			{ duration: 3000, toValue: 10 },
		],
	},
	{
		onStop() {
			console.log(`STOPPED - HSL(0, 100%, 0%)`);
		},
	},
);

console.log("Starting color pulsing from 0% to 100% and back to 0%");
controller.start((value) => {
	console.log(`HSL(0, 100%, ${value.toFixed(1)}%)`);
});

setTimeout(() => {
	controller.stop();
}, 10_000);
