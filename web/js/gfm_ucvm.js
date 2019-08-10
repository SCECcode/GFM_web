function makeMetaFname(url) {
//  var s=url.split('/').pop();
//  return s+"_meta.json";
}
//
// allow multiple bin files from ucvmc's plotting utilities
// example
//       BC_cvms5_gate_vs.svg or BC_cvms5_gate_vs.png	
//       BC_cvms5_gate_vs_meta.json
//       BC_cvms5_gate_vs_data.bin
//
function loadAndProcessBinfromFile(urls) {
  var nlist=[];
  var cnt=urls.length;

  for( var urlidx=0; urlidx < cnt; urlidx++ ) {
      var url=urls[urlidx]; 
//      var metaurl=makeMetaFname(url);
      var metaurl="BC_cvms5_gate_vs_meta.json";
      var metablob=ckExist(metaurl);

      var meta=JSON.parse(metablob);
      var lat1=parseFloat(meta['bottom-left lat']);
      var lon1=parseFloat(meta['bottom-left lon']);
      var lat2=parseFloat(meta['upper-right lat']);
      var lon2=parseFloat(meta['upper-right lon']);
      var step=parseFloat(meta['spacing']);
      var cvm=meta['cvm_selected'];
      var title = " TEST"+cvm+" ("+lat1.toFixed(2)+","+lon1.toFixed(2)+" to "+lat2.toFixed(2)+","+lon2.toFixed(2)+")"
      var xmax=parseInt(meta['nx'])
      var ymax=parseInt(meta['ny'])
      var datamax=xmax * ymax 

      var x_data = meta['lon_list']
      var y_data = meta['lat_list']


      var mRequest2 = new XMLHttpRequest();
      mRequest2.open('GET', url);

      mRequest2.responseType = 'arraybuffer';

      mRequest2.onreadystatechange = function () {
      if (mRequest2.readyState === 4) {

        // Get bytes
        var buffer = mRequest2.response;
        var dataview = new DataView(buffer);

        // Create buffer (4 bytes / float)
        var mFloatArray = new Float32Array(buffer.byteLength / 4);

        // Copy floats
        for (var i = 0; i < mFloatArray.length; i++) 
        {
            mFloatArray[i] = dataview.getFloat32(i * 4, true); // At every 4th byte
        }

        console.log("Loaded "+mFloatArray.length+" floats");

        var z_data=[]
        var row=[]
        for(var idx=0;idx<datamax;idx++)
        {
          var f=mFloatArray[idx]
          if(f < 0) {
//window.console.log("less than 0");
             row.push(NaN)
          } else  {
             row.push(-1 * f)
          }
          if((idx+1) % xmax == 0) { // every set
             z_data.push(row)
             row=[]
          }
        }

// 100x100
       var data = [{
           x:x_data,
           y:y_data,
           z:z_data,
           type:'surface',
           "reversescale": true,
           colorscale : 'Viridis'
        }];
  
        var layout = {
          title: title,
          width: plotWidth,
          height: plotHeight,
          scene: {
            aspectratio : { x:1.0, y:1.0, z:0.02 },
          },
          margin: {
            l: 5,
            r: 5,
            b: 20,
            t: 80,
          }
        };

        Plotly.newPlot('myDiv', data, layout);
      }
    }

    mRequest2.send();
  }
}
