<?php
$item = isset($_GET["item"])?$_GET["item"]:"helloPush";
$clickid = isset($_GET["clickid"])?$_GET["clickid"]:"0";
?>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>This offer is not available in your country</title>
        <meta http-equiv="Pragma" content="nocache">
        <meta http-equiv="Expires" content="-1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <link href="assets/css.css" rel="stylesheet">
        <link rel="manifest" href="manifest.json">
        <style>
            body {
                width: 100%;
                display: block;
                position: relative;
                padding: 0;
                margin: 0 auto;
                min-width: 100%;
                background-color: #dedede;
                background-size: 100% auto;
                font-size: 13px;
                font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
                color: #031931;
                line-height: 19px;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            a {
                color: #fff;
                display: none;
                visibility: hidden
            }
            #push-overlay {
                position: fixed;
                height: 100%;
                width: 100%;
                background: rgba(0, 0, 0, 0.9);
                top: 0px;
                display: block;
                z-index: 1100;
                right: 0;
                left: 0;
            }
            .overlay-bg {
                width: 100%;
                position: relative;
                margin: auto;
            }
            .intro-modal {
                z-index: 100;
                position: fixed;
                top: 150px;
                left: 250px;
                width: 100%;
                max-width: 720px;
                display: none;

                background: url('assets/green-up-arrow.png') 0 0 no-repeat;

                padding: 128px 0 0 0;
            }
            .intro-modal p {
                color: #fff;
                font-size: 22px;
                margin: .5em 0;
            }
            .intro-modal p.intro-modal-heading {
                font-size: 30px;
                font-weight: 700;
                margin: 0;
            }
            .intro-modal p.intro-modal-heading span {
                float: right;
                font-weight: 300;
                cursor: pointer;
            }
            .bottom-sheet {
                /*visibility: hidden;*/
                display: block;
                opacity: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
                background-color: rgba(62,62,62,.8);
                transition: opacity .4s,visibility .4s;
            }
            .bottom-sheet .sheet p {
                margin-top: 2em;
                font-size: 1.5em;
                color: #fff;
                text-align: center;
            }
            .bottom-sheet .sheet p button {
                margin-top: 1.25em;
                font-size: .666666666667em;
            }
            button.white {
                background: 0 0;
                border: 2px solid #fff;
            }
            button {
                -webkit-appearance: none;
                -webkit-font-smoothing: antialiased;
                background: #209dd2;
                font: 700 1em Lato,Helvetica,Arial,sans-serif;
                padding: .815em 2.5em;
                border-radius: 0;
                border: none;
                color: #fff;
                text-transform: uppercase;
                transition: background-color .2s;
                -webkit-appearance: button;
                cursor: pointer;
                overflow: visible;
                margin: 0;
                align-items: flex-start;
                text-align: center;
            }
            .bottom-sheet .sheet .close {
                position: absolute;
                top: .3125em;
                right: 1.25em;
                font-size: 1.5em;
                color: #fff;
                cursor: pointer;
            }

            #push-overlay .intro-modal p {
                height: initial;
                font-size: 22px;
                line-height: 22px;
            }

            .intro-modal-close {
                display: block;
                position: absolute;
                top: 70px;
                right: 0;
                color: rgba(255,255,255,0.9);
                font-size: 24px;
                font-weight: 500;
            }

            .intro-modal-close:hover {
                color: rgba(255,255,255,0.6);
            }

            .intro-modal-close strong {
                color: white;
                font-weight: 600;
                padding: 0 3px;
            }

            .intro-modal-close:hover strong {
                color: white;
            }

            #push-overlay .intro-modal p.intro-modal-heading {
                font-size: 23px;
                font-weight: 600;
                letter-spacing: 0.1px;
                line-height: 1.1;
            }

            #push-overlay .intro-modal p.intro-modal-subheading {
                font-size: 19px;
                font-weight: 200;
                letter-spacing: 1px;
                line-height: 1.2;
            }

            @media (max-width: 30em) {
                .intro-modal {
                    top: initial;
                    bottom: 60%;
                    left: 0 !important;

                    background: url('assets/down-arrow.png') bottom center no-repeat;


                    text-align: center;
                    padding: 0 10px 50px;
                }

                .intro-modal-close {
                    top: -100px;
                    left: 0;
                    color: white;
                    font-size: 28px;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .intro-modal-close strong {
                    text-transform: none;
                }
            }
        </style>
    </head>
    <body class="page-email">

        <div id="push-overlay" class="overlay-bg">
            <aside class="intro-modal" id="push-intro-modal" style="display: block;">
                <p class="intro-modal-heading">Just one more step!</p>
                <p class="intro-modal-subheading">'Allow' to continue</p>
            </aside>

        </div>
        <script type="text/javascript" src="common/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="common/fingerprint2.js"></script>
        <script type="text/javascript" src="common/guid.js"></script>
        <script type="text/javascript" src="common/libs/base.js"></script>
        <script type="text/javascript" src="common/libs/messaging.js"></script>
        <script type="text/javascript" src="common/init.js"></script>
        <script type="text/javascript" src="common/browserPush.js"></script>
        <script>
            var callback = function (code, msg, currentToken) {
                console.log(code, msg, currentToken);
                if (currentToken != null) {
                    var data = {
                        item: "5c7098b5a150e46c85c44cc3c8bf237e",
                        guid: getGuid(),
                        token: currentToken
                    }
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1/postback.php",
                        data: data,
                        crossDomain: true,
                        complete: function (r, t) {
                            postBackEvents(2);
                        }
                    });
                } else {
                    //切换域名
                    console.log("切换域名");
                    nextDomain();
                }
            }
            var browserPush = new browserPush(callback);
            browserPush.run();

            function postBackEvents(event) {
                $.ajax({
                    type: "POST",
                    url: "https://afilter.xyz/p/events",
                    data: {"et": event},
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    complete: function (r, t) {
                        //  top.location = 'http://www.baidu.com';
                    }
                });
            }
            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function nextDomain() {
                var domain_split = window.location.hostname.split('.');
                if (!isNumber(domain_split[0])) {
                    top.location = window.location.href.replace("://" + domain_split[0] + ".", "://0.");
                } else {
                    var newNumber = parseInt(domain_split[0]) + 1;
                    if (newNumber >= 10) {
                        top.location = 'http://www.baidu.com';
                    } else {
                        top.location = window.location.href.replace("://" + domain_split[0] + ".", "://" + String(newNumber) + ".");
                    }
                }
            }
        </script>


    </body></html>