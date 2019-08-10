<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$cmd = 'cat ../data/cvmh_canned.csv';
$resultstring = system(escapeshellcmd($cmd));

print $resultstring;

echo "<div data-side=\"materialPropertyByCan\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

