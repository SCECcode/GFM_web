<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$firstz = ($_GET['firstz']);
$firstzmode = ($_GET['firstzmode']);

$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$envstr=makeEnvString();
$file="../result/cross.png";

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e ".$firstz;
$qstub=" -h 500 -d vs -c cvmh -a d -s 3000 -o ".$file." -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET ";

if ($firstzmode == 'e') 
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_elevation_cross_section.py -v -100 ".$qstub.$lstr;
if ($firstzmode == 'd') 
     $query= $enstr." ../model/UCVMC_TARGET/utilities/plot_cross_section.py -v 100 ".$qstub.$lstr;

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {

    $resultstring = htmlspecialchars("cross.png", ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"crossSection\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}
?>
</body>
</html>

