

module.exports = {
    generateRandomArray (n, rangL, rangeR) {
        var arr = []
        for (let i = 0; i < n; i++) {
            arr.push(rangL + Math.floor((rangeR - rangL) * Math.random()))
        }
       return  arr
    },
    swap (a, b) {
        let temp = a;
        a = b;
        b = temp
        return [a, b]
    },
    logTime (fn, arr) {
        console.time(fn.name)
        let result = fn(arr)
        console.timeEnd(fn.name)
        return result
    },
    isSorted (arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                return false
            }
        }
        return true
    }
}
