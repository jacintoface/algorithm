const {generateRandomArray, logTime} = require('../sourTestHelper')

class MaxHeap {

    // 一条一条加入，时间复杂度是O(nlogn)
    // constructor (capacity) {
    //     this.data = new Array(capacity + 1)
    //     this.count = 0
    // }


    // 将数组进行headpify的过程，算法复杂度是O(n)
    constructor(arr, n) {
        this.data = new Array(n)
        this.count = n

        for (let i = 0; i < arr.length; i++) {
            this.data[i + 1] = arr[i]
        }

        for(let j = this.count / 2; j >= 1; j--) {
            this._shiftDown(j)
        }
    }

    size() {
        return this.count
    }

    isEmpty() {
        return this.count === 0
    }

    insert(item) {
        // 某些语言可能需要判断数组是否越界
        this.data[this.count + 1] = item
        this.count++
        this.__shiftUp(this.count)
    }

    extractMax() {
        if (this.count <= 0) return;

        let ret = this.data[1]

        swap(this.data, 1, this.count)

        this.count--
        this._shiftDown(1)
        return ret

    }

    __shiftUp(k) {
        while (k > 1 && this.data[Math.floor(k / 2)] < this.data[k]) {
            swap(this.data, Math.floor(k / 2), k)
            k = Math.floor(k / 2)
        }
    }

    _shiftDown(k) {
        while (2 * k <= this.count) {
            let j = 2 * k
            if (j + 1 <= this.count && this.data[j + 1] > this.data[j]) {
                j += 1
            }
            if (this.data[k] >= this.data[j]) {
                break
            }

            swap(this.data, k, j)
            k = j
        }
    }

}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

let maxHeap = new MaxHeap(10)

let arr = generateRandomArray(10, 100, 10000)
for (let i = 0; i < arr.length; i++) {
    maxHeap.insert(arr[i])
}

while (!maxHeap.isEmpty()) {
    // 依次取出，赋值到一个数组中，就是堆排序
    console.log(maxHeap.extractMax())
}
