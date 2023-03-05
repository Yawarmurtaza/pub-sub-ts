"use strict";
exports.__esModule = true;
exports.DoBinarySearch = void 0;
function DoBinarySearch(arr, target) {
    var start = 0;
    var end = arr.length - 1;
    while (start <= end) {
        var mid = (end + start) / 2;
        var currentValue = arr[mid];
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
exports.DoBinarySearch = DoBinarySearch;
