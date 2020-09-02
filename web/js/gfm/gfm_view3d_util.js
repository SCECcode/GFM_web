/***

    view3d_gfm_util.js

   // view3d's  util that is gfm specific

***/

//GFM
var viewerType="GFM";
var initial_track_trace = 1;
var initial_trace_html="Show Trace";
var initial_not_trace_html="Hide Trace";
function reset_search_selection() {
  // do nothing
}

/*********************************/

var MODAL_TS_URLS;

function save_MODAL_TS_URLS(urls)
{
  MODAL_TS_URLS=urls;
}

function get_MODAL_TS_URLS()
{
   return MODAL_TS_URLS;
}

function collectURLFor3d() {
   var selected=get_active_id2id_gfm_region();
   return makeTSList(selected); 
}

function executePlot3d() {
    startPlot3d();
    showPlot3dWarning();
} 

function startPlot3d() {
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
  save_MODAL_TS_URLS(str);
  show3dView(str);
}

