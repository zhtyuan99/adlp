self.addEventListener('push', function (e) {

    var json = e.data.json();
    var notification = json.notification;
    var data = json.data;
    var options = {
        body: notification.body,
        icon: notification.icon,
        image: data.image,
        tag: data.senderId, //保证只显示最后发的一条
        data: {
            link: data.link,
            msgId: data.msgId,
            traceUrl: data.traceUrl
        }
    };
    e.waitUntil(
            self.registration.showNotification(notification.title, options)
            );

    let formData = new FormData();
    formData.append("msgId", data.msgId);
    formData.append("action", "open");
    fetch(
            data.traceUrl,
            {
                method: "post",
                mode: "cors",
                body: formData
            }
    ).then(res => {
        return res.text();
    }).then(res => {
        console.log(res);
    })

});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;
    const link = notification.data.link;
    clients.openWindow(link);
    let formData = new FormData();
    formData.append("msgId", notification.data.msgId);
    formData.append("action", "click");
    fetch(
            notification.data.traceUrl,
            {
                method: "post",
                mode: "cors",
                body: formData
            }
    ).then(res => {
        return res.text();
    }).then(res => {
        console.log(res);
    })
    notification.close();

})
