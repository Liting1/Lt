!function(t){var n={};function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(i,o,function(n){return t[n]}.bind(null,o));return i},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function o(t){if(("object"===("undefined"==typeof HTMLElement?"undefined":i(HTMLElement))?t instanceof HTMLElement:t&&"object"===(void 0===t?"undefined":i(t))&&1===t.nodeType&&"string"==typeof t.nodeName)&&(this.el=t),t&&t.constructor===Function&&o.prototype.domReady(t),"string"==typeof t)return o.prototype._init(t);this.option={animate:1,css:{},html:{items:[]},roundlist:{},btn:{},autoplay:!0,time:3e3,transition:1e3},this.magnifyOption=Object.create({minImg:{url:""},maxImg:{url:"",width:400,height:400,right:1,top:0},mask:{width:200,height:200}})}o.prototype={constructor:o,domReady:function(t){document.addEventListener("DOMContentLoaded",t)},_init:function(t){var n=this;this.selector=t;var e=document.querySelectorAll(t);this.el=e;var i=function(t){n[t]=function(n){e.forEach(function(e){return e.addEventListener(t,n)})}},r=!0,s=!1,a=void 0;try{for(var l,u=this.events[Symbol.iterator]();!(r=(l=u.next()).done);r=!0){i(l.value)}}catch(t){s=!0,a=t}finally{try{!r&&u.return&&u.return()}finally{if(s)throw a}}return new o},events:["click","mouseleave","mouseenter","touchstart","touchmove","touchend"],merge:function(t,n){for(var e in n)"object"===i(n[e])?(t[e]||t.constructor!=Array||(t[e]={}),this.merge(t[e],n[e])):t[e]=n[e]},_isStyle:function(t){for(var n=document.querySelectorAll("style"),e=-1,i=0;i<n.length;i++)"style"==n[i].dataset.lt&&(e=i);e>-1?n[e].innerHTML+=t:((n=document.createElement("style")).dataset.lt="style",n.innerHTML=t,document.querySelector("head").appendChild(n))},renderCss:function(){var t=this.selector,n=this.el,e=this.option,i=e.transition,o=e.animate,r="\n\t\t\t"+t+" {\n\t\t\t\tposition: relative;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\t\t\t"+t+" li {\n\t\t\t\tlist-style: none;\n\t\t\t}\n\t        "+t+" .img-box a {\n\t            display: block;\n\t            width: 100%;\n\t            height: 100%;\n\t        }\n\t        "+t+" .img-box li img{\n\t        \tposition: absolute;\n\t        \tleft: 50%;\n\t        \ttransform: translateX(-50%);\n\t        }\n\t        "+t+" .img-box li:first-child {\n\t            z-index: 1;\n\t            opacity: 1;\n\t        }\n\t        "+t+" .list-box {\n\t            position: absolute;\n\t            bottom: 0;\n\t            z-index: 2;\n\t            left: 50%;\n\t            transform: translate(-50%, -50%);\n\t        }\n\t        "+t+" .list-box li {\n\t            width: 20px;\n\t            height: 20px;\n\t            background-color: #000;\n\t            border-radius: 50%;\n\t            float: left;\n\t            margin-right: 10px;\n\t        }\n\t        "+t+" .list-box li:last-child {\n\t            margin-right: 0;\n\t        }\n\t        "+t+" .btn-box button {\n\t        \tposition: absolute;\n\t        \ttop: 50%;\n\t        \ttransform: translateY(-50%);\n\t        \tz-index: 2;\n\t        \tfont-size: 50px;\n\t        }\n\t        "+t+" .btn-left {\n\t        \tleft: 0;\n\t        }\n\t        "+t+" .btn-right {\n\t        \tright: 0;\n\t        }\n\t        "+t+" .list-box li.active {\n\t\t\t\tbackground-color: #fff;\n\t        }";1===o&&(r+="\n        \t"+t+" .img-box {\n\t        \theight: 100%;\n\t        \tposition: relative;\n\t        }\n    \t\t"+t+" .img-box li {\n\t            height: 100%;\n\t            width: 100%;\n\t            overflow: hidden;\n\t            position: absolute;\n\t            transition: all "+i/1e3+"s;\n\t            opacity: 0;\n\t        }"),2===o&&(r+="\n        \t"+t+" .img-box {\n        \t\theight:100%;\n        \t\ttransition: all "+i/1e3+"s;\n        \t\ttransform: translateX("+-n.offsetWidth+"px);\n        \t}\n        \t"+t+" .img-box li {\n        \t\tposition: relative;\n        \t\toverflow:hidden;\n\t            height: 100%;\n\t            width: "+n.offsetWidth+"px;\n\t            float:left;\n\t        }"),this._isStyle(r)},autosize:function(){var t=this,n=this.el.children[0],e=this.el,i=this.option.html.items,o=this.option.time;window.addEventListener("resize",function(){n.style.width=e.offsetWidth*(i.length+2)+"px",n.style.transform="translateX("+-e.offsetWidth*t.currentIndex+"px)",n.style.transition="all 0s";var r=!0,s=!1,a=void 0;try{for(var l,u=n.children[Symbol.iterator]();!(r=(l=u.next()).done);r=!0){l.value.style.width=e.offsetWidth+"px"}}catch(t){s=!0,a=t}finally{try{!r&&u.return&&u.return()}finally{if(s)throw a}}clearTimeout(c);var c=setTimeout(function(){clearInterval(t.timer),t.timer=setInterval(function(){t.round(t.currentIndex),t.currentIndex++,n.style.transform="translateX("+-t.currentIndex*e.offsetWidth+"px)"},o),n.style.transition=null},20)})},renderDom:function(){var t,n=this,e=this.option.html.items,i="";1===this.option.animate&&(i=e.map(function(t){return'<li><a href="'+t.url+'"><img src="'+t.img+'"></a></li>'}).join("")),2===this.option.animate&&(i=[e[e.length-1]].concat(function(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)}(e),[e[0]]).map(function(t){return'<li><a href="'+t.url+'"><img src="'+t.img+'"></a></li>'}).join(""),setTimeout(function(){return n.autosize()})),t=e.map(function(t,n){return n?"<li></li>":'<li class="active"></li>'}).join(""),this.el.innerHTML='\n            <ul class="img-box">'+i+'</ul>\n            <ul class="list-box">'+t+'</ul>\n\t        <div class="btn-box">\n\t\t\t\t<button class="btn-left">&lt;</button>\n\t\t\t\t<button class="btn-right">&gt;</button>\n\t        </div>'},lbtAnimate:function(t){for(var n=this.imgList,e=this.roundlist,i=0;i<n.length;i++)n[i].style.opacity=0,n[i].style.zIndex=0,e[i].className="";e[t].className="active",n[t].style.opacity=1,n[t].style.zIndex=1},roundList:function(){for(var t=this,n=this.roundlist,e=function(e){n[e].onclick=function(){t.currentIndex=e,t.lbtAnimate(t.currentIndex)}},i=0;i<n.length;i++)e(i)},qie:function(t){var n=this.option.html.items;"next"==t&&(this.currentIndex++,this.currentIndex>n.length-1&&(this.currentIndex=0)),"prev"==t&&(this.currentIndex--,this.currentIndex<0&&(this.currentIndex=n.length-1)),this.lbtAnimate(this.currentIndex)},qieTwo:function(t){var n=this.el,e=n.children[0];"next"===t&&this.istransition&&this.currentIndex++,"prev"===t&&this.istransition&&this.currentIndex--,this.round(this.currentIndex-1),e.style.transform="translateX("+-this.currentIndex*n.offsetWidth+"px)",this.istransition=!1},round:function(t){for(var n=0;n<this.roundlist.length;n++)this.roundlist[n].className="";t>this.roundlist.length-1&&(t=0),t<0&&(t=this.roundlist.length-1),this.roundlist[t].className="active"},autoplay:function(t){var n=this,e=this.el,i=setInterval(function(){return n.qie("next")},t);e.onmouseenter=function(){return clearInterval(i)},e.onmouseleave=function(){return i=setInterval(function(){return n.qie("next")},t)}},autoplayTwo:function(t){var n=this,e=this.el,i=e.children[0];clearInterval(this.timer),this.timer=setInterval(function(){n.round(n.currentIndex),n.currentIndex++,i.style.transform="translateX("+-n.currentIndex*e.offsetWidth+"px)"},t)},lbt:function(t){var n=this;this.el=this.el[0],this.merge(this.option,t);var e=this.el,i=this.option,o=this.roundList,r=i.html.items;this.renderCss(),this.renderDom();var s=e.querySelector(".btn-left"),a=e.querySelector(".btn-right");this.roundlist=e.querySelectorAll(".list-box li"),this.imgList=e.querySelectorAll(".img-box li");var l=e.children[0];if(1===i.animate&&(this.currentIndex=0,o.call(this),s.onclick=function(){return n.qie("prev")},a.onclick=function(){return n.qie("next")},i.autoplay&&this.autoplay(i.time)),2===i.animate){l.style.width=e.offsetWidth*(r.length+2)+"px",this.currentIndex=1,this.istransition=!0,a.onclick=function(){return n.qieTwo("next")},s.onclick=function(){return n.qieTwo("prev")},l.addEventListener("transitionend",function(){n.istransition=!0,n.currentIndex>r.length&&(n.currentIndex=1),n.currentIndex||(n.currentIndex=r.length),l.style.transition="all 0s",l.style.transform="translateX("+-n.currentIndex*e.offsetWidth+"px)",setTimeout(function(){return l.style.transition=null})}),e.onmouseenter=function(){return clearInterval(n.timer)},e.onmouseleave=function(){return n.autoplayTwo(i.time)};for(var u=function(t){n.roundlist[t].onclick=function(){n.currentIndex=t+1,n.round(t),l.style.transform="translateX("+-(t+1)*e.offsetWidth+"px)"}},c=0;c<this.roundlist.length;c++)u(c);i.autoplay&&this.autoplayTwo(i.time)}},tap:function(t){this.el.forEach(function(n){var e;function i(n){switch(n.type){case"touchstart":e=(new Date).getTime();break;case"touchend":(new Date).getTime()-e<500&&t.call(this,n)}}n.addEventListener("touchstart",i),n.addEventListener("touchend",i)})},longtag:function(t){this.el.forEach(function(n){var e;function i(n){switch(n.type){case"touchstart":e=setTimeout(function(){t.call(this,n)},500);break;case"touchmove":clearInterval(e);break;case"touchend":clearTimeout(e)}}n.addEventListener("touchstart",i),n.addEventListener("touchmove",i),n.addEventListener("touchend",i)})},move:function(t,n){var e=this.el[0];function i(t){return t<0?Math.floor(t):Math.ceil(t)}clearInterval(e.timer),e.timer=setInterval(function(){var r=!0;for(var s in t){var a=o.getCss(e,s),l=0;"opacity"===s?(l=i(100*(t[s]-a)/5),e.style.opacity=a+l/100):"zIndex"===s?e.style.zIndex=t[s]:(l=i((t[s]-a)/5),e.style[s]=a+l+"px"),a!=t[s]&&(r=!1)}r&&(clearInterval(e.timer),n&&n())},18)},magnifyCss:function(){var t=this.selector,n=this.magnifyOption,e=n.maxImg,i=n.mask,o=document.createElement("style");o.innerHTML="\n\t\t\t"+t+" {\n\t\t\t\tposition: relative;\n\t\t\t}\n\t\t\t"+t+" .minImg, .minImg img {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t}\n\t\t\t"+t+" .maxImg {\n\t\t\t\twidth: "+e.width+"px;\n\t\t\t\theight: "+e.height+"px;\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: "+e.top+"px;\n\t\t\t\tright: -"+(e.width+e.right)+"px;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\t\t\t"+t+" .img-mask {\n\t\t\t\twidth: "+i.width+"px;\n\t\t\t\theight: "+i.height+"px;\n\t\t\t\tbackground-color: rgba(0,0,0,.2);\n\t\t\t\tleft: 0;\n\t\t\t\ttop: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\tz-index: 2;\n\t\t\t}",document.head.appendChild(o)},magnifyDom:function(){var t=this.magnifyOption,n=t.minImg,e=t.maxImg,i='\n\t\t\t<div class="minImg">\n\t\t\t\t<img src="'+n.url+'">\n\t\t\t\t<div class="img-mask" style="display:none"></div>\n\t\t\t</div>\n\t\t\t<div class="maxImg" style="display:none">\n\t\t\t\t<img src="'+e.url+'">\n\t\t\t</div>';this.el.innerHTML=i},magnify:function(t){this.el=this.el[0],this.merge(this.magnifyOption,t),this.magnifyCss(),this.magnifyDom();var n=this.el,e=n.querySelector(".minImg"),i=n.querySelector(".maxImg"),o=n.querySelector(".maxImg img"),r=n.querySelector(".img-mask"),s=0,a=0,l=0,u=0,c=0,f=0;e.onmouseenter=function(){i.style.display="block",r.style.display="block",s=e.offsetWidth-r.offsetWidth,a=e.offsetHeight-r.offsetHeight,l=o.offsetWidth-i.offsetWidth,u=o.offsetHeight-i.offsetHeight},e.onmouseleave=function(){i.style.display="none",r.style.display="none"},e.onmousemove=function(t){c=t.pageY-this.offsetTop-r.offsetHeight/2,(f=t.pageX-this.offsetLeft-r.offsetWidth/2)<=0&&(f=0),c<=0&&(c=0),f>=s&&(f=s),c>=a&&(c=a),r.style.left=f+"px",r.style.top=c+"px";var n=l/s,e=u/a;o.style.marginLeft=-n*f+"px",o.style.marginTop=-e*c+"px"}}},o.fn={_init:function(t){for(var n in this)t[n]=this[n]},randomStr:function(t){for(var n="",e=t?e:4,i=0;i<e;i++)n+=String(Math.floor(10*Math.random()));return n},strFilter:function(t,n){for(var e=0;e<n.length;e++){for(var i=new RegExp(n[e],"ig"),o="",r=0;r<n[e].length;r++)o+="*";t=t.replace(i,o)}return t},toObject:function(t){t=t.split("?"),arr=t[t.length-1].split("&"),obj={};for(var n=0;n<arr.length;n++)obj[arr[n].split("=")[0]]=arr[n].split("=")[1];return obj},getCss:function(t,n){var e=null,i=null;return"getComputedStyle"in window?e=window.getComputedStyle(t,null)[n]:"opacity"===n?(e=t.currentStyle.filter,e=(i=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i).test(e)?i.exec(e)[1]/100:1):e=t.currentStyle[n],(i=/^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i).test(e)?parseFloat(e):e},scrollTo:function(t,n){if(t===window){var e=window.scrollY,i=e;if(!n)return window.scrollTo(0,0);var o=setInterval(function(){i>0?window.scrollTo(0,i-=e/n):clearInterval(o)},1)}},getCookie:function(t){for(var n=document.cookie.split("; "),e=0;e<n.length;e++)if(n[e].split("=")[0]===t)return n[e].split("=")[1]},setCookie:function(t,n,e){var i=t+"="+n+";";e?(e.expires&&(i+="expires="+e.expires+";"),e.path&&(i+="path="+e.path+";"),e.domain&&(i+="domain="+e.domain),document.cookie=i):document.cookie=i},removeCookie:function(t){var n=this.getCookie(t),e=new Date;return this.setCookie(n,"",{expires:e.setTime(e.getTime()-10).toUTCString()}),!this.getCookie(t)},copyObject:function(t){var n=JSON.stringify(t);return JSON.parse(n)},ajax:function(t){var n=null,e="";if(n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.data)for(var i in t.data)e+=i+"="+t.data[i]+"&";"get"===t.method.toLowerCase()&&(t.data&&(e="?"+e),n.open("GET",t.url+e,!0),n.send()),"post"===t.method.toLowerCase()&&(e=t.data?e.slice(0,-1):null,n.open("POST",t.url,!0),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send(e)),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var e=n.responseText;t.callback(e)}}},objSort:function(t,n,e){var i=arguments.length;return t.sort(function(t,o){return 2===i||e?parseFloat(t[n])>parseFloat(o[n]):parseFloat(t[n])<parseFloat(o[n])}),t},randomChar:function(t){for(var n,e=[],i="",o=0;o<10;o++)e.push(o);for(var r=65;r<91;r++)e.push(String.fromCharCode(r));for(var s=97;s<123;s++)e.push(String.fromCharCode(s));if(n=Math.floor(Math.random()*e.length),t){for(var a=0;a<t;a++)i+=String(e[Math.floor(Math.random()*e.length)]);return i}return String(e[n])},randomColor:function(){var t="#",n="0123456789abcdef";if(!arguments.length){for(var e=0;e<6;e++)t+=n[Math.floor(Math.random()*n.length)];return t}},scrollBar:function(t,n){var e=t.children[0],i=t.children[1],o=i.children[0],r=e.offsetHeight-t.offsetHeight,s=i.offsetHeight-o.offsetHeight,a=t.offsetHeight-e.offsetHeight;o.onmousedown=function(n){var i=(n=n||event).offsetY,a=t.offsetTop;document.onmousemove=function(t){(t=t||event).preventDefault();var n=t.clientY-i-a;n<3&&(n=0),n>s&&(n=s);var u=n/s;e.style.marginTop=-r*u+"px",o.style.marginTop=n+"px",l=-r*u},document.onmouseup=function(){document.onmousemove=null}};var l=0,u=n||20;t.onmousewheel=function(t){(t=t||event).wheelDelta>0?l+=u:l-=u,l>0&&(l=0),l<a&&(l=a);var n=l/a;o.style.marginTop=s*n+"px",e.style.marginTop=l+"px"}}},o.fn._init(o),window.lt=o}]);