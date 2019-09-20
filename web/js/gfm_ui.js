/***
   gfm_ui.js
***/

var setup_tables_done=0;

function setup_viewer() {
// 
    setup_tables_done=0;
    document.getElementById('parametersTable').innerHTML='';
    document.getElementById('regionsTable').innerHTML='';
}


function setup_tables() {
    if(setup_tables_done) { // just done it once.
       return;
    }
    document.getElementById('parametersTable').innerHTML=makeParametersTable();
    document.getElementById('regionsTable').innerHTML=makeRegionsTable();
    setup_tables_done=1;
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

function clearSearchResult()
{
    document.getElementById("searchResult").innerHTML = "";
}

// old one,takes 2 sets of result
function makeResultTable(str)
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

    var keys=Object.keys(blob);
    var sz=(Object.keys(blob).length);

window.console.log(JSON.stringify(blob));
    var justOne=0;
    if(sz != 2) {
       window.console.log("ERROR: expecting 2 set of material properties");
       return;
    }
    var blob1=blob[keys[0]];
    var blob2=blob[keys[1]];

    if( typeof blob1 === 'string') { 
       blob1=JSON.parse(blob1);
    }

    if(blob2 == "") { 
       justOne=1; 
    }

    if( !justOne && typeof blob2 === 'string') {
       blob2=JSON.parse(blob2);
    }

    var html;
    keys=Object.keys(blob1);
    sz=(Object.keys(blob1).length);

    html="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";

    html=html+"<table class=\"gfm-table\"><tbody>";
  
    for(i=0; i<sz; i++) {
       var key=keys[i];
       var val1=blob1[key];
       if(!justOne) {
         var val2=blob2[key];
         var t="<tr><td style=\"width:10px\">"+key+"</td><td style=\"width:20vw\">"+val1+"</td><td style=\"width:20px\">"+val2+"</td></tr>";
         html=html+t;
         } else {
           // access unit/extra handling
           var u=getDescriptWithLabelAndVal(key, parseInt(val1));
           if(u == undefined)
              u="";
           var t="<tr><td style=\"width:10px\">"+key+"</td><td style=\"width:20px\">"+val1+"</td><td style=\"width:30px\">"+u+"</td></tr>";
           html=html+t;
       }
    }
    html=html+"</tbody></table></div>";
    return html;
}


// takes 1 or more sets of result
// of { 'first':{...}, 'second':{...}, ...}
function makeHorizontalResultTable(str)
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

    html="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";
    html=html+"<div class=\"gfm-table\"><table><tbody>";

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    // create the key first
    var labelline="";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    labelline="<tr>";
 
    for(i=0; i<sz; i++) {
        key=datakeys[i];
        // special case
        if(key == 'Z') { 
          var zmodestr=document.getElementById("ZmodeTxt").value;
          if(zmodestr == "e")
              key=key+" (by<br>elevation)";
          else
              key=key+" (by<br>depth)";
 
        }
        labelline=labelline+"<td style=\"width:24vw\">"+key+"</td>";
    }
    labelline=labelline+"</tr>";

    html=html+labelline;

    // now adding the data part..
    var mpline="";
    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        mpline="<tr>";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         mpline=mpline+"</tr>";
         html=html+mpline;
    }

    html=html+"</tbody></table></div>";
    return html;
}


// takes 1 or more sets of result
// of { 'first':{...}, 'second':{...}, ...}
function makeHorizontalResultTable_start(str)
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

    var htmlstr="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";
    htmlstr=htmlstr+"<div class=\"gfm-table\"><table><tbody>";

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    // create the key first
    var labelline="";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    labelline="<tr>";
 
    for(i=0; i<sz; i++) {
        key=datakeys[i];
        // special case
        if(key == 'Z') { 
          var zmodestr=document.getElementById("ZmodeTxt").value;
          if(zmodestr == "e")
              key=key+" (by<br>elevation)";
          else
              key=key+" (by<br>depth)";
 
        }
        labelline=labelline+"<td style=\"width:24vw\">"+key+"</td>";
    }
    labelline=labelline+"</tr>";

    htmlstr=htmlstr+labelline;

    // now adding the data part..
    var mpline="";
    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        mpline="<tr>";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         mpline=mpline+"</tr>";
         htmlstr=htmlstr+mpline;
    }

    return htmlstr;
}
// make rows of the table
function makeHorizontalResultTable_next(str)
{
    var htmlstr="";

    if (str == undefined )
      return htmlstr;

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
    var mpline="";
    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        mpline="<tr>";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         mpline=mpline+"</tr>";
         htmlstr=htmlstr+mpline;
    }

    return htmlstr;
}

// last bit of the table
function makeHorizontalResultTable_last() {
    var html="</tbody></table></div>";
    return html;
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
