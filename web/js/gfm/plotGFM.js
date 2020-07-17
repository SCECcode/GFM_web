/****

  gfm_plotGFM.js

****/

/**** file content for 'complete_cvmh_canned.csv'
Lon,Lat,Z,regionID,mediumTemperature
-122.6812,29.7099,-100000.000000,1.000000,1316.400024
-122.5783,29.7143,-100000.000000,1.000000,1316.400024
...
****/
// https://stackoverflow.com/questions/17303785/how-to-correctly-read-binary-floating-point-data-using-xmlhttprequest
function plotCannedMaterialProperty() {

  var url="http://localhost/~mei/gfm/data/gfm/complete_cvmh_canned.csv";
  if(window.location.hostname == "asperity.scec.org") {
      url="http://asperity.scec.org/GFM_web/web/data/gfm/complete_cvmh_canned.csv";
  }
  if(window.location.hostname == "moho.scec.org") {
      url="http://moho.scec.org/GFM_web/web/data/gfm/complete_cvmh_canned.csv";
  }

  var urls = [];
  urls.push(url);

  var nlist=loadAndProcessCSVfromFile(urls);

  var x_list=[];
  var y_list=[];
  var z_list=[];

  var x_data=getDataByIndex(0,0);
  var y_data=getDataByIndex(0,1);
  var z_data=getDataByIndex(0,2);
  var id_data=getDataByIndex(0,3);

  // expand it
//  $('#modal3DPoint').modal('show');
//  $('#modal3DPointDialog').addClass('full_modal-dialog');
//  $('#modal3DPointContent').addClass('full_modal-content');
//  document.getElementById("3DPointPlot").height = 500;

  make3DScatterPlotForRegionID("3DPointPlot",x_data,y_data,z_data,id_data);
  document.getElementById('spinIconForRegion').style.display = "none";
}

/**** format for generic material property file from vx-lite calls
 { "GFM_1568317527652": [
{"X":-119.2000,"Y":34.3000,"Z":-9700.00,"utmX":297528.87,"utmY":3797415.95,"elevX":297625.00,"elevY":3797375.00,"topo":210.85,"mtop":150.00,"base":-9730.45,"moho":-24600.39,"src":"lr","cellX":298000.00,"cellY":3797000.00,"cellZ":-9600.00,"tg":2.00,"vp":6128.53,"vs":3477.30,"rho":2744.82,"regionID":23,"temp":258.50},
{"X":-119.0000,"Y":34.0000,"Z":-9500.00,"utmX":315286.01,"utmY":3763764.73,"elevX":315375.00,"elevY":3763875.00,"topo":-130.03,"mtop":-150.00,"base":-1379.79,"moho":-25072.33,"src":"lr","cellX":315000.00,"cellY":3764000.00,"cellZ":-9700.00,"tg":2.00,"vp":6052.12,"vs":3331.79,"rho":2727.93,"regionID":25,"temp":258.50},
...
] }
****/
function plot3DMaterialProperty(uid, json) 
{
   var fname="GFM_"+uid;
   var jsonarr = $.parseJSON(json);
   var arrlist=jsonarr[fname];
   var cnt=arrlist.length;
   var i;
   var x_data=[];
   var y_data=[];
   var z_data=[];
   var target_data=[];
   for(i=0; i<cnt; i++) {
      var item=arrlist[i];
      x_data.push(item['X']);
      y_data.push(item['Y']);
      z_data.push(item['Z']);
      target_data.push(item['regionID']);
   }
   make3DScatterPlotForRegionID("GFM_view",x_data,y_data,z_data,target_data);

}







