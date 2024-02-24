import { type EasingFunction } from "./types.js";

export const linear: EasingFunction = (t, b, c, d) => (c * t) / d + b;
export const inQuad: EasingFunction = (t, b, c, d) => c * (t /= d) * t + b;
export const outQuad: EasingFunction = (t, b, c, d) => -c * (t /= d) * (t - 2) + b;
export const inOutQuad: EasingFunction = (t, b, c, d) => {
	if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
	return (-c / 2) * (--t * (t - 2) - 1) + b;
};

export const inCubic: EasingFunction = (t, b, c, d) => c * (t /= d) * t * t + b;
export const outCubic: EasingFunction = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;
export const inOutCubic: EasingFunction = (t, b, c, d) => {
	if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
	return (c / 2) * ((t -= 2) * t * t + 2) + b;
};

export const inQuart: EasingFunction = (t, b, c, d) => c * (t /= d) * t * t * t + b;
export const outQuart: EasingFunction = (t, b, c, d) => -c * ((t = t / d - 1) * t * t * t - 1) + b;
export const inOutQuart: EasingFunction = (t, b, c, d) => {
	if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
	return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
};

export const inQuint: EasingFunction = (t, b, c, d) => c * (t /= d) * t * t * t * t + b;
export const outQuint: EasingFunction = (t, b, c, d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b;
export const inOutQuint: EasingFunction = (t, b, c, d) => {
	if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
	return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
};

export const inSine: EasingFunction = (t, b, c, d) => -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
export const outSine: EasingFunction = (t, b, c, d) => c * Math.sin((t / d) * (Math.PI / 2)) + b;
export const inOutSine: EasingFunction = (t, b, c, d) => (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
export const inExpo: EasingFunction = (t, b, c, d) => (t === 0 ? b : c * 2 ** (10 * (t / d - 1)) + b);
export const outExpo: EasingFunction = (t, b, c, d) =>
	t === d ? b + c : c * (-(2 ** ((-10 * t) / d)) + 1) + b;
export const inOutExpo: EasingFunction = (t, b, c, d) => {
	if (t === 0) return b;
	if (t === d) return b + c;
	if ((t /= d / 2) < 1) return (c / 2) * 2 ** (10 * (t - 1)) + b;
	return (c / 2) * (-(2 ** (-10 * --t)) + 2) + b;
};

export const inCirc: EasingFunction = (t, b, c, d) => -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
export const outCirc: EasingFunction = (t, b, c, d) => c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
export const inOutCirc: EasingFunction = (t, b, c, d) => {
	if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
	return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};

export const inElastic: EasingFunction = (t, b, c, d) => {
	let s = 1.701_58;
	let p = 0;
	let a = c;

	if (t === 0) return b;
	if ((t /= d) === 1) return b + c;
	p ||= d * 0.3;
	if (a < Math.abs(c)) {
		a = c;
		s = p / 4;
	} else s = (p / (2 * Math.PI)) * Math.asin(c / a);

	return -(a * 2 ** (10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
};

export const outElastic: EasingFunction = (t, b, c, d) => {
	let s = 1.701_58;
	let p = 0;
	let a = c;

	if (t === 0) return b;
	if ((t /= d) === 1) return b + c;
	p ||= d * 0.3;
	if (a < Math.abs(c)) {
		a = c;
		s = p / 4;
	} else s = (p / (2 * Math.PI)) * Math.asin(c / a);

	return a * 2 ** (-10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
};

export const inOutElastic: EasingFunction = (t, b, c, d) => {
	let s = 1.701_58;
	let p = 0;
	let a = c;

	if (t === 0) return b;
	if ((t /= d / 2) === 2) return b + c;
	p ||= d * (0.3 * 1.5);
	if (a < Math.abs(c)) {
		a = c;
		s = p / 4;
	} else s = (p / (2 * Math.PI)) * Math.asin(c / a);

	if (t < 1) return -0.5 * (a * 2 ** (10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
	return a * 2 ** (-10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b;
};

export const inBack: EasingFunction = (t, b, c, d) => {
	const s = 1.701_58;
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

export const outBack: EasingFunction = (t, b, c, d) => {
	const s = 1.701_58;
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

export const inOutBack: EasingFunction = (t, b, c, d) => {
	let s = 1.701_58;
	if ((t /= d / 2) < 1) return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};

export const outBounce: EasingFunction = (t, b, c, d) => {
	if ((t /= d) < 1 / 2.75) {
		return c * (7.5625 * t * t) + b;
	}

	if (t < 2 / 2.75) {
		return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	}

	if (t < 2.5 / 2.75) {
		return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	}

	return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984_375) + b;
};

export const inBounce: EasingFunction = (t, b, c, d) => c - outBounce(d - t, 0, c, d) + b;

export const inOutBounce: EasingFunction = (t, b, c, d) => {
	if (t < d / 2) return inBounce(t * 2, 0, c, d) * 0.5 + b;
	return outBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};
