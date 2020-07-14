<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("declare.php");

/* get string and then need to split and extract triplet out of them */
$datastr = ($_GET['datastr']); 
$zmode = ($_GET['zmode']);

$itemlist = new \stdClass();

$datalist=explode(",",$datastr);

$cnt=count($datalist);
$set= intval($cnt/3);

for($i=0; $i< $set; $i++) {

  $idx= $i*3;
  $lon=$datalist[$idx];
  $lat=$datalist[$idx+1];
  $z=$datalist[$idx+2];

  $lstr = "-l ".$lat.",".$lon.",".$z;
  $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g ".$lstr;

  if ($zmode == 'e') 
     $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g "."-z elev ".$lstr;
  if ($zmode == 'd') 
     $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g "."-z dep ".$lstr;

  $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g ".$lstr;

  $result = exec(escapeshellcmd($query), $retval, $status);

  $itemlist->$i=$result;
}

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlonList\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

