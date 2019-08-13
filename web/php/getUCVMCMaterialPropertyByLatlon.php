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

$estr = " -l ".$firstlat.",".$firstlon.",".$firstz." ";

$query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m cvmh -f ../model/UCVMC_TARGET/conf/ucvm.conf -c gd -b ".$estr;

if ($firstzmode == 'e') 
     $query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m cvmh -f ../model/UCVMC_TARGET/conf/ucvm.conf -c ge -b ".$estr;

$result = exec(escapeshellcmd($query), $retval);

$resultstring = htmlspecialchars($result, ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"materialPropertyUCVMCByLatlon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>
