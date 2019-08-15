/***
   gfm_ui.js
***/

function setup_viewer() {
}

function horizontalSliceUCVMCClick() {
    plotHorizontalSlice();
}

function crossSectionUCVMCClick() {
    plotCrossSection();
}

function verticalProfileUCVMCClick() {
    plotVerticalProfile();
}

function plotClick() {
//    getCannedMaterialProperty();
    plotCannedMaterialProperty();
}

function propertyClick() {
    getMaterialPropertyByLatlon();
}

function propertyUCVMCClick() {
    getUCVMCMaterialPropertyByLatlon();
}

function plotPNG(str)
{
    document.getElementById("searchResult").innerHTML = "";

    if( typeof str === 'string') { 
       var html="<a href=\"../gfm/result/"+str+"\"><img src=\"smiley.gif\" alt=\"Smiley face\" height=\"42\" width=\"42\"></a>";
       return html;
    }
    return "";
    
}

function clearResultTable()
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
    if(sz != 2) {
       window.console.log("ERROR: expecting 2 set of material properties");
       return;
    }
    var blob1=blob[keys[0]];
    var blob2=blob[keys[1]];

    if( typeof blob1 === 'string') { 
       blob1=JSON.parse(blob1);
    }

    if( typeof blob2 === 'string') { 
       blob2=JSON.parse(blob2);
    }

    keys=Object.keys(blob1);
    sz=(Object.keys(blob1).length);

    var html="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";

    html=html+"<div class=\"gfm-table\"><table><tbody>";

    for( i=0; i<sz; i++) {
       var key=keys[i];
       var val1=blob1[key];
       var val2=blob2[key];
       var t="<tr><td style=\"width:10px\">"+key+"</td><td style=\"width:20px\">"+val1+"</td><td style=\"width:20px\">"+val2+"</td></tr>";
       html=html+t;
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

