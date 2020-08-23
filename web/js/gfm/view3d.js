/***
   view3d.js
***/

var VIEW3D_tb = {
  "3dview": [
       { 'id':1,
         'name': '3D Navigation',
         'description': 'Rotate in 3D: left click<br>Translate: shift key+left click<br> Zoom in/out: mouse scroll wheel'},
       { 'id':2,
         'name': 'Show Wireframe',
         'description': 'Selects the rendering mode for fault surfaces: Solid Surface, Wireframe or Surface with Wireframe overlay'},
       { 'id':3,
         'name': 'Hide Traces',
         'description': 'Show/Hide Fault traces and upper tiplines of Blind faults'},
       { 'id':4,
         'name': 'Hide Coastline',
         'description': 'Show/Hide California outline and coastline'},
       { 'id':5,
         'name': 'Hide Bounding Box',
         'description': 'Show/Hide Bounding Box around the selected faults'},
       { 'id':6,
         'name': 'Legend',
         'description': 'Show/Hide the Legend<br>Colored boxes in the legend can be clicked on to change surface color<br>Slider bar controls opacity from 0.1 to 1.0<br>Click on the fault name in the legend to toggle on/off surface visibility'},
       { 'id':7,
         'name': 'Show Mapview',
         'description': 'Return to the original mapview orientation zoomed to selected faults'},
       { 'id':8,
         'name': 'Close',
         'description': 'Close the 3D view'},
       { 'id':9,
         'name': 'Expand',
         'description': 'Expand to nearly full screen view'},
       { 'id':10,
         'name': 'Reset',
         'description': 'Refresh the 3D view to the default mapview orientation' },
       { 'id':11,
         'name': 'Save',
         'description': 'Save a copy of 3D view (no legend)' },
       { 'id':12,
         'name': 'Help',
         'description': 'Display this information table'},
       { 'id':13,
         'name': 'Orientation Marker',
         'description': 'Green arrow points toward the North<br>Pink points east'},
       { 'id':14,
         'name': '3D Map Scale?',
         'description': 'This tool currently has no option for plotting 3D axes, and a map scale in 3D is not reliable because the map scale would only be valid at one given distance from the viewer. This viewer is not designed to replace fully functional CAD software'},
        ]
};

function setup_info3dTable() {
   var tb=VIEW3D_tb['3dview'];
   var cnt=tb.length;
   var i;
   var tbhtml="<div class=\"ucvm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:8vw\">Name</th><th style=\"width:40vw\">Description</th></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['name'];
     var descript=item['description'];
     var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";

   var html=document.getElementById('info3dTable-container');
   html.innerHTML=tbhtml;
}

/*** iframe housekeeping ***/
/* fileURL=[file1, file2]&filePATH=[path] */
/* [native/WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.ts]&filePATH=[https://s3-us-west-2.amazonaws.com/files.scec.org/s3f-public/projects/cfm/CFM5/CFM52_preferred/]
*/
function show3dView(urls) {

  resetLegend3Dview();
  resetRepr3Dview();
  resetBounds3Dview();
  resetExpand3Dview();
  resetShore3Dview();
  resetTrace3Dview();

  $('#modal3D').modal('show');
  $('#view3DIfram').attr('src',"view3d.html?fileURL="+urls);
}

// should be able to track the initial state and then return to it
function refresh3Dview() {

  resetLegend3Dview();
  resetRepr3Dview();
  resetBounds3Dview();
  resetExpand3Dview();
  resetShore3Dview();
  resetTrace3Dview();

  var urls=get_MODAL_TS_URLS();
  $('#view3DIfram').attr('src',"");
  $('#view3DIfram').attr('src',"view3d.html?fileURL="+urls);
}

var track_trace=1; // 1 is on 0 is off
function toggleTrace3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Tracebtn").click();
  
  track_trace = !track_trace;
  if(track_trace) {
    elt.innerHTML="Show Traces";
    } else {
      elt.innerHTML="Hide Traces";
  }
}

function resetTrace3Dview() {
  let elt=document.getElementById("view3DToggleTracebtn");
  var track_trace=1; // 1 is on 0 is off
  elt.innerHTML="Show Traces";
}


var track_shore=1; // 1 is on 0 is off
function toggleShore3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Shorebtn").click();
  
  track_shore = !track_shore;
  if(track_shore) {
    elt.innerHTML="Hide Coastline";
    } else {
      elt.innerHTML="Show Coastline";
  }
}

function resetShore3Dview() {
  let elt=document.getElementById("view3DToggleShorebtn");
  var track_shore=1; // 1 is on 0 is off
  elt.innerHTML="Hide Coastline";
}

var track_legend=1; // 1 is on 0 is off
function toggleLegend3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Legendbtn").click();
  
  track_legend = !track_legend;
  if(track_legend) {
    elt.innerHTML="Hide Legend";
    } else {
      elt.innerHTML="Show Legend";
  }
}

function resetLegend3Dview() {
  let elt=document.getElementById("view3DToggleLegendbtn");
  var track_legend=1; // 1 is on 0 is off
  elt.innerHTML="Hide Legend";
}

function toggleNorth3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Northbtn").click();
}

var track_representation=0; // 1 is wireframe 0 is surface 2 is surface + edge
//publicAPI.toggle
function toggleRepr3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Reprbtn").click();
  
  track_representation = ( track_representation + 1 ) % 3;
  switch( track_representation ) {
    case 0:
      elt.innerHTML="Show Wireframe";
      break;
    case 1:
      elt.innerHTML="Show Wireframe & Surface";
      break;
    case 2:
      elt.innerHTML="Show Surface";
      break;
  }
}

function resetRepr3Dview() {
  track_representation=0;
  let elt=document.getElementById("view3DToggleReprbtn")
  elt.innerHTML="Show Wireframe";
}

var track_bounds=0; // 0 is final 1 is local 2 is none
//publicAPI.toggle
function toggleBounds3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Boundsbtn").click();

  track_bounds = ( track_bounds + 1 ) % 3;
  switch( track_bounds ) {
    case 0:
      elt.innerHTML="Show All Bounds";
      break;
    case 1:
      elt.innerHTML="Hide Bounds";
      break;
    case 2:
      elt.innerHTML="Show Bounds";
      break;
  }
}

function resetBounds3Dview() {
  track_bounds=0;
  let elt=document.getElementById("view3DToggleBoundsbtn");
  elt.innerHTML="Show All Bounds";
}

var track_full=1; // 1 is on 0 is off
function toggleExpand3Dview(elt) {
  
  track_full = !track_full;
  if(track_full) {
    elt.innerHTML="Expand";
    $('#modal3DDialog').removeClass('full_modal-dialog');
    $('#modal3DContent').removeClass('full_modal-content');
    document.getElementById("view3DIfram").height = "400";
    } else {
      elt.innerHTML="Shrink";
      $('#modal3DDialog').addClass('full_modal-dialog');
      $('#modal3DContent').addClass('full_modal-content');
      var c=document.getElementById("modal3DContent");
      var f=document.getElementById("modal3DFooter");
      var c_h=c.scrollHeight;
      var f_h=f.scrollHeight;
      var n_h=c_h -(f_h* 2.5);
      document.getElementById("view3DIfram").height = n_h;
  }
}
function resetExpand3Dview() {
  let elt=document.getElementById("view3DExpandbtn");
  if(track_full == 0) {
    track_full=1;
    elt.innerHTML="Expand";
    $('#modal3DDialog').removeClass('full_modal-dialog');
    $('#modal3DContent').removeClass('full_modal-content');
    document.getElementById("view3DIfram").height = "400";
  }
}


function save3Dview() {
  document.getElementById("view3DIfram").contentDocument.getElementById("Downloadbtn").click();
}

