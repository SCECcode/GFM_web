/***

    plot3d_util.js

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

function save_MODAL_TS_LIST(url)
{
// https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM52_preferred/500m/CRFA-BPPM-WEST-Big_Pine_fault-CFM2_m500.ts
  var n;
  var path;
  var file;
  
  n=url.indexOf('/500m/');
  if(n == -1) {
    n=url.indexOf('/1000m/');
    if( n == -1) {
      n=url.indexOf('/2000m/');
      if( n == -1) {
        n=url.indexOf('/native/');
      }
    }
  }
  if( n != -1) {
    path=url.substring(0,n+1);
    file=url.substring(n+1);
    MODAL_TS_PATH=path;
    MODAL_TS_LIST.push(file);
    } else {
      MODAL_TS_LIST.push(url);
  }
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

function executePlot3d() {
    startPlot3d();
}

function startPlot3d()
{
/*
  collectURLsFor3d(mlist);
  var str=get_MODAL_TS_LIST();
*/
//good var str="[http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaE.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaW.ts]";

//OK, var str="[500m/CRFA-BPPM-WEST-Big_Pine_fault-CFM2_m500.ts]&filePATH=[https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM52_preferred/]";
//var str="http://localhost/~mei/gfm/cfm_data/WTRA-USAV-INDH-Indian_Hill_fault-CFM5.ts";

//var str="http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/GFM_3s_topoMosaic_900m_crop.ts";
//var str="http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/LAB_Vekic_10km.ts";
//var str="http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SanGabrielS60dip_fit.ts";

//var str="http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaW.ts";
var str="[http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-BasinAndRange.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-ColoradoPlateau.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-GreatValley.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-GulfRiftedMargin2.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-InnerBorderlandRift2.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-Mojavia.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-OceanicCrust.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-PeninsularRangeE2.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-PeninsularRangeW2.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-RiftAxis1.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-Salinia2.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SanFranciscoBay.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SanGabrielS60dip_fit.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SantaMariaRift2.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaE.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaW.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SouthernWalkerLane.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesN75dip_fit_extended.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesS32dip_fit_extended.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesW.ts]";



  if(window.location.hostname == "moho.scec.org") {
str="[http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-BasinAndRange.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-ColoradoPlateau.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-GreatValley.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-GulfRiftedMargin2.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-InnerBorderlandRift2.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-Mojavia.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-OceanicCrust.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-PeninsularRangeE2.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-PeninsularRangeW2.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-RiftAxis1.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-Salinia2.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SanFranciscoBay.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SanGabrielS60dip_fit.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SantaMariaRift2.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaE.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaW.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SouthernWalkerLane.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesN75dip_fit_extended.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesS32dip_fit_extended.ts,http://moho.scec.org/GFM_web/web/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesW.ts]";
}

//var str="[http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaE.ts,http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-SierraNevadaW.ts]";

//var str="[http://localhost/~mei/gfm/cfm_data/GFM_2020_tsurfs/fault_boundaries/GFM2-WesternTransverseRangesW.ts,http://localhost/~mei/gfm/cfm_data/WTRA-SGFZ-MULT-Southern_San_Gabriel_fault-CFM4.ts,http://localhost/~mei/gfm/cfm_data/WTRA-SSFZ-MULT-Santa_Susana_fault-CFM1.ts,http://localhost/~mei/gfm/cfm_data/WTRA-SYFZ-MULT-Santa_Ynez_fault_75dip-CFM5.ts]";

  show3dView(str);
}

