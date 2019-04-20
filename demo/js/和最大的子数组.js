/*function maxSequence(arr){
	if(!arr.length) return 0;
	var big = 0;
	for(var m = 0; m<arr.length; m++) {
			var sum = 0, brr = [];
		for(var i = m; i< arr.length; i++) {
			brr.push(sum += arr[i]);
		}
		var max = Math.max.apply(null,brr);
		if(max > big) {
			big = max;
		}
	}
	return big < 0 ? 0 : big;
}*/
var maxSequence = function(arr){
  var min = 0, ans = 0, i, sum = 0;
  for (i = 0; i < arr.length; ++i) {
    sum += arr[i]; // 0 + -2 = -2
    			   // -2 + 1 = -1
    			   // -1 + -3 = -4
    min = Math.min(sum, min);
    ans = Math.max(ans, sum - min);
    console.log(sum, min, ans);
    // sum = -2, min = -2, ans = 0;
    // -1			-2		1
  }
  return ans;
}
var a = maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// console.log(a);
// should be 6: [4, -1, 2, 1]
