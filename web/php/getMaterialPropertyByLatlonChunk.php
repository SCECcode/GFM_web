<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
/* get string and then need to split and extract triplet out of them */
$datastr = ($_GET['datastr']); 
$zmode = ($_GET['zmode']);
$chunkid = intVal($_GET['chunkid']);
$ulabel = ($_GET['ulabel']);
$lastchunks = intVal($_GET['chunks'])-1;
$skip = intVal($_GET['skip']);

/* if chunkid == 0, it is first chunk, create 
   the .json file in result/GFM_ulabel.json, 
   other ones, just 'append'               */

$fname="../result/GFM_".$ulabel.".json";
if ($chunkid == 0) {
   $fp= fopen($fname,"w") or die("Unable to open file!");
   $start=" { \"GFM_".$ulabel."\": [";
   fwrite($fp,$start); fwrite($fp,"\n");
   } else {
      $fp= fopen($fname,"a") or die("Unable to open file to append!");
}

$itemlist = new \stdClass();

$datalist=explode(",",$datastr);

$cnt=count($datalist);
$set= intval($cnt/3);

for($i=0; $i< $set; $i++) {

  $idx= $i*3;
  $lon=$datalist[$idx];
  $lat=$datalist[$idx+1];
  $z=$datalist[$idx+2];

  $lstr = "-l ".$lat.",".$lon.",".$z;
  $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g ".$lstr;

  if ($zmode == 'e') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z elev ".$lstr;
  if ($zmode == 'd') 
     $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g "."-z dep ".$lstr;

  $query="../model/cvmh_target/bin/vx_lite -m ../model/cvmh_target/model -g ".$lstr;

  $result = exec(escapeshellcmd($query), $retval, $status);

/*  echo $result; */
  fwrite($fp,$result); 
  if($i != ($set-1)) {
    fwrite($fp,",\n");
    } else { 
      if($chunk == $lastchunk) {
       fwrite($fp,"\n] }\n");
      }
  }

  $itemlist->$i=$result;
}

fclose($fp);

// don't transfer back the material property..
if($skip) {
   $resultstring="";
} else {
  $resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');
}

echo "<div data-side=\"materialPropertyByLatlonChunk\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

