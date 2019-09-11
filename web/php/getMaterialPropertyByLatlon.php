<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$lat = ($_GET['lat']);
$lon = ($_GET['lon']);
$z = ($_GET['z']);
$zmode = ($_GET['zmode']);

$lstr = "-l ".$lat.",".$lon.",".$z;
$query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g ".$lstr;
if ($zmode == 'e') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z elev ".$lstr;
if ($zmode == 'd') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z dep ".$lstr;

$result = exec(escapeshellcmd($query), $retval, $status);

$itemlist = new \stdClass();
$itemlist->mp=$result;

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

