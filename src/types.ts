import type { ReadonlyDeep } from "type-fest";
import type ClockTimer from "@gamestdio/timer";

type Clock = ClockTimer.default;

/**
 * Each function accepts arguments for the parameters t, b, c and d.
 *
 * @param timePassed Time - Amount of time that has passed since the beginning of the animation. Usually starts at 0 and is slowly increased using a game loop or other update function.
 * @param startValue Beginning value - The starting point of the animation. Usually it's a static value, you can start at 0 for example.
 * @param deltaValue Change in value - The amount of change needed to go from starting point to end point. It's also usually a static value.
 * @param duration Duration - Amount of time the animation will take. Usually a static value as well.
 *
 * So in short b, c and d are mostly used as static settings for the easing and t needs to get updated frequently to make the animation progress.
 *
 * The value for t and d can be given in time (e.g. seconds or milliseconds) but you could also use frames or percentage of completion. As long as they both use the same unit. Take a look at the equation for linear motion for example (it's the most simple one and not so much a real ease, but a good example):
 * @see https://spicyyoghurt.com/tools/easing-functions#easinglist
 */
export type EasingFunction = (
	timePassed: number,
	startValue: number,
	deltaValue: number,
	duration: number,
) => number;

export type AnimationSegment = {
	/**
	 * Value to move to from previous segment (or initial value if first segment)
	 */
	toValue: number;
	/**
	 * Static or dynamic duration of the segment. Allows to add randomness or dynamic duration to the animation.
	 */
	duration: number | (() => number);
	/**
	 * Easing function to use for the segment. If not provided, the default easing function will be used which is linear.
	 */
	easing?: EasingFunction;
};

/**
 * Animation segments with initial value for the first segment.
 */
export type SegmentsConfig = [AnimationSegment & { initialValue: number }, ...AnimationSegment[]];

export type AnimationControllerConfig = {
	/**
	 * Whether the animation should loop back to the first segment when it reaches the end.
	 */
	loop?: boolean;
	/**
	 * Segments to animate through. First segment should have an initial value.
	 * If dynamic segments are needed, use the `start` method to provide new segments. This will override the segments from the config.
	 */
	segments: SegmentsConfig;
	/**
	 * Frames per second for the animation. Defaults to 60.
	 */
	fps?: number;

	/**
	 * TODO: dynamic fps
	 * Static or dynamic fps. Allows to add randomness or adjust fps dynamically.
	 * Re-evaluated on each frame.
	 */
	// fps?: number | (() => number);

	/**
	 * This allows to cancel animation externally and synchronize with simulation interval.
	 *
	 * @see An instance of `ClockTimer` from `@gamestdio/timer` package. Or a compliant API.
	 */
	clock?: Clock | Readonly<Clock> | ReadonlyDeep<Clock>;
};

export type AnimationHooks = {
	/**
	 * Called when the animation starts after calling `start` method.
	 */
	onStart?(): void;
	/**
	 * Called when the animation stops after calling `stop` method.
	 */
	onStop?(): void;
	/**
	 * Called when the animation end in case of an animation without `loop` set to true.
	 */
	onEnd?(): void;
	/**
	 * Whenever the animation loops back to the first segment. If `loop` is true only.
	 */
	onLoop?(): void;
};

export type AnimationController = {
	/**
	 * Start the animation.
	 */
	start: (
		/**
		 * Callback to be called on each frame of the animation.
		 */
		onFrame: (value: number) => void,
		/**
		 * Optional new segments to use for the animation. Will override the segments from the config.
		 */
		withNewSegments?: SegmentsConfig,
	) => void;
	/**
	 * Stop the animation.
	 */
	stop: () => void;
};
