/***
   gfm_ui.js
***/

function setup_viewer() {
}

function plotClick() {
//    getCannedMatrialProperty();
    plotCannedMaterialProperty();
}

function propertyClick() {
    getMaterialPropertyByLatlon();
}

function propertyUCVMCClick() {
    getUCVMCMaterialPropertyByLatlon();
}

function clearResultTable()
{
    document.getElementById("searchResult").innerHTML = "";
}

function makeResultTable(str)
{
    var i;
    var keys=Object.keys(str);
    var sz=(Object.keys(str).length);

    var html="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";

    html=html+"<div class=\"gfm-table\"><table><tbody>";

    for( i=0; i<sz; i++) {
       var key=keys[i];
       var val=str[key];
       var t="<tr><td style=\"width:10px\">"+key+"</td><td style=\"width:30px\">"+val+"</td></tr>";
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

