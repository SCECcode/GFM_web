<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("declare.php");
include ("util.php");

/* get string and then need to split and extract triplet out of them */
$datastr = ($_GET['datastr']); 
$zmode = ($_GET['zmode']);
$chunkid = intVal($_GET['chunkid']);
$uid = ($_GET['uid']);
$lastchunks = intVal($_GET['chunks'])-1;

/* if chunkid == 0, it is first chunk, create 
   the .json file in result/gfm/GFM_uid.json, 
   other ones, just 'append'               */

$fname="$GFM_WEB_LOC/result/GFM_".$uid.".json";
$ffname="$GFM_WEB_LOC/result/GFM_".$uid.".csv";
if ($chunkid == 0) {
   $fp= fopen($fname,"w") or die("Unable to open file!");
   $ffp= fopen($ffname,"w") or die("Unable to open file!");
   $start=" { \"GFM_".$uid."\": [";
   fwrite($fp,$start); fwrite($fp,"\n");
   fputcsv($ffp, array('X','Y','Z','utmX','utmY','elevX','elevY','topo','mtop','base','moho','src','cellX','cellY','cellZ','tg','vp','vs','rho','regionID','CTM_smoothed','CTM_unsmoothed','elevation','heatRegionID','region','rock','rock_id'));

   } else {
      $fp= fopen($fname,"a") or die("Unable to open file to append!");
      $ffp= fopen($ffname,"a") or die("Unable to open file to append!");
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
  $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g ".$lstr;

  if ($zmode == 'e') 
     $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g "."-z elev ".$lstr;
  if ($zmode == 'd') 
     $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g "."-z dep ".$lstr;

  $query="$GFM_WEB_LOC/model/cvmh_target/bin/vx_lite -m $GFM_WEB_LOC/model/cvmh_target/model -g ".$lstr;

  $result = exec(escapeshellcmd($query), $retval, $status);
  $nresult=insertRockAndHeatInfo($result,$zmode);

  fwrite($fp,$nresult); 
  fputcsv($ffp, json_decode($nresult,true));
 
  
  if($i != ($set-1)) {
    fwrite($fp,",\n");
    } else { 
      if($chunk == $lastchunk) {
       fwrite($fp,"\n] }\n");
      }
  }

  $itemlist->$i=$nresult;
}

fclose($fp);
fclose($ffp);

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlonChunk\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

