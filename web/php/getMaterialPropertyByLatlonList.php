<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$count = parseInt($_GET['count']);
$locjson = ($_GET['json']); 
//"1":{"lat":latval1,"lon":lonval1,"z":zval1}.."n":{"lat":latvaln,"lon":lonvaln,"z":zvaln}
$zmode = ($_GET['zmode']);

$i=0;
$itemlist = new \stdClass();

//var_dump(json_decode($locjson));

$loclist=json_decode($locjson,true);
// Loop through the object
foreach($loclist as $key=>$loc){
  echo $key . "=>" . var_dump($loc) . "<br>";
  $lat=parseFloat($loc['lat']);
  $lon=parseFloat($loc['lon']);
  $z=parseFoat($loc['z']);

  $lstr = "-l ".$lat.",".$lon.",".$z;
  $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g ".$lstr;
  if ($zmode == 'e') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z elev ".$lstr;
  if ($zmode == 'd') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z dep ".$lstr;
  $result = exec(escapeshellcmd($query), $retval, $status);

  $itemlist->$key=$result;
}

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlonBlob\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

