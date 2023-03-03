import { DoBinarySearch } from "../binarySearch";

describe("Binary Search", () => {
    test("should return 8", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = 8;
        const indexOfTarget = DoBinarySearch(arr, target);
        expect(indexOfTarget).toBe(7);
    })
});