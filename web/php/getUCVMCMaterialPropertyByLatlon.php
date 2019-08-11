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

$estr = "echo '". $firstlat." ".$firstlon." ".$firstz."'";

$query=$estr." | ../../model/UCVMC_TARGET/bin/ucvm_query -m cvmh -f ../../model/UCVMC_TARGET/conf/ucvm.conf -c gd";

if ($firstzmode == 'e') 
     $query=$estr." | ../../model/UCVMC_TARGET/bin/ucvm_query -m cvmh -f ../../model/UCVMC_TARGET/conf/ucvm.conf -c ge "

$result = exec(escapeshellcmd($query), $retval);

$resultstring = htmlspecialchars($result, ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"materialPropertyUCVMCByLatlon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

