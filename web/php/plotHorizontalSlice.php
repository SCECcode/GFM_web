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

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e 1000";
$qstub=" -d vs -c cvmh -s 0.01 -a d -o ../result/horizontal.png -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET ";

$query= "PATH=../model/UCVMC_TARGET/bin:/Users/mei/SCEC/anaconda2/bin:/usr/local/opt/libxml2/bin:/usr/local/opt/sqlite/bin:/usr/local/opt/libxml2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin PYTHONPATH=../model/UCVMC_TARGET/utilities/pycvm ../model/UCVMC_TARGET/utilities/plot_horizontal_slice.py ".$qstub.$lstr;

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 )
   echo "plotHorizontalSlice: Success!";

$resultstring = htmlspecialchars("horizontal.png", ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"horizontalSlice\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

