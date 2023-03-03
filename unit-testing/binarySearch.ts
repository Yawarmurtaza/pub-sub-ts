export function DoBinarySearch(arr: number[], target: number): number {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = (end + start) / 2;
        const currentValue = arr[mid];
        if (target > currentValue) {
            start = mid;
        }
        else if (target < currentValue) {
            end = mid;
        }
        else {
            return mid;
        }
    }

    return -1;
}