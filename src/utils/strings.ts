// utils/string.ts

/**
 * @description Verify if the value is a string (includes empty strings).
 * @param {unknown} value Value to verify.
 * @returns {boolean} Result of the verification.
 */
const isString = (value: unknown): value is string => {
	return typeof value === 'string';
};

/**
 * @description Verify if the value is an empty string: `` (excludes null, Undefined, etc).
 * @param {unknown} value Value to verify.
 * @returns {boolean} Result of the verification.
 */
const isEmptyString = (value: unknown): boolean => {
	return isString(value) && value.trim() === '';
};

export { isString, isEmptyString };
