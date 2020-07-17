<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("declare.php");

$uid = ($_GET['uid']);
$xheader = ($_GET['xheader']);
$yheader = ($_GET['yheader']);
$zheader = ($_GET['zheader']);
$target = ($_GET['target']);

$xlist=[];
$ylist=[];
$zlist=[];
$tlist=[];

$fname="$GFM_WEB_LOC/result/GFM_".$uid.".json";
$label="GFM_".$uid;

$JSON = file_get_contents($fname);

if (is_null($JSON)) {
   echo "BAD file_get_contents";
} 

$val=json_decode($JSON, TRUE);

if (!is_array($val)) {
   echo "bad data...";
   echo "<div data-side=\"getValuesFromJsonBlob\" data-params=\""; 
   echo "ERROR, can not extract json value from ".$fname;
   echo "\" style=\"display:flex\"></div>";
   return;
}

$arrayIterator= new RecursiveArrayIterator($val);

$jsonIterator = new RecursiveIteratorIterator(
    $arrayIterator,
    RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
    if(!is_array($val)) {
        if ($key == $xheader) : 
           $xlist[]=$val;      
        elseif ($key == $yheader) :
           $ylist[]=$val;      
        elseif ($key == $zheader) :
           $zlist[]=$val;      
        elseif ($key == $target) :
           $tlist[]=$val;      
        endif;
    }
}

$itemlist = new \stdClass();

$itemlist->$xheader=$xlist;
$itemlist->$yheader=$ylist;
$itemlist->$zheader=$zlist;
$itemlist->$target=$tlist;

/*
var_dump($itemlist);
*/

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"getValuesFromJsonBlob\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

