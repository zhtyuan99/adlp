const host="https://www.guanglianda.org/server/trace/";


var browserPush = function (group,sw,callback) {
	this.sw=sw;
	this.callback=function(stauts,msg){
		if(typeof callback==="function"){
			callback(stauts,msg);
		}	
	};
	this.group=group;

    this.config = {
        apiKey: "AIzaSyAtsM67kSvgRzNvmAMmj9w3_byg7NmSqYg",
        authDomain: "pushad-9d8ca.firebaseapp.com",
        databaseURL: "https://pushad-9d8ca.firebaseio.com",
        projectId: "pushad-9d8ca",
        storageBucket: "pushad-9d8ca.appspot.com",
        messagingSenderId: "466881334115"
    };
	this.publicVapidKey="BKF2-aGBrXVvZhk4prCKNSKhgPR9akvecWmEMyLl0fQM-qJVtZxHzSjYC4DGItxfDWUUvmq7Yz9jIu5AXgiqLMg";
	this.firebase=firebase;
	this.message=null;
	this.createTraceImg();
	this.initError=this.init();
}
browserPush.prototype.init = function () {
	
    var initError=null;
    if ('serviceWorker' in navigator&& 'PushManager' in window) {
		this.firebase.initializeApp(this.config);
		let message =  this.firebase.messaging();
		let that=this;
		message.usePublicVapidKey(this.publicVapidKey);
        navigator.serviceWorker.register(this.sw).then(function (reg) {
                    message.useServiceWorker(reg);			
                }).catch(function (error) {
					initError='Registration failed with' + error.message;		
				}
		);
		this.message=message;
    }else{
		initError="your browser dont suport the api";
	}
	return initError;
	
	
}
browserPush.prototype.run = function () {
	
	let that=this;
	if(that.initError!=null){
		//初始化不成功
		that.callback(1001,that.initError);
		return;
	}
    that.message.requestPermission().then(function () {
		that.loading();
        that.message.getToken().then(function (currentToken) {
			//授权被允许
			that.sendToSever(currentToken,'1');
			that.callback(0,'success');
        }).catch(function (err) {
			//授权时发生错误
			that.sendToSever("fail",'3');
			that.callback(1002,err.message);
        });

    }).catch(function (err) {
		
		that.sendToSever("refuse",'2');
		that.callback(1003,err.message);
		//授权被拒绝
    });
}

browserPush.prototype.loading=function(){
	
	//var img = document.getElementById("traceImg");
	//img.src = host+"/loading.gif";
}

browserPush.prototype.sendToSever=function(token,action){
	const time=(new Date()).valueOf();
	var uuid=getCookie("xxoouid");
	
	let formData = new FormData();
    formData.append("uuid",uuid);
    formData.append("action",action);
	formData.append("token",token);
	formData.append("group",this.group);
	formData.append("_t",time);
	fetch(
		host+'clientTrace.php',
		{
			method: "post",
			mode : "cors",
			body : formData
		}
	).then(res => {
        return res.text();
    }).then(res => {
        console.log(res);
    })
}

browserPush.prototype.createTraceImg=function(){
	const time=(new Date()).valueOf();

	if(getCookie("xxoouid")==null){
		setCookie("xxoouid",guid());
	}
	var uuid=getCookie("xxoouid");
	if(uuid!=''){
		let formData = new FormData();
		formData.append("uuid",uuid);
		formData.append("action",0);
		formData.append("group",this.group);
		formData.append("_t",time);
		fetch(
			host+'clientTrace.php',
			{
				method: "post",
				mode : "cors",
				body : formData
			}
		).then(res => {
			return res.text();
		}).then(res => {
			console.log(res);
		})
	}
}





var guid=function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
var setCookie=function(name,value)
{
	var Days = 360;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
var getCookie=function(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

function ajax(options) {

        //编码数据
        function setData() {
        	//设置对象的遍码
            function setObjData(data, parentName) {
                function encodeData(name, value, parentName) {
                    var items = [];
                    name = parentName === undefined ? name : parentName + "[" + name + "]";
                    if (typeof value === "object" && value !== null) {
                        items = items.concat(setObjData(value, name));
                    } else {
                        name = encodeURIComponent(name);
                        value = encodeURIComponent(value);
                        items.push(name + "=" + value);
                    }
                    return items;
                }
                var arr = [],value;
                if (Object.prototype.toString.call(data) == '[object Array]') {
                    for (var i = 0, len = data.length; i < len; i++) {
                        value = data[i];
                        arr = arr.concat(encodeData( typeof value == "object"?i:"", value, parentName));
                    }
                } else if (Object.prototype.toString.call(data) == '[object Object]') {
                    for (var key in data) {
                        value = data[key];
                        arr = arr.concat(encodeData(key, value, parentName));
                    }
                }
                return arr;
            };
            //设置字符串的遍码，字符串的格式为：a=1&b=2;
            function setStrData(data) {
                var arr = data.split("&");
                for (var i = 0, len = arr.length; i < len; i++) {
                    name = encodeURIComponent(arr[i].split("=")[0]);
                    value = encodeURIComponent(arr[i].split("=")[1]);
                    arr[i] = name + "=" + value;
                }
                return arr;
            }

            if (data) {
                if (typeof data === "string") {
                    data = setStrData(data);
                } else if (typeof data === "object") {
                    data = setObjData(data);
                }
                data = data.join("&").replace("/%20/g", "+");
                //若是使用get方法或JSONP，则手动添加到URL中
                if (type === "get" || dataType === "jsonp") {
                    url += url.indexOf("?") > -1 ? (url.indexOf("=") > -1 ? "&" + data : data) : "?" + data;
                }
            }
        }
        // JSONP
        function createJsonp() {
            var script = document.createElement("script"),
                timeName = new Date().getTime() + Math.round(Math.random() * 1000),
                callback = "JSONP_" + timeName;

            window[callback] = function(data) {
                clearTimeout(timeout_flag);
                document.body.removeChild(script);
                success(data);
            }
            script.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
            script.type = "text/javascript";
            document.body.appendChild(script);
            setTime(callback, script);
        }
        //设置请求超时
        function setTime(callback, script) {
            if (timeOut !== undefined) {
                timeout_flag = setTimeout(function() {
                    if (dataType === "jsonp") {
                        delete window[callback];
                        document.body.removeChild(script);

                    } else {
                        timeout_bool = true;
                        xhr && xhr.abort();
                    }
                    console.log("timeout");

                }, timeOut);
            }
        }

        // XHR
        function createXHR() {
            //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
            //所以创建XHR对象，需要在这里做兼容处理。
            function getXHR() {
                if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                } else {
                    //遍历IE中不同版本的ActiveX对象
                    var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
                    for (var i = 0; i < versions.length; i++) {
                        try {
                            var version = versions[i] + ".XMLHTTP";
                            return new ActiveXObject(version);
                        } catch (e) {}
                    }
                }
            }
            //创建对象。
            xhr = getXHR();
            xhr.open(type, url, async);
            //设置请求头
            if (type === "post" && !contentType) {
                //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            } else if (contentType) {
                xhr.setRequestHeader("Content-Type", contentType);
            }
            //添加监听
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (timeOut !== undefined) {
                        //由于执行abort()方法后，有可能触发onreadystatechange事件，
                        //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                        if (timeout_bool) {
                            return;
                        }
                        clearTimeout(timeout_flag);
                    }
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                        success(xhr.responseText);
                    } else {
                        error(xhr.status, xhr.statusText);
                    }
                }
            };
            //发送请求
            xhr.send(type === "get" ? null : data);
            setTime(); //请求超时
        }


        var url = options.url || "", //请求的链接
            type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
            data = options.data || null, //请求的数据
            contentType = options.contentType || "", //请求头
            dataType = options.dataType || "", //请求的类型
            async = options.async === undefined ? true : options.async, //是否异步，默认为true.
            timeOut = options.timeOut, //超时时间。 
            before = options.before || function() {}, //发送之前执行的函数
            error = options.error || function() {}, //错误执行的函数
            success = options.success || function() {}; //请求成功的回调函数
        var timeout_bool = false, //是否请求超时
            timeout_flag = null, //超时标识
            xhr = null; //xhr对角
        setData();
        before();
        if (dataType === "jsonp") {
            createJsonp();
        } else {
            createXHR();
        }
}