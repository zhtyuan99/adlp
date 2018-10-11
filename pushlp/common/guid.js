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
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/";
}
var getCookie=function(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

var getGuid=function(){
	
	var fingerprint = new Fingerprint().get();
	var guid=getCookie("_pushGuid");
	if(guid==null){
		setCookie("_pushGuid",fingerprint);
		return fingerprint;
	}else{
		return guid;
	}
}