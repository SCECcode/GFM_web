/*** 

   layer_util.js

util needed by layer.js
***/

// remove an item from a list base on its matching 'uid'
function removeFromList(alist, uid) {
    var cnt=alist.length;
    var item;
    for(i=0;i<cnt;i++) {
       item=alist[i];
       if(item['uid']==uid) { // found the item to remove
           var index = alist.indexOf(item);
           if (index > -1) {
             alist.splice(index, 1);
             return item;
           }
           return undefined;
       }
    }
    return undefined;
}

// found an item from in a list base on its matching 'uid'
function getFromList(alist, uid) {
    var cnt=alist.length;
    var item;
    for(i=0;i<cnt;i++) {
       item=alist[i];
       if(item['uid']==uid) { // found the item to use
           return item;
       }
    }
    return undefined;
}

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
function round2Four(val) {
  var ep;
  if (Number.EPSILON === undefined) {
    ep= Math.pow(2, -52);
    } else {
      ep=Number.EPSILON;
  }

  var ret=Math.round( ( val + Number.EPSILON ) * 10000 ) / 10000;
  return ret;
}


//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
function getRnd() {
    var timestamp = $.now();
    var rnd="UCVM_"+timestamp;
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

function set_point_latlons(uid,lat,lon) {
   // need to capture the lat lon and draw a point
   if(drawing_point) {
       $( "#LatTxt" ).val(round2Four(lat));
       $( "#LonTxt" ).val(round2Four(lon));
       $( "#UIDTxt" ).val(uid);
       $( "#ZTxt" ).val('-9700');
   }
}
function reset_point_latlons() {
   $( "#LatTxt" ).val('34.30');
   $( "#LonTxt" ).val('-119.20');
   $( "#ZTxt" ).val('-9700');
   $( "#UIDTxt" ).val('');
}

function set_point_UID(uid) {
   $( "#UIDTxt" ).val(uid);
}

function reset_point_UID() {
   $( "#pointUIDTxt" ).val('');
}

