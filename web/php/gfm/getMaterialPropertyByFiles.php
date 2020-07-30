<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("declare.php");

$uidstr = ($_GET['uidlist']);

$uidarray=json_decode($uidstr);

$cnt=count($uidarray);
$itemlist = new \stdClass();
for($i=0; $i<$cnt; $i++) {
   $fn=$uidarray[$i];

   $fname="$GFM_WEB_LOC/result/".$fn;
   $blob = file_get_contents($fname);

   if (is_null($blob)) {
      echo "BAD file_get_contents";
      continue;
   } 
   $itemlist->$i=$blob;
}

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"getMaterialPropertyByFiles\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

