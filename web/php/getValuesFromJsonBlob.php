<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$ulabel = ($_GET['ulabel']);
$xheader = ($_GET['xheader']);
$yheader = ($_GET['yheader']);
$zheader = ($_GET['zheader']);
$target = ($_GET['target']);

$xlist=[];
$ylist=[];
$zlist=[];
$tlist=[];

$fname="../result/GFM_".$ulabel.".json";
$label="GFM_".$ulabel;
$JSON = file_get_contents($fname);

$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($JSON, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
    if(!is_array($val)) {
        if ($key == $xheader) : 
           array_push($xlist,$val);
        elseif ($key == $yheader) :
           array_push($ylist,$val);
        elseif ($key == $zheader) :
           array_push($zlist,$val);
        elseif ($key == $target) :
           array_push($tlist,$val);
        endif;
    }
}

/* var_dump($tlist); */

$itemlist = new \stdClass();

$itemlist->$xheader=$xlist;
$itemlist->$yheader=$ylist;
$itemlist->$zheader=$zlist;
$itemlist->$target=$tlist;

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlonChunk\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

