<?php
function makeObj($row) {

include ("declare.php");

$myObj = new \stdClass();

$myObj->gid=$row[$gid];
$myObj->name=$row[$name];

$myJSON = json_encode($myObj);

return $myJSON;
}
?>
