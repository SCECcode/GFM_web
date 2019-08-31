<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$firstz = ($_GET['firstz']);
$firstzmode = ($_GET['firstzmode']);

$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

## only use 1 z and 1 zmode
$lstr = "-l ".$firstlat.",".$firstlon.",".$firstz;
$query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g ".$lstr;
if ($firstzmode == 'e') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z elev ".$lstr;
if ($firstzmode == 'd') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z dep ".$lstr;

$result = exec(escapeshellcmd($query), $retval);

$result2="";
if($secondlat != "" && $secondlon != "") { 
  $lstr2 = "-l ".$secondlat.",".$secondlon.",".$firstz;
  $query2="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g ".$lstr2;
  if ($firstzmode == 'e') 
     $query2="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z elev ".$lstr2;
  if ($firstzmode == 'd') 
     $query2="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z dep ".$lstr2;
  $result2 = exec(escapeshellcmd($query2), $retval);
}

$itemlist = new \stdClass();
$itemlist->first=$result;
$itemlist->second=$result2;

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

