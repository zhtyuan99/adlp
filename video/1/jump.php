<?php
session_start();
$time=time();
$clickid=isset($_GET['s2'])?$_GET['s2']:"";
if(!empty($clickid)){
    $_SESSION['_t']=$time;
    $_SESSION['clickid']=$clickid;
    header('Location: index.php');
    exit;
}else{
   //跳OFFER
}
