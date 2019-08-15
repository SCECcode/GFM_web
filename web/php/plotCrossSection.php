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

$file="../result/cross.png";

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e ".$firstz;
$qstub=" -h 100 -d vs -c cvmh -a d -s 0 -o ".$file." -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET ";

if ($firstzmode == 'e') 
     $query= "PATH=../model/UCVMC_TARGET/bin:/Users/mei/SCEC/anaconda2/bin:/usr/local/opt/libxml2/bin:/usr/local/opt/sqlite/bin:/usr/local/opt/libxml2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin PYTHONPATH=../model/UCVMC_TARGET/utilities/pycvm ../model/UCVMC_TARGET/utilities/plot_elevation_cross_section.py -v -100 ".$qstub.$lstr;
if ($firstzmode == 'd') 
     $query= "PATH=../model/UCVMC_TARGET/bin:/Users/mei/SCEC/anaconda2/bin:/usr/local/opt/libxml2/bin:/usr/local/opt/sqlite/bin:/usr/local/opt/libxml2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin PYTHONPATH=../model/UCVMC_TARGET/utilities/pycvm ../model/UCVMC_TARGET/utilities/plot_cross_section.py -v 100 ".$qstub.$lstr;

$result = exec(escapeshellcmd($query), $retval, $status);

echo $status;

if ( $status == 0 && file_exists($file)) {
    echo "plotCrossSection: Success!";

    $resultstring = htmlspecialchars("cross.png", ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"crossSection\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}
?>
</body>
</html>

