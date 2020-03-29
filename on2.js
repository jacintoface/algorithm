const {swap, generateRandomArray, logTime} = require('./sourTestHelper')


let strategies = {
    sequence(a, b) {
        return a - b > 0
    },
    reverse(a, b) {
        return b - a > 0
    }
}

// 选择排序O(n2)

function selectionSort(arr, strategy = strategies.reverse) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (strategy(arr[minIndex], arr[j])) {
                let temp = arr[minIndex]
                arr[minIndex] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

//console.log(logTime(selectionSort, generateRandomArray(100, 0, 200)))


// 插入排序O(n2)
/*
和选择排序比较
1. 选择排序第二轮循环是稳定的全部便利，但是对于插入排序，当找到了合适的位置，第二轮循环是可以提前结束的
2. 对于近乎有序的数组，插入排序可能比后续nlogn 级别的算法更快。当数组本身就是有序的，那么插入排序将变为On级别的算法

* */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {

        // 1、最初版的插入排序(最大的特点就是可以终止排序，当z)
        // 寻找arr[i] 合适的插入位置， 吧每一个位置和前一个位置的元素进行比较，当j = 1 的时候和j = 0 比较，当j = 0 就没有比较的意义了，所以j 最小是1
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            } else {
                break
            }
        }

        // 也可以简写如下
        // for (let j = i; j > 0 && (arr[j] < arr[j - 1]); j--) {
        //     let temp = arr[j]
        //     arr[j] = arr[j - 1]
        //     arr[j - 1] = temp
        // }

        // 这里存在一个性能问题，就是每次切换，都会对对象进行赋值操作，赋值操作过多，可能反而性能不如选择排序

        // 2、 改进后的插入排序()
        let e = arr[i] // 用一个变量储存当前值
        let j;
        for (j = i; j > 0 && arr[j - 1] > e; j--) {
            arr[j] = arr[j - 1]
        }
        arr[j] = e
    }
    return arr
}

//logTime(insertSort, generateRandomArray(500000, 0, 500000))


// 归并排序 nlogn =========================================================================================>

function mergeSort(arr) {

    __mergeSort(arr, 0, arr.length - 1)

}

// 递归使用归并排序，对arr[l...r]的范围进行排序
function __mergeSort(arr, l, r) {
    if (l >= r) {
        return
    }

    /*
    优化方式2：
    对于元素个数较小时，使用插入排序
    if (r - l <= 15) {
        insertSort(arr, r, l)
        return
    }

    * */

    let mid = Math.floor((l + r) / 2)  //代码有隐含的危险，当l和r都非常大时，可能会出现溢出
    __mergeSort(arr, l, mid)
    __mergeSort(arr, mid + 1, r)
    _merge(arr, l, mid, r)

    /*

    优化方式1:

    if (arr[mid] > arr[mid + 1]) {  // 对于有序性较强的数组，可以加上此判断。因为当arr[mid] < arr[mid + 1], 此时数组已经是有序了，不用再排
        _merge(arr, l, mid, r)
    }
     */
}

// 将arr[l...mid]和arr[mid+1...r]两部分进行合并
function _merge(arr, l, mid, r) {
    let aux = new Array(r - l + 1) //临时空间，需要和arr一样大

    for (let i = l; i <= r; i++) {
        aux[i - l] = arr[l]
    }

    let j = l, k = mid + 1   // 指向临时数组的第一个
    for (let z = l; z <= r; z++) {
        if (j > mid) {
            arr[z] = aux[k - z]
            k++
        } else if (z > r) {
            arr[z] = aux[j - z]
            j++
        } else if (aux[j - z] < aux[k - z]) {
            arr[z] = aux[j - z]
            j++
        } else {
            arr[z] = aux[k - z]
            k++
        }
    }
}

//logTime(mergeSort, generateRandomArray(500000, 0, 500000))

// 快速排序 ============================================================================>
/*
退化成On2的常见情况
1. 几乎有序的数组，每次划分左边都划分为1个，右边划分多个  =====> 处理办法： 随机选择标志位，不总是选左边第一个
2. 大量重复元素的数组，每次划分也是 左边1个，右边划分多个
*/
function queueSort(arr) {
    return __queueSort(arr, 0, arr.length - 1)
}


function __queueSort(arr, l, r) {

    /*
    优化1：
    对于范围较小，可以使用插入排序
    if (r - l <= 15) {
        insertSort(arr, r, l)
    }

    */

    if (l >= r) {
        return
    }
    let p = __partition(arr, l, r)
    __queueSort(arr, l, p -1)
    __queueSort(arr,p+1, r)
    return arr;
}

// 对arr[l...r]部分进行排序操作
// 返回p， 使得arr[l...p-1] < arr[p] arr[p+1...r] > arr[p]
function __partition(arr, l, r) {


    /*
    优化2. 随机选择标志元素。不是固定使用左边的第一个
    swap(arr[l], arr[l + Math.floor(Math.random() * (r - l))])
    */

    let v = arr[l]  // 选择最左边的第一位作为标志元素，当数组是完全有序的时候，会退化为On2级别的算法

    let j = l
    // arr[l+1...j] < v ; arr[j+1...i] > v
    for (let i = l + 1; i <= r; i++) {
        if (arr[i] < v) {   // 当值等于v时，会被划分到 >= v的部分
            let temp = arr[j + 1]
            arr[j + 1] = arr[i]
            arr[i] = temp
            j++
        }
    }

    let temp2 = arr[l]
    arr[l] = arr[j]
    arr[j] = temp2

    return j
}

console.log(logTime(queueSort, generateRandomArray(500, 0, 5000)))

