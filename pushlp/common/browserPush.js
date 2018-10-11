
var browserPush = function (callback) {
    this.callback = function (stauts, msg,currentToken=null) {
        if (typeof callback === "function") {
            callback(stauts, msg,currentToken);
        }
    };
    this.publicVapidKey = "BKF2-aGBrXVvZhk4prCKNSKhgPR9akvecWmEMyLl0fQM-qJVtZxHzSjYC4DGItxfDWUUvmq7Yz9jIu5AXgiqLMg";
    this.firebase = firebase;
    this.message = null;
    this.initError = this.init();
}
browserPush.prototype.init = function () {

    var initError = null;
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        let message = this.firebase.messaging();
        let that = this;
        message.usePublicVapidKey(this.publicVapidKey);
        this.message = message;
    } else {
        initError = "your browser dont suport the api";
    }
    return initError;


}
browserPush.prototype.run = function () {
	
    let that = this;
    if (that.initError != null) {
        //初始化不成功
        that.callback(1001, that.initError);
        return;
    }
    that.message.requestPermission().then(function () {
        that.message.getToken().then(function (currentToken) {
            that.callback(0, 'success',currentToken);
        }).catch(function (err) {
            that.callback(1002, err.message);
        });

    }).catch(function (err) {
       
        that.callback(1003, err.message);
        
    });
}

