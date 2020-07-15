/***
   gfm_main.c

***/

var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();
  setup_tables();
  setup_CFM();
  setup_CRM();

  $(".popup").hide();

  $(".openpop").click(function(e) {
    e.preventDefault();
    $("iframe").attr("src",$(this).attr('href'));
    $(".links").fadeOut('slow');
    $(".popup").fadeIn('slow');
  });

  $(".close").click(function() {
    $(this).parent().fadeOut("slow");
    $(".links").fadeIn("slow");
  });

/****
  $('#plotbtn').on('click', function() {
     var ulabel=get_ULABEL();
     window.console.log("plotbtn got clicked.. set src on iframe again"+ulabel);
     $('#plotIfram').attr('src',"viz.html?ulabel="+ulabel);
  });
***/

}) // end of MAIN



