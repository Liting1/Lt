var arr = [
    [20, 21, 22, 23, 24, 7],
    [19, 32, 33, 34, 25, 8],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
    [18, 31, 36, 35, 26, 9],
]



function snail(arr) {
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

    function getColumn(y, d) {
        var brr = [],
            index;
        for (var i = 0; i < arr.length; i++) {
            if (d) {
                if (arr[arr.length - 1 - i][y] !== 0) {
                    index = arr.length - 1 - i;
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

    function all0(arr,x) {
        var tu = true;
        for (var i = 0; i < arr[x].length; i++) {
            if (arr[x][i] !== 0) {
                tu = false;
            }
        }
        return tu;
    }

    function init() {
        var a = { index: 0 },
            array = [],
            isok = false;
        if (arr.length % 2 == 0) {
            x = arr.length / 2;
        } else {
            x = Math.floor(arr.length / 2);
        }
        for (;;) {
            if (all0(arr,x)) return array;
            a = getLine(a.index, isok);
            array.push(...a.brr);
            a = getColumn(a.index, isok);
            array.push(...a.brr);
            isok = !isok;
        }
    }
    return init();
}

var a = snail(arr);
console.log(a);

/*function snail(array) {
  var vector = [];
  while (array.length) {
    vector.push(...array.shift());
    array.map(row => vector.push(row.pop()));
    array.reverse().map(row => row.reverse());
  }
  return vector;
}*/