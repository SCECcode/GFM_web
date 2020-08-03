<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("declare.php");
include ("util.php");

/* get string and then need to split and extract triplet out of them */
$zmode = ($_GET['zmode']);
$uid = ($_GET['uid']);

/* grab the .json file and read line by line 
   do rock look up, update the data and push
   to a new json file

   new .json file in result/gfm/GFM_uid_final.json 
*/


$infname="$GFM_WEB_LOC/result/GFM_".$uid.".json";
$outfname="$GFM_WEB_LOC/result/GFM_".$uid."_final.csv";

$outfp= fopen($outfname,"w") or die("Unable to open output file!");

$key="GFM_".$uid;

$instr=file_get_contents($infname);
if ( $instr === FALSE )
   die("Unable to open input file!");

$jdata=json_decode($instr);
#var_dump($jdata);
#echo "<br>";
#echo "key...",$key;

$jarray = (array)$jdata->{$key};

$sz=count($jarray);

fputcsv($outfp, array('X','Y','Z','utmX','utmY','elevX','elevY','topo','mtop','base','moho','src','cellX','cellY','cellZ','tg','vp','vs','rho','regionID','CTM_smoothed','CTM_unsmoothed','elevation','heatRegionID','region','rock','rock_id'));

for($i=0; $i<$sz; $i++) {
  $item=$jarray[$i];
  $X=$item->{'X'};
  $Y=$item->{'Y'}; 
  $Z=$item->{'Z'}; 
  $elevation=$item->{'elevation'}; 
  $depth=$Z;
  if($zmode == 'e') {  // this is elevation
      $n_depth= $depth - $elevation;
      $depth= -1 * $n_depth;
  }
  $regionID=$item->{'regionID'};
  $region=getRegionName($regionID);
  $item->{"region"} = $region;
  $arr=getRockInfo($regionID,$depth);
  $item->{"rock"} = $arr["rockname"];
  $item->{"rock_id"} = $arr["rockid"];
  fputcsv($outfp, (array)$item);
}

fclose($outfp);

$metalist = new \stdClass();
$metalist->id=$uid;
$metalist->sz=$sz;

$resultstring = htmlspecialchars(json_encode($metalist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"addRockInformation\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

