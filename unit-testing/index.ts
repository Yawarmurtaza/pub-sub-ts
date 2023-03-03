export function add(numbers: string): number {
    const integers: number[] = numbers.split(',').map(x => parseInt(x));
    const negatives: number[] = integers.filter(x => x < 0);

    if (negatives.length > 0) {
        throw new RangeError('Negatives are not allowed: ' + negatives.join(', '));
    }

    return integers
        .filter((number) => number < 1000)
        .reduce((a, b) => a + b, 0);
}

const result2: number = add('1, 2, 4, 5');
console.log(result2);

