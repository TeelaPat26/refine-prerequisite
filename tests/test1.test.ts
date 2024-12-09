import { multiplyTwoNumbers } from "../src"

test('multiply two numbers', () => {
    const result = multiplyTwoNumbers(2, 3);
    expect(result).toBe(6);
})