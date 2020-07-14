<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("declare.php");

$cmd = 'cat $GFM_WEB_LOC/data/gfm/cvmh_canned.csv';
$resultstring = system(escapeshellcmd($cmd));

print $resultstring;

echo "<div data-side=\"materialPropertyByCan\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

