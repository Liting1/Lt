var arr = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7]
];
// 获取对应行的值 
// d 表示去值的方向 -- false 或不传参为 正向(左->右 上->下)
// d -- true 时表示反向

function getLine(x, d) {
    var brr = [],
        index;
    for (var i = 0; i < arr[0].length; i++) {
        if (d) {
            if (arr[x][arr[0].length - 1 - i] !== 0) {
                index = arr[0].length - 1 - i;
                brr.push(arr[x][index])
                arr[x][index] = 0;
            }
        } else {
            if (arr[x][i] !== 0) {
                index = i;
                brr.push(arr[x][i])
                arr[x][i] = 0;
            }
        }
    }
    return { brr, index };
}

// 获取对应的列
// d 表示去值的方向 -- false 或不传参为 正向(左->右 上->下)
// d -- true 时表示反向

function getColumn(y, d) {
    var brr = [],
        index;
    for (var i = 0; i < arr[0].length; i++) {
        if (d) {
            if (arr[arr[0].length - 1 - i][y] !== 0) {
                index = arr[0].length - 1 - i;
                brr.push(arr[index][y])
                arr[index][y] = 0;
            }
        } else {
            if (arr[i][y] !== 0) {
                index = i;
                brr.push(arr[i][y])
                arr[i][y] = 0;
            }
        }
    }
    return { brr, index };
}

// 当数组内部所有的数字都为零时 终止循环
function all0(arr) {
    var tu = true;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[i][j] !== 0) {
                tu = false;
            }
        }
    }
    return tu;
}

function getArr(arr) {
    var a = { index: 0 },
        array = [],
        isok = false;
    for (;;) {
        if (all0(arr)) return array;
        a = getLine(a.index, isok);
        array.push(...a.brr);
        a = getColumn(a.index, isok);
        array.push(...a.brr);
        isok = !isok;
    }

}
var a = getArr(arr);