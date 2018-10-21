<?php
session_start();
date_default_timezone_set('Asia/Shanghai');
$g = @$_GET["lpkey"];
$h = substr($g, 0, 2) . substr($g, 4, 2) . substr($g, 8, 2) . substr($g, 12, 2) . substr($g, 16, 2);
if (time() > $h) {
    header('Location: https://secureconv-smart.com/?a=70580&c=130746');
    exit;
}
$clickid = isset($_GET['clickid']) ? $_GET['clickid'] : "";
if (!empty($clickid)) {
    $_SESSION['clickid'] = $clickid;
    header('Location: lp.php?v='.$clickid);
    exit;
} else {
    header('Location: https://secureconv-smart.com/?a=70580&c=130746');
    exit;
}
?>