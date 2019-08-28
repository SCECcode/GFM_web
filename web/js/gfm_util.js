/***
   gfm_util.js

***/

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
    if (rlist == 'plotHorizontalSlice') {
        str = $('[data-side="horizontalSlice"]').data('params');
    }
    if (rlist == 'plotVerticalProfile') {
        str = $('[data-side="verticalProfile"]').data('params');
    }
    if (rlist == 'plotCrossSection') {
        str = $('[data-side="crossSection"]').data('params');
    }
    if (rlist == 'getMaterialPropertyByLatlon') {
        str = $('[data-side="materialPropertyByLatlon"]').data('params');
    }
    if (rlist == 'getUCVMCMaterialPropertyByLatlon') {
        str = $('[data-side="materialPropertyUCVMCByLatlon"]').data('params');
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

