/***
   gfm_ui.js
***/

function setup_viewer() {
    document.getElementById('parametersTable').innerHTML=makeParametersTable();
    document.getElementById('regionsTable').innerHTML=makeRegionsTable();
}

function plotRegionClick() {
    document.getElementById('spinIconForRegion').style.display = "block";
//    getCannedMaterialProperty();
    plotCannedMaterialProperty();
}

function propertyClick() {
    document.getElementById('spinIconForProperty').style.display = "block";	
    getMaterialPropertyByLatlon();
}

function clearSearchResult()
{
    document.getElementById("searchResult").innerHTML = "";
}

// takes 2 sets of result
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
           var u=getUnitsWithLabelAndVal(key, parseInt(val1));
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

window.console.log(JSON.stringify(blob));

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

    // create the key and unit parts first
    var labelline="";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    labelline="<tr>";
 
    for(i=0; i<sz; i++) {
        key=datakeys[i];
        var u=getUnitsWithLabel(key);
        if(u == undefined)
           u="";
        labelline=labelline+"<td style=\"width:24vw\">"+key+"</td>";
    }
    labelline=labelline+"</tr>";

    html=html+labelline;

    // now adding the data part..
    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        var mpline="<tr>";
        mpline="<tr>";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            if( key2=='regionID') {
               var u=getUnitsWithLabelAndVal(key2, parseInt(val2));
               val2=val2+'<br>('+u+')';
            }
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         mpline=mpline+"</tr>";
         html=html+mpline;
    }

    html=html+"</tbody></table></div>";
    return html;
}


function saveAsBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="GFM_"+timestamp+".json";
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

