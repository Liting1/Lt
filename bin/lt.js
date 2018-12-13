
function lt (a) {
	this.name = 'mylt';
	if(typeof a === 'object') {
		// 把dom 对象添加到lt对象中进行操作
		 this[0] = a;
	}
	if(typeof a === 'string') {
		var dom = document.querySelectorAll(a);
		//return new lt(dom);
		return dom.length>1?dom: dom[0];
	}
}

lt.prototype = {};
/*
	方法的作用: 生成随机数
	参数说明: 
		不传参数时生成一个四位数的随机数
		传一个参数生成指定位数的随机数 类型为 Number
	返回值说明：
		返回一个随机数
*/

lt.randomNum = function () {
	var arg = arguments.length, r = '', n = 0;
	if (!arg) n = 4;
	if(arg === 1) n = arguments[0];
	for(var i = 0; i < n; i++) {
		r += String(Math.floor(Math.random()*10));
	}
	// parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
	return Number(r);
};

/*
	方法的作用：生成一个随机颜色值
	参数说明：
		不传参数 返回一个十六进制的颜色值
*/

lt.randomColor = function(){
	var arg = arguments.length, color = '#', str ='0123456789abcdef', n = 0;
	if(!arg) {
		for(var i = 0; i < 6; i++) {
			n =  Math.floor((Math.random()*str.length))
			color += str[n];
		}
		return color;
	}
	// if(!arg) 
};

/*
	方法的作用：随机返回[0-9] | [A-Z] | [a-z]随机字符
	参数说明：
		不传参数返回一个随机字符串
		传一个数字参数返回指定个数的随机字符
*/
lt.randomChar = function(a) {
	var arr = [], index = 0, str = '';
	for(var i = 0; i < 10; i++) arr.push(i);
	for(var j = 65; j < 91; j++) arr.push(String.fromCharCode(j));
	for(var k = 97; k< 123; k ++) arr.push(String.fromCharCode(k));
	index = Math.floor((Math.random()*arr.length));
	if(a) {
		for (var n = 0; n < a; n++) {
			str += String(arr[Math.floor((Math.random()*arr.length))])
		}
		return str;
	}
	return String(arr[index])
};

/**
 * [allSelected 选中所以得多选框或者取消所以得单选框]
 * @param  {[arr]} d    [description]
 * @param  {[type]} bool [是你需要全部选中的多选框集合]
 * @return {[undefined]}      无
 */
lt.allSelected = function (d, bool) {
	bool = bool || true;
	if(bool) {
		for(var i = 0; i < d.length; i++) {
			d[i].checked = true
		}
	} else {
		for(var i = 0; i < d.length; i++) {
			d[i].checked = false
		}
	}
	bool = !bool;
};

/*
	方法作用说明：反向选中所有的多选框
	参数说明：
		第一个参数是你需要控制的所有单选框

*/

lt.invertSelected = function (d, bool) {
	bool = bool || true;
	for (var i = 0; i < d.length; i++) {
		if (d[i].checked) {
			d[i].checked = false
		} else {
			d[i].checked = true
		}
	}
	bool = !bool;
};


/*
	方法作用说明：给数组按规定的项进行排序
		参数说明：
			第一个参数是需要排序的数组对象
			第二个参数是需要根据那一项排序的项类型是字符串
			第三个参数类型是布尔，true为升序false为降序，不传参数默认为升序
*/

lt.objSort = function (arr, str, bool) {
	var len = arguments.length;
	arr.sort(function(n1, n2){
		if(len=== 2 || bool) {
			return parseFloat(n1[str]) > parseFloat(n2[str])
		} else {
			return parseFloat(n1[str]) < parseFloat(n2[str])
		}
	});
	return arr
};

/*
	方法作用说明：使指定的元素的轮动条滚到顶部位置
	参数说明：
		第一个参条数是有滚动的元素，如果是浏览器对象则传window对象
		如果只传一个参数，则没有动画
		第二个参数是运动时间
*/

lt.scrollTo = function (dom, time) {
	if(dom === window) {
		var m = window.scrollY; // 运动的开始位置
		var y = m; // 运动的结束位置
		if(!time)  return window.scrollTo(0, 0);
		var timer = setInterval(function(){
			if(y>0) {
				window.scrollTo(0, y -= (m/time))
			} else {
				clearInterval(timer);
			}
		}, 1)
	}
};

/*
	方法作用说明：url参数转换为JS对象
	参数说明：
		参数为需要转换的字符串， 类型为String
	返回值说明：
		返回一个处理好的js对象
*/

lt.toObject = function (str) {
	str = str.split('?'),
	arr = str[str.length-1].split('&'),
	obj = {};
	for(var i = 0; i< arr.length; i++) {
		obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
	}
	return obj;
};

/*
	方法作用说明：文字过滤敏感字
	参数说明：
		第一个是需要过滤的字符串，类型为String
		第二个参数是需要过滤的敏感字符，类型为数组Array
	返回值说明：
		返回过滤后的字符串。
*/

lt.strFilter = function(str, arr) {
	for(var i = 0; i < arr.length; i++) {
		var exp = new RegExp(arr[i], 'ig'),
		x = '';
		for(var j = 0; j < arr[i].length; j ++) x += '*';
		str = str.replace(exp, x);	
	}
	return str;
};

/*
	方法作用说明：自制滚动条
	布局模板：
		`<div class="box">
			<div class="content">内容</div>
			<div class="scrollBar"><div class="bar"></div></div>
		</div>`
	参数说明：
		第一个参数为 内容容器的父元素即box
		第二个参数为鼠标滚轮的步长(默认为20)
*/

lt.scrollBar = function (box , d) {
		var content = box.children[0],
			scrollBar = box.children[1],
			bar = scrollBar.children[0],
			contentHeight = content.offsetHeight, // 内容区域的高度
			boxHeight = box.offsetHeight, // 最外层盒子的高度
			poor = contentHeight - boxHeight, // 被卷去的高度
			maxHeight = scrollBar.offsetHeight - bar.offsetHeight, // 滚动条的最大滚动距离
			minWheel =  box.offsetHeight-content.offsetHeight;
		bar.onmousedown = function (e) {
			e = e || event;
			var c = e.offsetY; // 相对于小方块鼠标的Y坐标
			var boxTop = box.offsetTop; // 最大盒子距离顶部的距离
			document.onmousemove = function (e) {
				e = e || event;
				e.preventDefault(); //阻止默认事件
				var y = e.clientY; // 可视距离的Y坐标
				var move = y - c - boxTop;
				if(move < 3) move = 0; // 最小值
				if(move > maxHeight) move = maxHeight; // 最大值
				var r = move / maxHeight;
				content.style.marginTop = -poor*r + 'px';
				bar.style.marginTop = move + 'px';
				iy = -poor*r; // 相互影响
			};
			document.onmouseup = function () {
				document.onmousemove = null;
			}
		};
		var iy = 0;  // 内容滚动的距离
		var step = d || 20;
		box.onmousewheel = function (e) {
			var e = e || event;
			if(e.wheelDelta > 0) { // 上滚
				iy += step;
			} else { // 下滚
				iy -= step;
			}
			if(iy > 0) iy = 0; // 判断最小值
			if(iy < minWheel) iy = minWheel; // 判断最大值
			var r2 = iy / minWheel;
			bar.style.marginTop = maxHeight * r2 + 'px';
			content.style.marginTop = iy + 'px';
		}
};

/*
	方法作用说明：获取元素样式的值
	参数说明：
		第一个参数为需要获取样式的元素 类型为Object
		第二个为需要获取的属性名 类型为String
	返回值说明：返回一个样式的值 类型为Number
*/

lt.getCss = function(curEle,attr){
   	var val = null,reg = null;
   	if("getComputedStyle" in window){
        val = window.getComputedStyle(curEle,null)[attr];
   	}else{
        if(attr === "opacity"){
            val = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val = reg.test(val)?reg.exec(val)[1]/100:1;
        }else{
            val = curEle.currentStyle[attr];
        }
  	}
  	reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
  	return reg.test(val)?parseFloat(val):val;
};

/*
	方法作用说明：给元素添加过度动画
	参数说明：
		第一个参数为需要运动的元素 类型为object
		第二个参数为需要改变的属性 类型为object
		第三个值为回调函数，可选参数 类型为function
*/

lt.move = function(dom, option, fn){
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		var toggle = true;
		for(var i in option) {
			// 获取对应的初始状态
			var sty = getCss(dom, i), step = 0;
			if(i === 'opacity') {
				step = getStep((option[i]-sty)*100/5);
				dom.style.opacity = sty + step/100;
			} else if(i === 'zIndex') {
				dom.style.zIndex = option[i];
			} else {
				step = getStep((option[i]-sty)/5);
				dom.style[i] = sty + step + 'px'; // 末状态
			}
			if(sty != option[i]) toggle = false;
		}
		if(toggle) { // 当步长为0时
			clearInterval(dom.timer);
			if (fn) fn();
		}
	},18);
	function getStep (step) {
		return step < 0 ? Math.floor(step) : Math.ceil(step);
	}
};

/*
	方法作用说明：获取cookie值
	参数说明：参数为cookie的键值 类型为String
	返回值： 返回cookie的值 类型为String
*/

lt.getCookie = function(name){
	var cookieStr = document.cookie;
	var arr = cookieStr.split('; ');
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].split('=')[0] === name)
			return arr[i].split('=')[1];
	}
};

/*
	方法作用说明：设置cookie
	参数说明:
		第一个参数为cookie的名字 类型为字符串
		第二个参数为cookie的值 类型为字符串
		第三个参数为可选参数 类型为json 对象
*/

lt.setCookie = function (name, val, obj) {
	var cook = name + '=' + val + ';';
	if(obj) {
		if(obj.expires) cook += 'expires='+ obj.expires +";";
		if(obj.path) cook += 'path='+ obj.path+ ";";
		if(obj.domain) cook += 'domain=' + obj.domain;
		console.log(cook);
		document.cookie = cook;
	} else {
		document.cookie = cook;
	}
};

/*
	方法作用说明：移除cookie
	参数说明：
		参数为需要移除cookie 的名字 类型为String
	返回值说明：
		返回一个布尔值 true 代表删除成功，false表示删除失败
*/
lt.removeCookie = function (name) {
	var cook = this.getCookie(name);
	var date = new Date();
	this.setCookie(cook, '', {
		'expires': date.setTime(date.getTime()-10).toUTCString()
	});
	return !this.getCookie(name);
};

/*
	方法作用说明：对象的深拷贝
	参数说明：
		参数为需要拷贝的对象
	返回值说明：
		返回深拷贝后的对象
*/

lt.copyObject = function(obj) {
	var str = JSON.stringify(obj);
	return JSON.parse(str);
};

/*
	方法说明：发送ajax请求
	参数说明： 
		参数为一个json对象
		{
			url: '', // 发送请求的地址
			method: 'get/post', // 发送请求的方式
			data: {}, // post请求需要发送的参数
			callback(data){} // 请求成功的回调函数 有一个参数 返回响应的内容
		}
*/

lt.ajax = function(option) {
	var xhr = null;
    var str = ''
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(option.data){
    	for(var key in option.data)
    		str += key + '=' + option.data[key] + '&'
    }
    if(option.method.toLowerCase() === 'get') {
    	if(option.data) str = '?' + str;
    	xhr.open('GET', option.url + str, true);
    	xhr.send();
    }
    if(option.method.toLowerCase() === 'post') {
    	str = option.data ? str.slice(0, -1) : null;
    	xhr.open('POST', option.url, true);
    	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    	xhr.send(str);
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            option.callback(data);
        }
    };
    
}
















