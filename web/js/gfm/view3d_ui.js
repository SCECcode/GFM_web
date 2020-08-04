/***

    view3d_util.js

***/
var MODAL_TS_LIST=[];
var MODAL_TS_PATH=null;

// https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM52_preferred/500m/CRFA-BPPM-WEST-Big_Pine_fault-CFM2_m500.ts
//    also ... -LEGG-CFM4_m500.ts
// http://localhost/~mei/testV/cfm_data/CFM_1571460363892.zip
// cfm_data/WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.ts

/***
call format,

 fileURL=[file1, file2]&filePATH=[path] 
 [native/WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.ts]&filePATH=[https://s3-us-west-2.amazonaws.com/files.scec.org/s3f-public/projects/cfm/CFM5/CFM52_preferred/]

***/

function clear_MODAL_TS_LIST()
{
  MODAL_TS_LIST=[];
  MODAL_TS_PATH=null;
}

function get_MODAL_TS_LIST()
{
   var str=MODAL_TS_LIST.toString();
   if(MODAL_TS_PATH != null) {
     var pstr=MODAL_TS_PATH.toString();
     var ppstr="&filePATH=["+pstr+"]";
     return "["+str+"]"+ppstr;
   }
   return "["+str+"]";
}

function collectURLFor3d() {
   var selected=get_active_id2id_region();
   return makeTSList(selected); 
}

function executePlot3d() {

  var filePath="[http://localhost/~mei/gfm/gfm_data/GFM_2020_tsurfs/block_boundaries/]";
  if(window.location.hostname == "moho.scec.org") {
    filePath="[http://moho.scec.org/GFM_web/web/gfm_data/GFM_2020_tsurfs/block_boundaries/]";
  }

/*
  var urls="[GFM2-BasinAndRange.ts,GFM2-ColoradoPlateau.ts,GFM2-GreatValley.ts,GFM2-GulfRiftedMargin2.ts,GFM2-InnerBorderlandRift2.ts,GFM2-Mojavia.ts,GFM2-OceanicCrust.ts,GFM2-PeninsularRangeE2.ts,GFM2-PeninsularRangeW2.ts,GFM2-RiftAxis1.ts,GFM2-Salinia2.ts,GFM2-SanFranciscoBay.ts,GFM2-SanGabrielS60dip_fit.ts,GFM2-SantaMariaRift2.ts,GFM2-SierraNevadaE.ts,GFM2-SierraNevadaW.ts,GFM2-SouthernWalkerLane.ts,GFM2-WesternTransverseRangesN75dip_fit_extended.ts,GFM2-WesternTransverseRangesS32dip_fit_extended.ts,GFM2-WesternTransverseRangesW.ts]";
*/
  
  var urls=collectURLFor3d();
  if(urls.length == 0) { // skip 3d if no region selected
    return;
  } 
  var str= "["+urls.toString()+"]"+"&filePATH="+filePath;
  show3dView(str);
}

