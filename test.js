const {swap, generateRandomArray, logTime} = require('./sourTestHelper')
function quickSort(arr) {
    return __quickSort(arr, 0, arr.length - 1)
}

function __quickSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    let p = __partition(arr, l, r)
    __quickSort(arr, l, p-1)
    __quickSort(arr, p+1, r)
    return arr;
}

function __partition(arr, l, r) {
    let v = arr[l]

    let j = l;

    for (let i = l + 1; i <= r; i++) {
        if (arr[i] < v) {
            let temp = arr[i]
            arr[i] = arr[j+1]
            arr[j+1] = temp
            j++
        }
    }
    let temp2 = arr[j]
    arr[j] = arr[l]
    arr[l] = temp2
    return j
}

console.log(logTime(quickSort, generateRandomArray(50, 0, 5000)))
