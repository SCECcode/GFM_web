// id_data is regionID
function make3DScatterPlotForRegionID(plotID,x_data,y_data,z_data,id_data) 
{
 
  var _p="#"+plotID;

  var frameHeight=window.innerHeight;
  var frameWidth=window.innerWidth;
  var viewHeight = jQuery("#viewPort").height();
  var viewWidth = jQuery("#viewPort").width();

  var plotWidth=Math.ceil(viewWidth * 0.9);
  var plotHeight= Math.ceil(plotWidth * 0.7);

  var x_list=[];
  var y_list=[];
  var z_list=[];
  var id_list=[];
  var legend_list=[];

  var uid_data=array_unique(id_data);

  var cnt=id_data.length;
  var ucnt=uid_data.length;

  for(var i=0;i<ucnt;i++) {
    x_list.push([]);
    y_list.push([]);
    z_list.push([]);
    id_list.push([]);
  }
  for(var i=0;i<cnt;i++) {
    for(var j=0; j<ucnt; j++) {
       if(id_data[i] == uid_data[j]) {  // separate data by id
          x_list[j].push(x_data[i]);
          y_list[j].push(y_data[i]);
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
                   color: color }
        };
     data.push(v);
  }

window.console.log("width ", plotWidth);
window.console.log("height ", plotHeight);
var layout = {
  width: plotWidth,
  height: plotHeight,
  paper_bgcolor: "#DDDDDD",
  title: "GFM Data v1.0 (Regions)",
  showlegend: true,
  legend: { x:1, y:0 },
  scene: {
       xaxis: {
          title: "Lon",
         range:[-112, -123]
//        autorange: 'reversed'
        },
       yaxis: {
          title: "Lat",
          range:[38, 29]
//          autorange: 'reversed'
       },
    aspectratio : { x:1.0, y:1.0, z:0.15 },
    camera: {
      up: { x: 0, y: 0, z: 1 },
      center: { x: 0, y: 0, z: 0 },
      eye: { x:0, y:1, z:0.5 }
    }
  },
  margin: {
    l: 10,
    r: 10,
    b: 10,
    t: 60,
  }
};
Plotly.newPlot(plotID, data, layout);
}

// generic 3D regionID
function make3DSurfacePlot(plotID,x_data,y_data,z_data) 
{

  var _p="#"+plotID;
  var plotWidth=jQuery(_p).width();
  var plotHeight=jQuery(_p).height();

  var xcnt=x_data.length;

  var z_list=[];
  z_list.push(z_data);
  var cnt=z_data.length;
  var i;
  var tmp=[];
  for(i=0; i<cnt; i++) {
     tmp.push(z_data[i]+500);
  }
  z_list.push(tmp);
  

  var data= [{
//         x:x_data,
//         y:y_data,
           z:z_list,
         type:'surface',
         colorscale: 'Jet'
         }];

  var layout = {
         width: plotWidth,
         height: plotHeight,
         paper_bgcolor: "#DDDDDD",
         title: "GFM Data v1.0",
         scene: { aspectratio : { x:1, y:1, z:0.5 }, },
         margin: {
             l: 10,
             r: 10,
             b: 10,
             t: 60,
           }
         };

Plotly.newPlot(plotID, data, layout);
}
