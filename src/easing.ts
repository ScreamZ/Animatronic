import {type EasingFunction} from './types.js';

const outBounce = (t: number, b: number, c: number, d: number) => {
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

const inBounce = (t: number, b: number, c: number, d: number) =>
	c - outBounce(d - t, 0, c, d) + b;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Easing = Object.freeze({
	linear(t, b, c, d) {
		return (c * t) / d + b;
	},
	inQuad(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	outQuad(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	inOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return (c / 2) * t * t + b;
		}

		return (-c / 2) * (--t * (t - 2) - 1) + b;
	},
	inCubic(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	outCubic(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	inOutCubic(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return (c / 2) * t * t * t + b;
		}

		return (c / 2) * ((t -= 2) * t * t + 2) + b;
	},
	inQuart(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	outQuart(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	inOutQuart(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return (c / 2) * t * t * t * t + b;
		}

		return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
	},
	inQuint(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	outQuint(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	inOutQuint(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return (c / 2) * t * t * t * t * t + b;
		}

		return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
	},
	inSine(t, b, c, d) {
		return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
	},
	outSine(t, b, c, d) {
		return c * Math.sin((t / d) * (Math.PI / 2)) + b;
	},
	inOutSine(t, b, c, d) {
		return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
	},
	inExpo(t, b, c, d) {
		return t === 0 ? b : c * 2 ** (10 * (t / d - 1)) + b;
	},
	outExpo(t, b, c, d) {
		return t === d ? b + c : c * (-(2 ** ((-10 * t) / d)) + 1) + b;
	},
	inOutExpo(t, b, c, d) {
		if (t === 0) {
			return b;
		}

		if (t === d) {
			return b + c;
		}

		if ((t /= d / 2) < 1) {
			return (c / 2) * 2 ** (10 * (t - 1)) + b;
		}

		return (c / 2) * (-(2 ** (-10 * --t)) + 2) + b;
	},
	inCirc(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	outCirc(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	inOutCirc(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
		}

		return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	inElastic(t, b, c, d) {
		let s = 1.701_58;
		let p = 0;
		let a = c;

		if (t === 0) {
			return b;
		}

		if ((t /= d) === 1) {
			return b + c;
		}

		p ||= d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = (p / (2 * Math.PI)) * Math.asin(c / a);
		}

		return (
			-(
				a
        * 2 ** (10 * (t -= 1))
        * Math.sin(((t * d - s) * (2 * Math.PI)) / p)
			) + b
		);
	},
	outElastic(t, b, c, d) {
		let s = 1.701_58;
		let p = 0;
		let a = c;

		if (t === 0) {
			return b;
		}

		if ((t /= d) === 1) {
			return b + c;
		}

		p ||= d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = (p / (2 * Math.PI)) * Math.asin(c / a);
		}

		return (
			a * 2 ** (-10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b
		);
	},
	inOutElastic(t, b, c, d) {
		let s = 1.701_58;
		let p = 0;
		let a = c;

		if (t === 0) {
			return b;
		}

		if ((t /= d / 2) === 2) {
			return b + c;
		}

		p ||= d * (0.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = (p / (2 * Math.PI)) * Math.asin(c / a);
		}

		if (t < 1) {
			return (
				-0.5
          * (a
            * 2 ** (10 * (t -= 1))
            * Math.sin(((t * d - s) * (2 * Math.PI)) / p))
        + b
			);
		}

		return (
			a
        * 2 ** (-10 * (t -= 1))
        * Math.sin(((t * d - s) * (2 * Math.PI)) / p)
        * 0.5
      + c
      + b
		);
	},
	inBack(t, b, c, d) {
		const s = 1.701_58;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	outBack(t, b, c, d) {
		const s = 1.701_58;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	inOutBack(t, b, c, d) {
		let s = 1.701_58;
		if ((t /= d / 2) < 1) {
			return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
		}

		return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	},
	inBounce,
	outBounce,
	inOutBounce(t, b, c, d) {
		if (t < d / 2) {
			return inBounce(t * 2, 0, c, d) * 0.5 + b;
		}

		return outBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	},
}) satisfies Record<string, EasingFunction>;
