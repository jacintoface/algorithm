

function binarySearch(arr, target) {
    let l = 0, r = arr.length - 1

    while ( l <= r ) {
        let middle = l + Math.floor((r - l) / 2)
        let value = arr[middle]

        if (target === value) {
            return middle
        }

        if (target < value) {
            r = middle - 1
        } else {
            l = middle + 1
        }
    }
    return -1
}

console.log(binarySearch([1, 2, 3, 4, 5], 9))

