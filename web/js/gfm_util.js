/***
   gfm_util.js

***/

function processSearchResult(rlist) {
    if (rlist == 'getMaterialPropertyByLatlon') {
        str = $('[data-side="materialPropertyByLatlon"]').data('params');
    }
    if (rlist == 'getCanMaterialProperty') {
        str = $('[data-side="materialPropertyByCan"]').data('params');
        window.console.log("got the canned data..%s\n",str);
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

