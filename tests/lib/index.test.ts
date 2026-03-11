import { describe, it, expect } from 'vitest';
import { average, de_nan } from '$lib/index';


describe('de_nan', () => {
    it('returns 0 for NaN', () => {
        expect(de_nan(NaN)).toBe(0);
    });

    it('returns the value unchanged for normal numbers', () => {
        expect(de_nan(5)).toBe(5);
        expect(de_nan(0)).toBe(0);
        expect(de_nan(-3.14)).toBe(-3.14);
    });
});

describe('average (numbers)', () => {
    it('averages a basic list of numbers', () => {
        expect(average([1, 2, 3])).toBe('2.00');
    });

    it('averages a single number', () => {
        expect(average([7])).toBe('7.00');
    });

    it('averages decimals and rounds to 2 places', () => {
        expect(average([1, 2])).toBe('1.50');
        expect(average([1, 1, 2])).toBe('1.33');
    });

    it('returns "0.00" for an all-zero array', () => {
        expect(average([0, 0, 0])).toBe(0.00);
    });

    it('averages decimals and rounds to 2 places', () => {
        expect(average([1, 2]) + average([1, 1, 2])).toBe(2.83);
    });    
});

// Desired behavior: boolean average should return the proportion of true values as a decimal (0–1),
// not a boolean. This makes climb1 usable as a reliability metric (e.g. 0.67 = climbed 67% of matches).
describe('average (booleans)', () => {
    it('returns proportion of true as a decimal', () => {
        expect(average([true, true, false])).toBeCloseTo(0.67, 2);
    });

    it('returns 0.33 when one of three is true', () => {
        expect(average([false, false, true])).toBeCloseTo(0.33, 2);
    });

    it('returns 0.5 when exactly half are true', () => {
        expect(average([true, false])).toBe(0.5);
    });

    it('returns 1 for all-true array', () => {
        expect(average([true, true, true])).toBe(1);
    });

    it('returns 0 for all-false array', () => {
        expect(average([false, false, false])).toBe(0);
    });
});
