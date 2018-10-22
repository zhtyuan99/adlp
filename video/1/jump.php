<?php
session_start();
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