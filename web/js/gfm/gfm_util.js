/***
   gfm_util.js

***/

var SAVE_ULABEL=0;
var CHUNK_SIZE=20;

var viewerType="GFM";
function reset_search_selection() {
   // set the search button to initial state without
   // refresh the map view
}

function set_ULABEL(uid)
{
  SAVE_ULABEL=uid;
}

function get_ULABEL()
{
  return SAVE_ULABEL;
}

//https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects-by-property
/* sorting json blobs
var homes = [
   {"h_id":"3","city":"Dallas","state":"TX","zip":"75201","price":"162500"},
   {"h_id":"4","city":"Bevery Hills","state":"CA","zip":"90210","price":"319250"}]
-- Sort by price high to low
homes.sort(sort_by('price', true, parseInt));
-- Sort by city, case-insensitive, A-Z
homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
*/
var sort_by=function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

function processSearchResult(rlist) {
    var str;

    if (rlist == 'getValuesFromJsonBlob') {
        str = $('[data-side="getValuesFromJsonBlob"]').data('params');
    }
    if (rlist == 'getMaterialPropertyByFiles') {
        str = $('[data-side="getMaterialPropertyByFiles"]').data('params');
    }
    if (rlist == 'getMaterialPropertyByLatlonChunk') {
        str = $('[data-side="materialPropertyByLatlonChunk"]').data('params');
 // insert rock information
    }
    if (rlist == 'getMaterialPropertyByLatlonList') {
        str = $('[data-side="materialPropertyByLatlonList"]').data('params');
 // insert rock information
    }
    if (rlist == 'getMaterialPropertyByLatlon') {
        str = $('[data-side="materialPropertyByLatlon"]').data('params');
    }
    if (rlist == 'getCanMaterialProperty') {
        str = $('[data-side="materialPropertyByCan"]').data('params');
    }
    if (rlist == undefined) {
       window.console.log("processSearchResult: BAD BAD BAD");
       return (undefined);
    }
    return (str);
}


// should be a very small file and used for testing and so can ignore
// >>Synchronous XMLHttpRequest on the main thread is deprecated
// >>because of its detrimental effects to the end user's experience.
//     url=http://localhost/data/synapse/segments-dummy.csv
function ckExist(url) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
 // okay
    }
  }
  http.open("GET", url, false);
  http.send();
  if(http.status !== 404) {
    return http.responseText;
    } else {
      return null;
  }
}

//
// Reading files using the HTML5 FileReader.
//
function readAndProcessLocalFile(fobj) {

  var reader = new FileReader();

  reader.onload=function(event) {
    var csv = event.target.result; 
    var ffline = reader.result.split('\n');
    var cnt=ffline.length;
    var fdata=[];
    if(cnt == 0) { 
      window.console.log("ERROR, can not process the upload file ");
      return;
    }
    var is_csv=0;
    if(ffline[0].includes(",")) 
      is_csv=1;
    for(i=0;i<cnt;i++) {
       var fline=ffline[i];
        
       if(is_csv) {
         $.csv.toArray(fline, {}, function(err, data) {
           var v=data;
           if( v != "" && v[0] != "#" && v[0][0] != '#' ) {
             fdata.push(v);
           }
         }); 
       } else {
// space separated format 
           var v=fline.split(' ');
           if ( v != "" && v[0] != "#" && v[0][0] != '#' ) {
             fdata.push(v);
           }
       }
    }

    var cnt=fdata.length;
    var chunk_size=CHUNK_SIZE;
    var chunks=Math.ceil(cnt/chunk_size);
    if(chunks == 1)
       chunk_size=cnt;

    // use timestamp as unique label
    var uid=$.now();
     
    getMaterialPropertyByLatlonList(uid,fdata,0, chunks, chunk_size);
  };
  reader.readAsText(fobj);

  
};

/*** util needed by layer.js ***/
function getRnd() {
//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
    var timestamp = $.now();
    var rnd="GFM_"+timestamp;
    return rnd;
}

// [[lon1,lat1,z1],...,[lonn,latn,zn]]
// make sure it is unique
function makeLatlngs(darray) {
   var cnt=darray.length;
   var latlngs=[];
   var i;
   for(i=0;i<cnt;i++) {
      var item=darray[i];
      var lon=item[0];
      var lat=item[1];
      var z=item[2];
      var nitem= {"lat":lat,"lon":lon}
      if(latlngs.indexOf(nitem) == -1) {
        latlngs.push(nitem);
      }
   }
   return latlngs;
}

