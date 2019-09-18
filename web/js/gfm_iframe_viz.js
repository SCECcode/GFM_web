/*****MAIN*****/
jQuery(document).ready(function() {

  // cause data to be plotted into GFM_plot
  var ulabel=getParamValue('ulabel');

  getValuesFromJsonBlob("GFM_plot",ulabel,"X","Y","Z","regionID");

})

function getParamValue(pname)
{
  var url = window.location.search.substring(1); //get rid of "?" in querystring
  var qArray = url.split('&'); //get key-value pairs
  for (var i = 0; i < qArray.length; i++) 
  {
    var pArr = qArray[i].split('='); //split key and value
    if (pArr[0] == pname) 
        return pArr[1]; //return value
  }
}

