<?php
header("Content-type: application/json; charset=utf-8"); 
require 'lib/phpQuery.php';
require 'lib/QueryList.php';
use QL\QueryList;

$hj = QueryList::Query(
	'https://www.sex.com/gifs/?sort=popular&sub=year',
	array(
		"img"=>array('.image','data-src'),
		"download"=>array('.actions .btn-default','text'),
		"heart"=>array('.actions .btn-primary','text'),
                "title"=>array('.image_wrapper','title')
            
	)
);

$data = $hj->getData(function($x){
    return $x;
});

echo json_encode($data);

