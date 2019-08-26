/***
   gfm_util.js

***/

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

