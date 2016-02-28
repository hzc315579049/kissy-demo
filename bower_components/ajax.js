
//全局token字串获取
var jres_token;

function getTokenStr(json_token){
	jres_token = json_token.access_token;
}

var js_lib={
	ajax : function(url, callback, method, data,callback2,beforesend) {
			try {
				var method = method ? method : "get";
				var data = data ? data : "";
				if (!data) {
					var url = url;
				} else {
					var url = (method == "get") ? (url + "?" + data) : url;
				}
				url = this.setUrlStampVersion(url);
				/**
				 * @info 为兼容IE非IE浏览器
				 */
				var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");


				/**
				 * xmlHttp.open(请求方式,请求地址,[是否为异步请求]);
				 * post传值需放在send方法中，格式为key=value，多值用逗号隔开
				 *
				 */
				var doGet = function () {
					http.onreadystatechange = function () {
						if (http.readyState == 4 && http.status == 200) {
							if (callback != null) {
								callback(http.responseText);
								http = null;
							}
						} else if (http.readyState == 4 && http.status == 400) {
							if (callback2 != null) {
								callback2(http.responseText);
								http = null;
							}
						}
					};
					http.open(method, url, true);
					beforesend && beforesend();
					http.send(data);
				};

				var doPost = function () {
					http.onreadystatechange = function () {
						if (http.readyState == 4 && http.status == 200) {
							if (callback != null) {
								callback(http.responseText);
								http = null;
							}
						} else if (http.readyState == 4 && http.status == 400) {
							if (callback2 != null) {
								callback2(http.responseText);
								http = null;
							}
						}
					};
					http.open(method, url, true);
					http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					beforesend && beforesend();
					http.send(data);

				};
				if (method == "post") {
					doPost();
				} else {
					doGet();
				}
			}catch(e){alert(e.message)}
		},

		/**
		 * @param url： ajax请求数据的URL地址
		 * @param callback： ajax完毕的回调函数
		 * @param method： 数据获取类型
		 * @param data： ajax请求最终数据
		 * @param beforesend： 请求前操作
		 * @info 原生态JS请求AJAX
		 * @description AJAX运行机制需要四步：
		 * 1，创建XMLHttpRequest对象 2，调用xmlHttp.open()设置请求内容 3，设置回调函数（根据服务器返回的状态信息，do sth） 4，调用xmlHttp.send()发送请求
		 */
		ajaxSynchronize : function(url, callback, method, data,callback2,beforesend) {
			try {
				var method = method ? method : "get";
				var data = data ? data : "";
				if (!data) {
					var url = url;
				} else {
					var url = (method == "get") ? (url + "?" + data) : url;
				}
				url = this.setUrlStampVersion(url);
				/**
				 * @info 为兼容IE非IE浏览器
				 */
				var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");


				/**
				 * xmlHttp.open(请求方式,请求地址,[是否为异步请求]);
				 * post传值需放在send方法中，格式为key=value，多值用逗号隔开
				 *
				 */
				var doGet = function () {
					http.onreadystatechange = function () {
						if (http.readyState == 4 && http.status == 200) {
							if (callback != null) {
								callback(http.responseText);
								http = null;
							}
						} else if (http.readyState == 4 && http.status == 400) {
							if (callback2 != null) {
								callback2(http.responseText);
								http = null;
							}
						}
					};
					http.open(method, url, false);
					beforesend && beforesend();
					http.send(data);
				};

				var doPost = function () {
					http.onreadystatechange = function () {
						if (http.readyState == 4 && http.status == 200) {
							if (callback != null) {
								callback(http.responseText);
								http = null;
							}
						} else if (http.readyState == 4 && http.status == 400) {
							if (callback2 != null) {
								callback2(http.responseText);
								http = null;
							}
						}
					};
					http.open(method, url, false);
					http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					beforesend && beforesend();
					http.send(data);

				};
				if (method == "post") {
					doPost();
				} else {
					doGet();
				}
			}catch(e){alert(e.message)}
		},
		timestamp : function () {
		return '_v='+new Date().getTime()+''+Math.floor(Math.random()*9999+1000);
		},
		setUrlStampVersion : function (url){
		url = url.replace(/(^\s+)|(\s+$)/g,"");
		if(url.indexOf("_v=") == -1){
			if(url.indexOf("?") != -1){
				if(null != jres_token && "undefined" != jres_token && "" != jres_token){
					url = url+"&access_token="+jres_token+"&"+this.timestamp();
				}else{
					url = url+"&"+this.timestamp();
				}
			}else{
				if(null != jres_token && "undefined" != jres_token && "" != jres_token){
					url = url+"?"+"access_token="+jres_token+"&"+this.timestamp();
				}else{
					url = url+"?"+this.timestamp();
				}
			};
		}
		return url;
	},
}