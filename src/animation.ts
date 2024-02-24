import type { AnimationController, AnimationControllerConfig, AnimationHooks } from "./types.js";
import { linear } from "./easing.js";
import { createClockingMechanism, restrictNumber } from "./utils.js";

/**
 * Build an animation controller to animate values over time.
 */
export const createAnimationController = (
	config: AnimationControllerConfig,
	hooks: AnimationHooks = {},
): AnimationController => {
	const { loop = false, fps = 60 } = config;
	const frameDuration = 1000 / fps;
	const { setInterval, clearInterval } = createClockingMechanism(config.clock);
	let isAnimationActive = false;

	/** Callback to call for each frame, can be override */
	let _onFrame: Parameters<AnimationController["start"]>[0];
	let segments = config.segments; // Default to config segments, can be override
	let currentSegmentIndex = 0;
	let currentAnimatedValue = segments[0].initialValue;

	/**
	 * Start animation loop for a new segment, and reset segment specific values
	 */
	const animateSegment = () => {
		// Abort if animation is stopped
		if (!isAnimationActive) {
			return;
		}

		const { toValue, duration, easing = linear } = segments[currentSegmentIndex];

		const segmentDuration = typeof duration === "function" ? duration() : duration;

		const beginningValue =
			currentSegmentIndex > 0
				? segments[currentSegmentIndex - 1].toValue // Use previous segment value as beginning value
				: segments[0].initialValue; // Or use initial value for first segment

		let currentTimeWithinSegment = 0;

		// Progress through segment
		setInterval(() => {
			// Update time within segment
			currentTimeWithinSegment += frameDuration;

			// Update value
			currentAnimatedValue = restrictNumber(
				easing(currentTimeWithinSegment, beginningValue, toValue - beginningValue, segmentDuration),
				beginningValue,
				toValue,
			);

			// Notify of value change
			_onFrame(currentAnimatedValue);

			// When segment is over
			if (currentTimeWithinSegment >= segmentDuration) {
				clearInterval(); // Reset clock, it will be rescheduled on next segment if any
				const isLastSegment = currentSegmentIndex === segments.length - 1;

				// Loop to next segment
				if (!isLastSegment) {
					currentSegmentIndex++;
					animateSegment();
					return;
				}

				// End of animation - Looping
				if (loop) {
					currentSegmentIndex = 0;
					hooks.onLoop?.();
					animateSegment();
					return;
				}

				// End of animation - Quit
				hooks.onEnd?.();
			}
		}, frameDuration);
	};

	/**
	 * Reset and stop the animation and any running interval
	 */
	const resetAndStop = () => {
		clearInterval();
		currentSegmentIndex = 0;
		currentAnimatedValue = segments[0].initialValue;
	};

	return {
		start(onFrame, withNewSegments) {
			_onFrame = onFrame; // Override
			if (withNewSegments) {
				segments = withNewSegments;
			}

			isAnimationActive = true;
			resetAndStop();
			hooks.onStart?.();
			// Auto-start
			animateSegment();
		},
		stop() {
			isAnimationActive = false;
			resetAndStop();
			hooks.onStop?.();
		},
	};
};
