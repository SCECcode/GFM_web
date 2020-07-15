/***
   gfm_ui.js
***/
// global flag to show if material property is at the very start of
// insert
var hold_mptable=1;

function setup_viewer() {
    setup_tables();
}

function setup_tables() {
    document.getElementById('parametersTable').innerHTML=makeParametersTable();
    document.getElementById('regionsTable').innerHTML=makeRegionsTable();
    document.getElementById('ZModeTable').innerHTML=makeZModeTable();
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
  refreshTxtInput();
  refreshHorizontalResultTable();
  document.getElementById("phpResponseTxt").innerHTML = "";
}

function refreshTxtInput() {
  $('#LatTxt').val(34.30);
  $('#LonTxt').val(-119.20);
  $('#ZTxt').val(-9700);
  $('#ZmodeTxt').val('e');
}

function refreshHorizontalResultTable() {
    var table=document.getElementById("materialPropertyTable");
    table.innerHTML="<tbody><tr id=\"placeholder-row\"><td colspan=\"12\">Material Property for selected locations will appear here. </td></tr></tbody>";
    hold_mptable=1;
}

// takes 1 or more sets of result
// of { 'first':{...}, 'second':{...}, ...}
function makeHorizontalResultTable(uid,str)
{
    var i;
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

    var dkeys=Object.keys(blob); // dkeys: first, second
    var dsz=(Object.keys(blob).length); // 2

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    // create the key first
    var labelline="<th style=\"width:4vw\"></th>";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    var table=document.getElementById("materialPropertyTable");

    if(hold_mptable) {
        for(i=0; i<sz; i++) {
            key=datakeys[i];
            if(!showInTable(key))
              continue;
            labelline=labelline+"<td style=\"width:24vw\">"+key+"</td>";
        }

        table.deleteRow(0); // delete the holdover
        hold_mptable=0;

        row=table.insertRow(-1);
        row.innerHTML=labelline;
    }

    // now adding the data part..
    var mpline="<td style=\"width:4px\"><button class=\"btn btn-sm gfm-small-btn\" title=\"toggle the layer\" onclick=toggle_a_layergroup(\""+uid+"\");><span value=0 id=\"gfm_layer_"+uid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td>";

    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }

        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            if(!showInTable(key2))
              continue;
            if(key2 == 'Z') { 
              var zmodestr=document.getElementById("ZmodeTxt").value;
              if(zmodestr == "e")
                val2=val2+" (by<br>elevation)";
              else
                val2=val2+" (by<br>depth)";
            }
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         row=table.insertRow(1);
         row.innerHTML=mpline;
    }
    return "";
}


// takes 1 or more sets of result
// of { 'first':{...}, 'second':{...}, ...}
function makeHorizontalResultTable_chunk(uid,str)
{
    var i;
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

    var dkeys=Object.keys(blob); // dkeys: first, second
    var dsz=(Object.keys(blob).length); // 2

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    // create the key first
    var labelline="<th style=\"width:4vw\"></th>";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    var table=document.getElementById("materialPropertyTable");
    
    if(hold_mptable) {
        for(i=0; i<sz; i++) {
            key=datakeys[i];
            // special case
            if(!showInTable(key))
              continue;
            labelline=labelline+"<td style=\"width:24vw\">"+key+"</td>";
        }

        table.deleteRow(0); // delete the holdover
        hold_mptable=0;
        row=table.insertRow(-1);
        row.innerHTML=labelline;
    }

    // now adding the data part..

    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        var mpline="<td style=\"width:4px\"><button class=\"btn btn-sm gfm-small-btn\" title=\"toggle the layer\" onclick=toggle_a_layergroup(\""+uid+"\");><span value=0 id=\"gfm_layer_"+uid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td>";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            if(!showInTable(key2))
                continue;
            if(key2 == 'Z') {
              var zmodestr=document.getElementById("ZmodeTxt").value;
              if(zmodestr == "e")
                val2=val2+" (by<br>elevation)";
              else
                val2=val2+" (by<br>depth)";
            }
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         row=table.insertRow(1);
         row.innerHTML=mpline;
    }

    return ""; 
}
// make rows of the table
function makeHorizontalResultTable_next(uid,str)
{
    var table=document.getElementById("materialPropertyTable");

    if (str == undefined )
      return;

    if( typeof str === 'string') { 
       blob=JSON.parse(str);
       } else {
         blob=str;
    }

    var dkeys=Object.keys(blob); // dkeys: first, second
    var dsz=(Object.keys(blob).length); // 2

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') {
       datablob=JSON.parse(datablob);
    }

    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    // now adding the data part..
    var mpline="<td style=\"width:4px\"><button class=\"btn btn-sm gfm-small-btn\" title=\"toggle the layer\" onclick=toggle_a_layergroup(\""+uid+"\");><span value=0 id=\"gfm_layer_"+uid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td>";

    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            if(!showInTable(key2))
                continue;
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         row=table.insertRow(1);
         row.innerHTML=mpline;
    }
}

// last bit of the table
function makeHorizontalResultTable_last(uid) {
    var table=document.getElementById("materialPropertyTable");
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
