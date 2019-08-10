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

$cmd = '../cvmh/bin/vx_lite -m ../cvmh/model -g ';
$lstr = "-l ".$firstlat.",".$firstlon.",".$firstz;

$query="../cvmh/bin/vx_lite -m ../cvmh/model -g ".$lstr;
if ($firstzmode == 'e') 
     $query="../cvmh/bin/vx_lite -m ../cvmh/model -g "."-z elev ".$lstr;
if ($firstzmode == 'd') 
     $query="../cvmh/bin/vx_lite -m ../cvmh/model -g "."-z dep ".$lstr;

$result = exec(escapeshellcmd($query), $retval);

$resultstring = htmlspecialchars($result, ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"materialPropertyByLatlon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

