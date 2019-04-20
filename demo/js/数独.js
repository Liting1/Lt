var arr = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [6, 5, 4, 4, 5, 6, 7, 8, 9],
    [7, 8, 9, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 9, 9, 9, 7, 8, 9],
    [1, 2, 3, 9, 9, 9, 7, 8, 9],
    [1, 2, 3, 9, 9, 9, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
];
var bos = [];
var isok = true;
for (var c = 1; c <= 3; c++) {
    for (var h = 0; h < 9; h++) {
        if (h % 3 == 0) {
            var arr1 = [];
            bos.push(arr1);
        }
        arr1.push(...arr[h].slice((c - 1) * 3, 3 * c));
    }
}
for (var i = 0; i < arr.length; i++) {
    if (new Set(arr[i]).size < 9 || new Set(bos[i]).size) {
        isok = false;
    }
}
for(var m = 0; m<arr.length; m++){
    var a = [];
    for(var n = 0; n<arr.length; n++){
        a.push(arr[n][m])
    }
    if(new Set(a).size < 9) isok = false;
}
console.log(isok);