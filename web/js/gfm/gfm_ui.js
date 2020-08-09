/***
   gfm_ui.js
***/
// global flag to show if material property is at the very start of
// insert
var hold_mptable=1;

// [ {"uid":uid, "blob":blob } ]
var gfm_resulttb_list=[];

// tracking the layer that contains CFM5.2 faults
var gfm_cfm_layer;
var show_cfm=false;
// tracking the layer that contains GFM1.0 regions
var gfm_gfm_layer;
var show_gfm=false;
// tracking when using pointClick -- on map
var drawing_point=false;

// region selecting table
function setup_gfm_table() {
    toggleShowGFM();
    makeRegionResultTable();
    tableLoadCompleted = true;
}

// setup information tables
function setup_tables() {
    document.getElementById('parametersTable').innerHTML=makeParametersInfoTable();
    document.getElementById('regionsTable').innerHTML=makeRegionsInfoTable();
    document.getElementById('heatRegionsTable').innerHTML=makeHeatRegionsInfoTable();
    document.getElementById('rockTypeTable').innerHTML=makeRockTypeInfoTable();
    document.getElementById('zmodeTable').innerHTML=makeZModeInfoTable();
    document.getElementById('fileFormatTable').innerHTML=makeFileFormatInfoTable();
}

// true, select all regions, false, deselect all region
var toggle_all_flag=false;
function toggleAll() {
   toggle_all_flag = ! toggle_all_flag;
   select_all_id2id(toggle_all_flag);
}

function reset_toggleAll() {
   toggle_all_flag=false;
   select_all_id2id(toggle_all_flag);
   setSkipPopup(false);
}

function pointClick() {
  drawing_point = ! drawing_point;

  if(drawing_point) {
    $('#pointBtn').addClass('pick');
    $('#pointBtn').removeClass('glyphicon-ok-sign');
    $('#pointBtn').addClass('glyphicon-remove-sign');
    } else {
      drawing_point = false;
      $('#pointBtn').removeClass('glyphicon-remove-sign');
      $('#pointBtn').addClass('glyphicon-ok-sign');
  }
}

function zap_pointClick() {
  if(drawing_point) {
     pointClick();
  }
}

function in_drawing_point() {
   if(drawing_point) 
     return 1;
   return 0;
}

function setup_CFM() {
   gfm_cfm_layer=readLocalAndProcessActiveCFMGeo();
}

function toggleShowCFM() {
   show_cfm=!show_cfm;
   if(show_cfm) {
     viewermap.addLayer(gfm_cfm_layer);
     $('#gfm_cfm_btn').removeClass('glyphicon-ok-sign');
     $('#gfm_cfm_btn').addClass('glyphicon-remove-sign');
     } else {
       viewermap.removeLayer(gfm_cfm_layer);
       $('#gfm_cfm_btn').addClass('glyphicon-ok-sign');
       $('#gfm_cfm_btn').removeClass('glyphicon-remove-sign');
   }
}

function setup_GFM() {
   gfm_gfm_layer=readLocalAndProcessActiveGFMGeo();
   window.console.log("setup gfm_gfm_layer");
}

// toggle the whole set of them
function toggleShowGFM() {
   show_gfm=!show_gfm;
   if(show_gfm) {
     viewermap.addLayer(gfm_gfm_layer);
     $('#gfm_gfm_btn').removeClass('glyphicon-ok-sign');
     $('#gfm_gfm_btn').addClass('glyphicon-remove-sign');
     } else {
       viewermap.removeLayer(gfm_gfm_layer);
       $('#gfm_gfm_btn').addClass('glyphicon-ok-sign');
       $('#gfm_gfm_btn').removeClass('glyphicon-remove-sign');
   }
}

function plotRegionClick() {
    document.getElementById('spinIconForRegion').style.display = "block";
//    getCannedMaterialProperty();
    plotCannedMaterialProperty();
}

function propertyClick() {
    document.getElementById('queryBlock').style.display = "";	
}

function queryClick() {
    document.getElementById('spinIconForQuery').style.display = "block";	
    getMaterialPropertyByLatlon();
}

// it is filelist
function selectLocalFiles(_urls) {
    document.getElementById('spinIconForListProperty').style.display = "block";	

    if(_urls == undefined) {
      throw new Error("must have an url!");
    }
    var _url=_urls[0];
    if( _url instanceof File) {
      readAndProcessLocalFile(_url);
    } else {
      throw new Error("local file must be a File object type!");
    }
}

function resetAll() {
  remove_all_layers();
  reset_toggleAll();
  refresh_map();
  clear_popup();
  refreshTxtInput();
  refreshMPTable();
  refreshResultTable();
  document.getElementById("phpResponseTxt").innerHTML = "";
}

function refreshTxtInput() {
  $('#LatTxt').val(31.70);
  $('#LonTxt').val(-116.20);
  $('#ZTxt').val(-9700);
  $('#ZmodeTxt').val('e');
}

function refreshMPTable() {
    var table=document.getElementById("materialPropertyTable");
    table.innerHTML="<tbody><tr id=\"placeholder-row\"><td colspan=\"12\">Material Property for selected locations will appear here. </td></tr></tbody>";
    hold_mptable=1;
}

function refreshResultTable() {
    var table=document.getElementById("resultTable");
    table.innerHTML="<tbody><tr id=\"placeholder-row\"><td colspan=\"12\">Downloadable Result will appear here. </td></tr></tbody>";
}

//var MPtb_label_order=['X','Y','Z','elevation','vp','vs','rho','region','rock','heatRegion','CTM_smoothed','regionID','topo'];
var MPtb_label_order=['X','Y','Z','elevation','vp','vs','rho','region','rock','heatRegion','CTM_smoothed'];
// takes 1 set of result
// of { 'mp':{...}, 'second':{...}, ...}
function makeMPTable(uid,str)
{
    var blob;
    if( str == undefined || str == "" || str['mp'] == "" ) {
       window.console.log("ERROR: no return result");
       return "";
    }
    if( typeof str === 'string') { 
       blob=JSON.parse(str);
       } else {
         blob=str;
    }

    var dkeys=Object.keys(blob);
    var dsz=(Object.keys(blob).length); 

    if(dsz != 1) {
       window.console.log("ERROR: expecting just 1 set of material properties");
       return;
    }

    var zmode=document.getElementById("ZmodeTxt").value;

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    insert_materialproperty(uid,datablob); // save a copy

    // create the key first
    var labelline="<th style=\"width:10vw;background-color:whitesmoke\"></th>";
    
    var datakeys=Object.keys(datablob);
    var sz=datakeys.length;

    var table=document.getElementById("materialPropertyTable");
    var html="";

// special case, need to give info button to Region Table, Lithology type..
    var colcnt=MPtb_label_order.length;
    if(hold_mptable) {
        for(var i=0; i<colcnt; i++) {
            var label=MPtb_label_order[i];
            var nkey=showLabelInTable(label);
            if(nkey) {
              // if nekey is ..
              if(label == "region") {
                 labelline=labelline+"<th style=\"width:24vw;background-color:whitesmoke\">"+nkey+"<br><button class=\"btn gfm-top-small-btn\" title=\"list all GFM regions\" data-toggle=\"modal\" data-target=\"#modalRegions\"><span class=\"glyphicon glyphicon-info-sign\"></span></button></th>";
                 continue;
              }
              if(label == "rock") {
                 labelline=labelline+"<th style=\"width:24vw;background-color:whitesmoke\">"+nkey+"<br><button class=\"btn gfm-top-small-btn\" title=\"list all Lithology types\" data-toggle=\"modal\" data-target=\"#modalRockType\"><span class=\"glyphicon glyphicon-info-sign\"></span></button></th>";
                 continue;
              }
              if(label == "heatRegion") {
                 labelline=labelline+"<th style=\"width:24vw;background-color:whitesmoke\">"+nkey+"<br><button class=\"btn gfm-top-small-btn\" title=\"list all CTM heat flow regions\" data-toggle=\"modal\" data-target=\"#modalHeatRegions\"><span class=\"glyphicon glyphicon-info-sign\"></span></button></th>";
                 continue;
              }
              labelline=labelline+"<th style=\"width:24vw;background-color:whitesmoke\">"+nkey+"</th>";
            }
        }
        table.deleteRow(0); // delete the holdover
        hold_mptable=0;

        row=table.insertRow(-1);
        html="<thead><tr>"+labelline+"</tr></thead>";
        html=html+"<tbody id=\"materialPropertyTableBody\"></tbody>";
        row.innerHTML=html;
    }

    // now adding the data part.. just 1 line
    html="<td style=\"width:4px\"><button class=\"btn btn-sm gfm-small-btn\" title=\"toggle the layer\" onclick=toggle_a_layergroup(\""+uid+"\");><span value=0 id=\"gfm_layer_"+uid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td>";

    for(var i=0; i<colcnt; i++) {
        var key2=MPtb_label_order[i];
        var val2=datablob[key2];
        if(!showInTable(key2))
          continue;
        if(key2 == 'Z') { 
          if(zmode == "e")
            val2=val2+" (by<br>elevation)";
          else
            val2=val2+" (by<br>depth)";
        }
        html=html+"<td style=\"width:24vw\">"+val2+"</td>";
    }
    
    row=table.insertRow(1);
    row.innerHTML=html;
    return;
}

// go through the table and pick up the label that has valid entry 
// chunk and extract the old mp date from backend
function downloadMPTable() {
    // create a uniq uid also for this tasks.,
    var uid=$.now();
    window.console.log("here..");

    var mplist=get_all_materialproperty();
    var csvblob=getCSVFromJSON(mplist);
    saveAsCSVBlobFile(csvblob, uid);
}

// generate the a new result file with rock information
function makeMPResult_chunk(uid,current_chunk,str,first)
{
    window.console.log("making makeMPResult_chunk call...");
    var blob;
    if( str == undefined || str == "" ) {
       window.console.log("ERROR: no return result");
       return "";
    }
    if( typeof str === 'string') { 
       blob=JSON.parse(str);
       } else {
         blob=str;
    }

    var dkeys=(Object.keys(blob));
    var dsz=dkeys.length; 

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    // iterate through data part
    // convert string to json object if needed
    for(var j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') {
           datablob=JSON.parse(datablob);
        }
        blob[dkeys[j]]=datablob;
    }

    var csvblob=getCSVFromJSON(blob);
    var uuid=uid.toString()+"_"+current_chunk.toString();
    saveAsCSVBlobFile(csvblob, uuid);
}

// build up csv format
function getCSVFromJSON(jblob) {
    var objs=Object.keys(jblob);
    var len=objs.length;
    var last=len-1;

    var jfirst=jblob[0];
    var keys=Object.keys(jfirst);
    var csvblob = keys.join(",");
    csvblob +='\n';
    for(var i=0; i< len; i++) {
       var jnext=jblob[i];
       var values=Object.values(jnext)
       var vblob=values.join(",");
       csvblob += vblob;
       if(i != last) {
         csvblob +='\n';
       }
   }
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return csvblob;
}

function saveAsCSVBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="GFM_"+timestamp+".csv";
    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    //FileSaver.js
    saveAs(blob, fname);
}

function saveAsURLFile(gid,url) {
  var dname=url.substring(url.lastIndexOf('/')+1);
  var dload = document.createElement('a');
  dload.href = url;
  dload.download = dname;
  dload.type="application/octet-stream";
  dload.style.display='none';
  document.body.appendChild(dload);
  dload.click();
  document.body.removeChild(dload);
  delete dload;
}

function linkDownload(str)
{
    var html="";
    // just one
    if( typeof str === 'string') { 
       html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a></div>";
       return html;
    }
    return html;
}

function insertResultTable(note,uid,str) {
    gfm_resulttb_list.push( { uid:uid, blob:str });
    var html=makeDownloadLinks(str);
    makeResultTable(note,uid,html);
}

// create a links to png, metadata, data file if exist
function makeDownloadLinks(str) {
    var html="";

    // just one
    if( typeof str === 'string') { 
       // if the file ends with png 
       if(str.endsWith(".png")) {
          html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-picture\"></span></a></div>";
         } else {
            html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a></div>";
       }
       return html;
    }

    // a set of them,  obj['key1'] and obj['key2']
    var keys=Object.keys(str);
    var sz=(Object.keys(str).length);

    html="<div class=\"links\" style=\"display:inline-block\">";
    for(var i=0;i<sz;i++) {
       var val=str[keys[i]]; 
       switch(keys[i]) {
          case 'plot':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-picture\"></span></a>&nbsp;&nbsp;PNG plot</div>";
              break;
          case 'meta':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;plot metadata file</div>";
              break;
          case 'data':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;plot data file</div>";
              break;
          case 'dataset':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;plot dataset file</div>";
              break;
          case 'materialproperty':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;material property file</div>";
              break;
          case 'query':
              window.console.log("QUERY:",val);
              break; 
          case 'uid':
              window.console.log("QUERY:",val);
              break;
          default:
              window.console.log("HUM...This key is skipped:",keys[i]);
              break;
       }
    }
    html=html+"</div>";

    return html;
    
}

//
function insertResultTable(note,uid,str) {
    gfm_resulttb_list.push( { uid:uid, blob:str });
    var html=makeDownloadLinks(str);
    makeResultTable(note,uid,html);
}

function makeResultTable(note,uid,html) {
    
    var table=document.getElementById("resultTable");
    var hasLayer=find_layer_from_list(uid);
    if (gfm_resulttb_list.length == 1) {
      table.deleteRow(0); // delete the holdover
//label
      var row=table.insertRow(-1);
      row.innerHTML="<th style=\"width:10vw;background-color:whitesmoke\"><b>UID</b></th><th style=\"width:2vw;background-color:whitesmoke\"></th><th style=\"width:24vw;background-color:whitesmoke\"><b>Links</b></th><th style=\"width:24vw;background-color:whitesmoke\"><b>Description</b></th>";
//
    }

// insert at the end, row=table.insertRow(-1);
    row=table.insertRow(1);
    if(hasLayer!=0) {
        row.innerHTML="<td style=\"width:10vw\">"+uid+"<td style=\"width:4px\"><button class=\"btn btn-sm ucvm-small-btn\" title=\"toggle the layer\" onclick=toggle_a_layergroup(\""+uid+"\");><span value=0 id=\"ucvm_layer_"+uid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td></td><td style=\"width:24vw\">"+html+"</td><td style=\"width:24vw\">"+note+"</td>";
      } else {
        row.innerHTML="<td style=\"width:10vw\">"+uid+"<td style=\"width:4px\"></td></td><td style=\"width:24vw\">"+html+"</td><td style=\"width:24vw\">"+note+"</td>";
    }

}

