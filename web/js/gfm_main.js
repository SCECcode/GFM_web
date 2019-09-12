/***
   gfm_main.c

***/

var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

  $('#QuerymodeTxt').on('change', function() {
    var v=document.getElementById('QuerymodeTxt').value;
    if( v == "file") {
      document.getElementById('pointBlock').style.display = "none";
      document.getElementById('fileBlock').style.display = "";
      } else {
        document.getElementById('pointBlock').style.display = "";
        document.getElementById('fileBlock').style.display = "none";
    }
  });

}) // end of MAIN



