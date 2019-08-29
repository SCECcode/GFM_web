/****

  gfm_plotly.js

****/

function plotCannedMaterialProperty() {

// https://stackoverflow.com/questions/17303785/how-to-correctly-read-binary-floating-point-data-using-xmlhttprequest
  document.getElementById('noteBlock').style.display = "none";

  var frameHeight=window.innerHeight;
  var frameWidth=window.innerWidth;

  var plotWidth= Math.round(frameWidth*0.55);
  var plotHeight= Math.round(0.65 * frameHeight);

  var url="http://localhost/~mei/gfm/data/complete_cvmh_canned.csv";
  if(window.location.hostname == "asperity.scec.org") {
      url="http://asperity.scec.org/GFM/web/data/complete_cvmh_canned.csv";
  }

  var urls = [];
  urls.push(url);

  var nlist=loadAndProcessCSVfromFile(urls);

  var c_list=[ 'rgb(0,130,0)', 'rgb(0,0,130)', 'rgb(140,0,0)', 'rgb(0,140,0)',
               'rgb(0,0,140)', 'rgb(150,0,0)', 'rgb(0,150,0)', 'rgb(0,0,150)',
               'rgb(160,0,0)', 'rgb(0,160,0)', 'rgb(0,0,160)', 'rgb(170,0,0)',
               'rgb(0,170,0)', 'rgb(0,0,170)', 'rgb(180,0,0)', 'rgb(0,180,0)',
               'rgb(0,0,180)' ,'rgb(0,0,190)','rgb(0,190,0)','rgb(190,0,0)',
               'rgb(0,0,200)','rgb(0,200,0)', 'rgb(200,0,0)','rgb(0,0,210)', 
               'rgb(0,210,0)', 'rgb(210,0,0)','rgb(0,0,220)', 'rgb(0,220,0)',
               'rgb(220,0,0)','rgb(0,0,230)', 'rgb(0,230,0)', 'rgb(230,0,0)',
               'rgb(0,0,240)', 'rgb(0,240,0)', 'rgb(240,0,0)','rgb(0,0,250)', 
               'rgb(0,250,0)','rgb(250,0,0)' ];
  var x_list=[];
  var y_list=[];
  var z_list=[];
  var legend_list=[];

  var x_data=getDataByIndex(0,0);
  var y_data=getDataByIndex(0,1);
  var z_data=getDataByIndex(0,2);
  var id_data=getDataByIndex(0,3);
  var temp_data=getDataByIndex(0,4);

  var uid_data=array_unique(id_data);
  var utemp_data=array_unique(temp_data)

  var x_list=[];
  var y_list=[];
  var z_list=[];
  var id_list=[];
  var temp_list=[];

  var cnt=id_data.length;
  var ucnt=uid_data.length;
//  for(i=0; i<ucnt;i++)
//     window.console.log("uid value", uid_data[i]);

//  var cnt=temp_data.length;
//  var ucnt=utemp_data.length;
//  window.console.log("ucnt for the utemp length is ...", ucnt);

  for(var i=0;i<ucnt;i++) {
    x_list.push([]);
    y_list.push([]);
    z_list.push([]);
    id_list.push([]);
    temp_list.push([]);
  }
  for(var i=0;i<cnt;i++) {
    for(var j=0; j<ucnt; j++) {
       if(id_data[i] == uid_data[j]) {  // separate data by id
          x_list[j].push(x_data[i]);
          y_list[j].push(y_data[i]);
                // because plotly's zaxis autorange is not implemented
          z_list[j].push(z_data[i]); 
          id_list[j].push(id_data[i]);
          break;
       }
    }
  }

  var llist=[];
  for (var j=0; j<ucnt; j++) {
      //legend_list.push(getRegionNameWithID(uid_data[j]));
      legend_list.push({'id':j,'name':getRegionNameWithID(uid_data[j]),'color':getRegionColorWithID(uid_data[j])});
  }

  legend_list.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
  var data=[];
  var k;
  var idx;
  var rname;
  var item;
  for(k=0; k<ucnt;k++ ) {
     var item=legend_list[k];
     var idx=item['id'];
     var name=item['name'];
     var color=item['color'];
     var v= {
         x:x_list[idx],
         y:y_list[idx],
         z:z_list[idx],
         name:name,
         mode:"markers",
         type: "scatter3d",
         colorscale: 'Viridis',
         marker: { size: 6, 
                   symbol: 'square',
                   color: k }
//                   color: color }
        };
     data.push(v);
  }

var layout = {
  width: plotWidth,
  height: plotHeight,
  title: "GFM Data v1.0 (Regions)",
  showlegend: true,
  legend: { x:1, y:0 },
  scene: {
       xaxis: {
          title: "Lon",
//          range:[-123, -112]
        autorange: 'reversed'
        },
       yaxis: {
          title: "Lat",
//          range:[29, 38]
        autorange: 'reversed'
       },
    aspectratio : { x:1.0, y:1.0, z:0.1 },
    camera: {
      up: { x: 0, y: 0, z: 1 },
      center: { x: 0, y: 0, z: 0 },
      eye: { x:0, y:1.5, z:0.5 }
    }
  },
  margin: {
    l: 10,
    r: 20,
    b: 40,
    t: 60,
  }
};

Plotly.newPlot('GFM_view', data, layout);

document.getElementById('spinIconForRegion').style.display = "none";

}
