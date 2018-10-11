
var setCookie = function (name, value)
{
    var Days = 360;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
}
var getCookie = function (name)
{
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

var getGuid = function () {


    var guid = getCookie("_pushGuid");
    if (guid == null) {
        var fingerprint = null;
        new Fingerprint().get(function (result, components) {
            fingerprint = result;
        });
        setCookie("_pushGuid", fingerprint);
        return fingerprint;
    } else {
        return guid;
    }
}