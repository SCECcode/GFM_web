<?php

$rockfname="gfm_rock.json";
$rockstr=file_get_contents($rockfname);
if ( $rockstr === FALSE )
   die("Unable to open rock file!");

$rdata=json_decode($rockstr);
$tmp=$rdata->{"GFM_rock_tb"};
$rockarray = (array)$tmp->{"regions"};

$regionfname="gfm_region.json";
$regionstr=file_get_contents($regionfname);
if ( $regionstr === FALSE )
   die("Unable to open region file!");

$rrdata=json_decode($regionstr);
$tmp = $rrdata->{"GFM_tb"};
$gfmarray= (array) $tmp -> {"regions"};

function getRegionName($id) {
    global $gfmarray;
    $sz=count($gfmarray);
    for($i=0; $i<$sz; $i++) {
      $item=$gfmarray[$i];
      if( $item -> {"domain_id"} === $id ) {
        return $item -> {"name"};
      }
    }
    return "NA";
}

function getRockInfo($id, $depth) {
    global $rockarray;
    $sz=count($rockarray);

    for($i=0; $i<$sz; $i++) {
      $item=$rockarray[$i];
      $idlist=$item->{"domain_id"};
      if( in_array($id, $idlist)) {
          $rocklist=$item->{"rock"};   
          $rsz=count($rocklist);
          if($rsz != 0) {
              for($j=0; $j<$rsz; $j++) {
                  $rockitem=$rocklist[$j];
                  $start=$rockitem->{"start"};
                  $end=$rockitem->{"end"};
                  $rockname=$rockitem->{"type"};
                  $rockid=$rockitem->{"rock_id"};

                  $kdepth=$depth/1000;
                  if($kdepth >= $start && $kdepth <= $end) {
                     return array("rockname" => $rockname, "rockid" => $rockid);
                  }
              }
          }
      }
    }
    return "NA";
}

function insertRockInfo($str,$zmode) {
  $item=json_decode($str); 
  $X=$item->{'X'};
  $Y=$item->{'Y'};
  $Z=$item->{'Z'};
  $topo=$item->{'topo'};
  $depth=$Z;
  if($zmode == 'e') {  // this is elevation
      $n_depth= $depth - $topo;
      $depth= -1 * $n_depth;
  }
  $regionID=$item->{'regionID'};
  $region=getRegionName($regionID);
  $item->{"region"} = $region;
  $arr=getRockInfo($regionID,$depth);
  $item->{"rock"} = $arr["rockname"];
  $item->{"rock_id"} = $arr["rockid"];
  return json_encode($item);
}

?>
