
function lt(a) {
	if((typeof HTMLElement === 'object' ) ? a instanceof HTMLElement : 
	a && typeof a === 'object' && a.nodeType === 1 && typeof a.nodeName === 'string'){
		this.el = a;
	}
	
	if (a && a.constructor === Function) lt.prototype.domReady(a); 
	if (typeof a === 'string') return lt.prototype._init(a);
}

lt.prototype = {
	constructor: lt,
	domReady(a){
		document.addEventListener('DOMContentLoaded', a);
	},
	_init(a) {
		this.selector = a;
		var el = document.querySelectorAll(a);
		this.el = el;
		for(let i of this.events){
			this[i] = (cb)=>{
				el.forEach(item=>item.addEventListener(i,cb))
			}
		}
		return new lt();
	},
	/*
		默认的配置项
	*/
	option: {
		animate: 1, // 轮播的方式
		css:{}, // css配置项
		html:{ // html配置项
			items:[]
		},
		roundlist: {}, // 列表圆点配置项
		btn: {}, // 左右按钮配置项
		autoplay: true, // 是否需要自动播放
		time: 3000, // 单张图片切换事件 单位毫秒
		transition: 1000 // 单张图片开始运动到街上运动的时间 单位毫秒
	},
	/*
		JavaScript 事件名数组
	 */
	events: ['click', 'mouseleave', 'mouseenter', 'touchstart', 'touchmove', 'touchend'],
	/*
		简单的对象深合并
	*/
	merge(oldOption, newOption) {
		for(var item in newOption) {
			if(typeof newOption[item] === 'object') {
				if(!oldOption[item] && oldOption.constructor == Array) {
					oldOption[item] = {};
				}
				this.merge(oldOption[item], newOption[item]);
			} else {
				oldOption[item] = newOption[item]
			}
		}
	},
	/*
		渲染CSS样式
	*/
	renderCss() {
		var { selector, el }  = this,
			{ transition, animate } = this.option,
			str = '',
			style = document.createElement('style');
		str = `
			${selector} {
				position: relative;
				overflow: hidden;
			}
	        ${selector} .img-box a {
	            display: block;
	            width: 100%;
	            height: 100%;
	        }
	        ${selector} .img-box li img{
	        	position: absolute;
	        	left: 50%;
	        	transform: translateX(-50%);
	        }
	        ${selector} .img-box li:first-child {
	            z-index: 1;
	            opacity: 1;
	        }
	        ${selector} .list-box {
	            position: absolute;
	            bottom: 0;
	            z-index: 2;
	            left: 50%;
	            transform: translate(-50%, -50%);
	        }
	        ${selector} .list-box li {
	            width: 20px;
	            height: 20px;
	            background-color: #000;
	            border-radius: 50%;
	            float: left;
	            margin-right: 10px;
	        }
	        ${selector} .list-box li:last-child {
	            margin-right: 0;
	        }
	        ${selector} .btn-box button {
	        	position: absolute;
	        	top: 50%;
	        	transform: translateY(-50%);
	        	z-index: 2;
	        }
	        ${selector} .btn-left {
	        	left: 0;
	        }
	        ${selector} .btn-right {
	        	right: 0;
	        }
	        ${selector} .list-box li.active {
				background-color: #fff;
	        }`;	        
        if(animate === 1) {
        	str += `
	        	${selector} .img-box {
		        	height: 100%;
		        	position: relative;
		        }
        		${selector} .img-box li {
		            height: 100%;
		            width: 100%;
		            overflow: hidden;
		            position: absolute;
		            transition: all ${transition/1000}s;
		            opacity: 0;
		        }`;
        }
        if(animate === 2) {
        	str += `
	        	${selector} .img-box {
	        		height:100%;
	        		transition: all ${transition/1000}s;
	        		transform: translateX(${-el.offsetWidth}px);
	        	}
	        	${selector} .img-box li {
	        		position: relative;
	        		overflow:hidden;
		            height: 100%;
		            width: ${el.offsetWidth}px;
		            float:left;
		        }`;
        }
        style.innerHTML = str;
        document.querySelector('head').appendChild(style);
	},
	/*
		自动适应窗口大小
	 */
	autosize(){
		var imgBox = this.el.children[0],
			el = this.el,
			items = this.option.html.items,
			time = this.option.time;
		window.addEventListener('resize',()=>{
    		imgBox.style.width = el.offsetWidth * (items.length+2) + 'px';
    		imgBox.style.transform = `translateX(${-el.offsetWidth*this.currentIndex}px)`;
    		imgBox.style.transition = 'all 0s';
    		for (var item of imgBox.children)
    			item.style.width = el.offsetWidth + 'px';
    		clearTimeout(timer);
    		var timer = setTimeout(()=>{
    			clearInterval(this.timer);
    			this.timer = setInterval(()=>{
    				this.round(this.currentIndex);
        			this.currentIndex++;
    				imgBox.style.transform = `translateX(${-this.currentIndex*el.offsetWidth}px)`;	
    			},time)
    			imgBox.style.transition = null;
    		}, 20)
    	})
	},
	/*
		渲染DOM节点
	*/
	renderDom() {
		var { items } = this.option.html,
			newitems = [],
			imgList = '',
			roundList = '';
		if(this.option.animate === 1)
			imgList = items.map(item =>`<li><a href="${item.url}"><img src="${item.img}"></a></li>`).join('');

		if(this.option.animate === 2) {
			newitems = [items[items.length-1],...items,items[0]];
			imgList = newitems.map(item =>`<li><a href="${item.url}"><img src="${item.img}"></a></li>`).join('');
			setTimeout(() => this.autosize());
		}
		roundList = items.map((item, i) => !i ? `<li class="active"></li>` : `<li></li>`).join('');
		this.el.innerHTML = `
            <ul class="img-box">${imgList}</ul>
            <ul class="list-box">${roundList}</ul>
	        <div class="btn-box">
				<button class="btn-left">左边按钮</button>
				<button class="btn-right">右边按钮</button>
	        </div>`;
	},
	/*
		轮播图的切换动画 (配合CSS3的transition属性)
	*/
	lbtAnimate(index) {
		var { imgList, roundlist } = this;
		for(let i = 0; i<imgList.length; i++) {
			imgList[i].style.opacity = 0;
			imgList[i].style.zIndex = 0;
			roundlist[i].className = '';
		}
		roundlist[index].className = 'active';
		imgList[index].style.opacity = 1;
		imgList[index].style.zIndex = 1;
	},
	/*
		给轮播图的小圆点添加点击事件
	*/
	roundList(){
		var {roundlist} = this;
		// console.log(roundlist)
		for(let i = 0; i< roundlist.length; i++){
			roundlist[i].onclick = ()=>{
				this.currentIndex = i;
				this.lbtAnimate(this.currentIndex);
			}
		}
	},
	/*
		设置轮播图的切换方式
	*/
	qie(x){
		var { items } = this.option.html;
		if(x == 'next') {
			this.currentIndex++;
			if(this.currentIndex > items.length-1) this.currentIndex = 0;
		}
		if(x == 'prev') {
			this.currentIndex--;
			if(this.currentIndex < 0) this.currentIndex = items.length-1;
		}
		this.lbtAnimate(this.currentIndex);
	},
	qieTwo(x){
		var {el} = this, imgBox = el.children[0];
		if(x === 'next' && this.istransition) this.currentIndex++;
		if(x === 'prev' && this.istransition) this.currentIndex--;

		this.round(this.currentIndex-1);
		imgBox.style.transform = `translateX(${-this.currentIndex*el.offsetWidth}px)`;
		this.istransition = false;

	},
	round(index){
    	for(let i = 0; i< this.roundlist.length; i++){
    		this.roundlist[i].className = '';
    	}
    	if(index > this.roundlist.length-1) index = 0;
    	if(index < 0) index = this.roundlist.length -1;
    	this.roundlist[index].className = 'active';
	},
	/*
		添加轮播图的自动播放
	*/
	autoplay (time){
		var { el } = this;
		var timer = setInterval(() => this.qie('next') , time);
		el.onmouseenter = () => clearInterval(timer);
		el.onmouseleave = () => timer = setInterval(() => this.qie('next'), time);
	},
	autoplayTwo(time){
		var el = this.el, imgBox = el.children[0];
		clearInterval(this.timer)
    	this.timer = setInterval(()=>{
    		this.round(this.currentIndex);
    		this.currentIndex++;
    		imgBox.style.transform = `translateX(${-this.currentIndex*el.offsetWidth}px)`;
    	}, time);
	},
	/*
		实现轮播函数
	*/
	lbt(o) {
		// 只能是一个元素
		this.el = this.el[0];
		// 合并配置对象
		this.merge(this.option, o);
		// 初始化
		var { el, option, roundList} = this,
    	items = option.html.items;
		// console.log(el);
    	// 渲染CSS样式和DOM节点
		this.renderCss();
		this.renderDom();
		// 获取元素
		var prev =el.querySelector('.btn-left');
		var next =el.querySelector('.btn-right');
		this.roundlist = el.querySelectorAll('.list-box li');
		this.imgList = el.querySelectorAll('.img-box li');
    	var imgBox = el.children[0];

		if(option.animate === 1) {
			// 设置当前索引并且获取对应的元素
			this.currentIndex = 0;
			// 添加小圆点的点击事件
			roundList.call(this);
			// 给左右切换按钮绑定事件
			prev.onclick = () => this.qie('prev');
			next.onclick = () => this.qie('next');
			if(option.autoplay) this.autoplay(option.time);
		}
		if(option.animate === 2) {
    		imgBox.style.width = el.offsetWidth * (items.length+2) + 'px';
	    	// 设置当前索引并且获取对应的元素
			this.currentIndex = 1;
    		this.istransition = true;
	    	next.onclick = ()=> this.qieTwo('next');
	    	prev.onclick = ()=> this.qieTwo('prev');
	    	// 过度结束监听事件
	    	imgBox.addEventListener('transitionend', ()=>{
	    		this.istransition = true;
	    		if(this.currentIndex > items.length) this.currentIndex = 1;
	    		if(!this.currentIndex) this.currentIndex = items.length;

				imgBox.style.transition = 'all 0s';
				imgBox.style.transform = `translateX(${-this.currentIndex*el.offsetWidth}px)`;
				setTimeout(() => imgBox.style.transition = null)
	    	})
	    	// 绑定鼠标事件
	    	el.onmouseenter = () => clearInterval(this.timer);
	    	el.onmouseleave = () => this.autoplayTwo(option.time);
	    	// 给小圆点绑定点击事件
	    	for(let k = 0; k<this.roundlist.length; k++) {
	    		this.roundlist[k].onclick = ()=>{
	    			this.currentIndex = k+1;
	    			this.round(k)
	    			imgBox.style.transform = `translateX(${-(k+1)*el.offsetWidth}px)`;
	    		}
	    	}
			// 自动播放
	    	if(option.autoplay) this.autoplayTwo(option.time);
			
		}
	},
	/*
		移动端点击事件
	 */
	tap (handler){
		this.el.forEach(item=>{
	        var startTime,endTime;
	        item.addEventListener("touchstart",touchFn);
	        item.addEventListener("touchend",touchFn);
	        function touchFn(e){
	            // e.preventDefault();
	            switch (e.type){
	                case "touchstart":
	                    startTime = new Date().getTime();
	                    break;
	                case "touchend":
	                    endTime = new Date().getTime();
	                    if(endTime - startTime < 500){
	                        handler.call(this,e);
	                    }
	                break;
	            }
	        }
		})
    },
    /* 
		移动端长按事件
    */
    longtag (handler){
    	this.el.forEach(item => {
	        item.addEventListener("touchstart",touchFn);
	        item.addEventListener("touchmove",touchFn);
	        item.addEventListener("touchend",touchFn);
	        var timerId;
	        function touchFn(e){
	        	// e.preventDefault();
	            switch (e.type){
	                case "touchstart":
	                    timerId = setTimeout(function(){
	                        handler.call(this,e)
	                    },500);
	                    break;
	                case "touchmove":
	                    clearInterval(timerId);
	                    break;
	                case "touchend":
	                    clearTimeout(timerId);
	                    break;
	            }
	        }
    	})
    },
    /*
		方法作用说明：给元素添加过度动画
		参数说明：
			第一个参数为需要运动的元素 类型为object
			第二个参数为需要改变的属性 类型为object
			第三个值为回调函数，可选参数 类型为function
	*/
	move (option, fn){
		// 占时只能一次给一个元素元素添加
		let dom = this.el[0];
		clearInterval(dom.timer);
		dom.timer = setInterval(function(){
			var toggle = true;
			for(var i in option) {
				// 获取对应的初始状态
				var sty = lt.getCss(dom, i), step = 0;
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
	},
	/*
		放大镜
	*/
	magnifyCss(){
		var {selector} = this,
			{maximg, imgmask} = this.magnifyOption,
			style = document.createElement('style');
		style.innerHTML = `
			${selector} {
				position: relative;
			}
			${selector} .minImg, .minImg img {
				width: 100%;
				height: 100%;
			}
			${selector} .maxImg {
				width: ${maximg.width}px;
				height: ${maximg.height}px;
				overflow: hidden;
				position: absolute;
				top: ${maximg.top}px;
				right: -${maximg.width+maximg.right}px;
				box-sizing: border-box;
			}
			${selector} .img-mask {
				width: ${imgmask.width}px;
				height: ${imgmask.height}px;
				background-color: rgba(0,0,0,.2);
				left: 0;
				top: 0;
				position: absolute;
				z-index: 2;
			}`;
			document.head.appendChild(style);
	},
	magnifyDom() {
		var {minimg, maximg} = this.magnifyOption;
		var str = `
			<div class="minImg">
				<img src="${minimg.url}">
				<div class="img-mask" style="display:none"></div>
			</div>
			<div class="maxImg" style="display:none">
				<img src="${maximg.url}">
			</div>`
		this.el.innerHTML = str;
	},
	magnifyOption: { // 默认值
		minimg: {
			url: ''
		},
		maximg: {
			url: '',
			width: 400, // 大图片盒子宽度
			height: 400, // 大图片盒子高度
			right: 1, // 大盒子距离左边小盒子的距离
			top: 0 // 大盒子距离顶部的距离
		},
		imgmask: {
			width: 200,
			height: 200
		}
	},
	magnify(o){
		this.el = this.el[0]; // 只能是一个元素
		this.merge(this.magnifyOption, o);
		this.magnifyCss();
		this.magnifyDom();
		var {el} = this,
			minimg = el.querySelector('.minImg'), // 装小图片的盒子
			maximg = el.querySelector('.maxImg'), // 装大图片的盒子
			img = el.querySelector('.maxImg img'), // 大图片
			imgmask = el.querySelector('.img-mask'), // 遮罩盒子
			maxX = 0, // 图片遮罩运动的最大X方向位移
			maxY = 0,  // 图片遮罩运动的最大Y方向位移
			maximgX = 0, // 右侧大图片的最大X方向位移
			maximgY = 0; // 右侧大图片的最大Y方向位移
		minimg.onmouseenter = function(){
			maximg.style.display = 'block';
			imgmask.style.display = 'block';
			// 必须在显示后获取元素的宽度和高度
			maxX = minimg.offsetWidth - imgmask.offsetWidth;
			maxY = minimg.offsetHeight - imgmask.offsetHeight;
			maximgX = img.offsetWidth - maximg.offsetWidth;
			maximgY = img.offsetHeight - maximg.offsetHeight;
		}
		minimg.onmouseleave = function(){
			maximg.style.display = 'none';
			imgmask.style.display = 'none';
		}
		minimg.onmousemove = function(e){
			var moveY = e.clientY-this.offsetTop - imgmask.offsetHeight/2;
			var moveX = e.clientX-this.offsetLeft - imgmask.offsetWidth/2;
			if(moveX <= 0) moveX = 0;
			if(moveY <= 0) moveY = 0;
			if(moveX >= maxX) moveX = maxX;
			if(moveY >= maxY) moveY = maxY;
			imgmask.style.left = moveX+'px';
			imgmask.style.top = moveY+'px';
			var biliX = maximgX/maxX,
				biliY = maximgY/maxY;
			img.style.marginLeft = -biliX * moveX + 'px';
			img.style.marginTop = -biliY * moveY + 'px';
		}
	}
}

/*
	给对象添加附加属性
*/

lt.fn = {
	/* 
		此方法只能复制一层
	*/
	_init(lt){
		for(var key in this) lt[key] = this[key];
	},
	/*
		方法的作用: 生成随机数子类型的字符串
		参数说明: 
			不传参数时生成一个四位数字字符串
			传一个参数生成指定位数的随机数字字符串
		返回值说明：
			返回值的类型 Sting
	*/
	randomStr (len) {
		var r = '', n = len ? n : 4;
		for(var i = 0; i < n; i++) 
			r += String(Math.floor(Math.random()*10));
		// parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
		return r;
	},
	/*
		方法作用说明：文字过滤敏感字
		参数说明：
			第一个是需要过滤的字符串，类型为String
			第二个参数是需要过滤的敏感字符，类型为数组Array
		返回值说明：
			返回过滤后的字符串。
	*/
	strFilter(str, arr) {
		for(var i = 0; i < arr.length; i++) {
			var exp = new RegExp(arr[i], 'ig'),
			x = '';
			for(var j = 0; j < arr[i].length; j ++) x += '*';
			str = str.replace(exp, x);	
		}
		return str;
	},
	/*
		方法作用说明：url参数转换为JS对象
		参数说明：
			参数为需要转换的字符串， 类型为String
		返回值说明：
			返回一个处理好的js对象
	*/
	toObject (str) {
		str = str.split('?'),
		arr = str[str.length-1].split('&'),
		obj = {};
		for(var i = 0; i< arr.length; i++) {
			obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
		}
		return obj;
	},
	/*
		方法作用说明：获取元素样式的值
		参数说明：
			第一个参数为需要获取样式的元素 类型为Object
			第二个为需要获取的属性名 类型为String
		返回值说明：返回一个样式的值 类型为Number
	*/
	getCss(curEle,attr){
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
	},
	/*
		方法作用说明：使指定的元素的轮动条滚到顶部位置
		参数说明：
			第一个参条数是有滚动的元素，如果是浏览器对象则传window对象
			如果只传一个参数，则没有动画
			第二个参数是运动时间
	*/
	scrollTo (dom, time) {
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
	},
	/*
		方法作用说明：获取cookie值
		参数说明：参数为cookie的键值 类型为String
		返回值： 返回cookie的值 类型为String
	*/
	getCookie(name){
		var cookieStr = document.cookie;
		var arr = cookieStr.split('; ');
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].split('=')[0] === name)
				return arr[i].split('=')[1];
		}
	},
	/*
		方法作用说明：设置cookie
		参数说明:
			第一个参数为cookie的名字 类型为字符串
			第二个参数为cookie的值 类型为字符串
			第三个参数为可选参数 类型为json 对象
	*/
	setCookie(name, val, obj) {
		var cook = name + '=' + val + ';';
		if(obj) {
			if(obj.expires) cook += 'expires='+ obj.expires +";";
			if(obj.path) cook += 'path='+ obj.path+ ";";
			if(obj.domain) cook += 'domain=' + obj.domain;
			document.cookie = cook;
		} else {
			document.cookie = cook;
		}
	},
	/*
		方法作用说明：移除cookie
		参数说明：
			参数为需要移除cookie 的名字 类型为String
		返回值说明：
			返回一个布尔值 true 代表删除成功，false表示删除失败
	*/
	removeCookie(name) {
		var cook = this.getCookie(name);
		var date = new Date();
		this.setCookie(cook, '', {
			'expires': date.setTime(date.getTime()-10).toUTCString()
		});
		return !this.getCookie(name);
	},
	/*
		方法作用说明：对象的深拷贝
		参数说明：
			参数为需要拷贝的对象
		返回值说明：
			返回深拷贝后的对象
	*/

	copyObject(obj) {
		var str = JSON.stringify(obj);
		return JSON.parse(str);
	},
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
	ajax(option) {
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
	    }
	},
	/*
		方法作用说明：给数组按规定的项进行排序
			参数说明：
				第一个参数是需要排序的数组对象
				第二个参数是需要根据那一项排序的项类型是字符串
				第三个参数类型是布尔，true为升序false为降序，不传参数默认为升序
	*/
	objSort (arr, str, bool) {
		var len = arguments.length;
		arr.sort(function(n1, n2){
			if(len=== 2 || bool) {
				return parseFloat(n1[str]) > parseFloat(n2[str])
			} else {
				return parseFloat(n1[str]) < parseFloat(n2[str])
			}
		});
		return arr
	},
	/*
		方法的作用：随机返回[0-9] | [A-Z] | [a-z]随机字符
		参数说明：
			不传参数返回一个随机字符串
			传一个数字参数返回指定个数的随机字符
	*/
	randomChar(a) {
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
	},
	/*
		方法的作用：生成一个随机颜色值
		参数说明：
			不传参数 返回一个十六进制的颜色值
	*/
	randomColor(){
		var arg = arguments.length, color = '#', str ='0123456789abcdef', n = 0;
		if(!arg) {
			for(var i = 0; i < 6; i++) {
				n =  Math.floor((Math.random()*str.length))
				color += str[n];
			}
			return color;
		}
	},
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
	scrollBar (box , d) {
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
	}
}


/*浅拷贝方法*/
lt.fn._init(lt);

window.lt = lt;