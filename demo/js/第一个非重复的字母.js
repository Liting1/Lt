function firstNonRepeatingLetter(s) {
	if(!s) return s;
	for(var i = 0; i<s.length; i++) {
		var isok = true;
		for(var j = 0; j<s.length; j++){
			if(s[i].toLowerCase() == s[j].toLowerCase() && i !== j) {
				// 说明该字符串至少出现了两次以上
				isok = false;
				continue;
			}
		}
		if(!isok && i == s.length-1) return '';
		if(isok) return s[i];
	}
}

var s = firstNonRepeatingLetter('');
console.log(s);


/*function firstNonRepeatingLetter(s) {
  for(var i in s) {
    if(s.match(new RegExp(s[i],"gi")).length === 1) {
      return s[i];
    }
  }
  return '';
}*/

