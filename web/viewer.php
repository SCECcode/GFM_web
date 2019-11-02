<?php
require_once("php/navigation.php");
$header=getHeader("Viewer")
?>
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html>
<head>
<title>Geological Framework Model Viewer</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="css/vendor/font-awesome.min.css">

<link rel="stylesheet" href="css/vendor/bootstrap.min.css">
<link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
<link rel="stylesheet" href="css/vendor/jquery-ui.css">
<link rel="stylesheet" href="css/vendor/glyphicons.css">
<link rel="stylesheet" href="css/vendor/animation.css">
<link rel="stylesheet" href="css/vendor/fontello.css">
<link rel="stylesheet" href="css/gfm-ui.css">
<link rel="stylesheet" href="css/scec-ui.css">

<script type="text/javascript" src="js/vendor/plotly.js"></script>
<script type='text/javascript' src='js/vendor/jquery.min.js'></script>
<script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
<script type='text/javascript' src="js/vendor/jquery.csv.js"></script>
<script type='text/javascript' src='js/vendor/FileSaver.js'></script>
<script type='text/javascript' src='js/vendor/jszip.js'></script>


<!-- gfm js -->
<script type="text/javascript" src="js/debug.js"></script>
<script type="text/javascript" src="js/gfm_util.js"></script>
<script type="text/javascript" src="js/gfm_main.js"></script>
<script type="text/javascript" src="js/gfm_query.js"></script>
<script type="text/javascript" src="js/gfm_viz.js"></script>
<script type="text/javascript" src="js/gfm_plotGFM.js"></script>
<script type="text/javascript" src="js/gfm_plotly.js"></script>
<script type="text/javascript" src="js/gfm_surface_plotly.js"></script>
<script type="text/javascript" src="js/gfm_region.js"></script>
<script type="text/javascript" src="js/gfm_ui.js"></script>
</head>
<body>
<?php echo $header; ?>

<div class="container main container-fluid">
  <div class="row">
	<div class="col-12">
<p>The <a href="https://www.scec.org/research/cxm">SCEC Geological Framework Model (GFM)</a> Viewer is a prototype that provides a browser access to GFM version 1.0 dataset. Users can query for properties from CVM-H v15.1 and GFM v1.0 and also generate a 3D visualization of the Geological Framework model.</p>
<p>
<b>Query Material Properties:</b> Users can enter a latlon, elev/depth and the site will return the CVM-h and GFM properties for that point, or upload a file with multiple latlons and elev/depth information, a downloadabled Material Properties file is generated along with a table of a subset(at most 10) of the data result.
<br>
<b>Plot GFM Regions:</b> When users click this button, the GFM view will load a decimated, rotatable, 3D volume image of GFM v1.0. Users can click on geological regions of interest to turn on/turn off their display.
</p>
	</div>
  </div>

  <div class="row" id="controlBlock" style="margin:10px 0px 30px 0px; width:100%;display:flex;">
    <div class="row col-md-4 col-xs-4" style="margin:0px 0px 0px 50px;display:inline-block;">
      <div class="row">
       <button id="propertyBtn" class="btn gfm-top-btn" style="width:20vw;" title="get material property" onclick="propertyClick();">
       <span class="glyphicon glyphicon-star"></span> Query Material Property</button>
       </div>
    </div>

    <div class="row col-md-4 col-xs-4" style="display:inline-block;">
      <div class="row">
       <button id="regionBtn" class="btn gfm-top-btn" style="width:20vw" title="plot region data" onclick="plotRegionClick();">
       <span class="glyphicon glyphicon-star"></span> Plot GFM Regions</button>
       <div id="spinIconForRegion" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>

   </div> <!-- controlBlock -->

<div class="row" id="queryBlock" style="margin:0px 0px 0px 0px; width:100%; display:none;">

   <div class="row col-md-10 col-xs-10" style="margin:0px 0px 0px 10px;display:inline-block;">

   <div class="row" style="display:inline-block"> Zmode:
      <select id="ZmodeTxt" title="Z mode" class="custom-select custom-select-sm" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
	     <option value="e">Elevation</option>
	     <option value="d">Depth</option>
       </select>
   </div>

   <div class="row" style="display:inline-block; margin-left:3vw"> Query mode:
      <select id="QuerymodeTxt" title="how to query" class="custom-select custom-select-sm" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
	     <option value="point"> Point</option>
	     <option value="file"> File</option>
       </select>
   </div>

  <div class="row col-md-12 col-xs-12" id="pointBlock" style="margin-top:1vw;display:"> <!---XXX--->
   <div class="row"> Lat:<input type="text" id="LatTxt" title="lat" value="34.30" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
 &nbsp;&nbsp;Lon:<input type="text" id="LonTxt" title="lon" value="-119.20" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
&nbsp;&nbsp;Z:<input type="text" id="ZTxt" title="Z" value="-9700" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
    </div>
    <div class="row col-md-4 col-xs-4" style="margin:0px 0px 0px 50px;display:inline-block;">
      <div class="row">
       <button id="queryBtn" class="btn gfm-top-btn" title="get material property" onclick="queryClick();">
       <span class="glyphicon glyphicon-star"></span> Query</button>
       <div id="spinIconForQuery" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
       </div>
    </div>
  </div><!--- pointBlock --->

  <div class="row col-md-4 col-xs-4" id="fileBlock" style="margin-top:1vw; display:none"><!---XXX--->
    <div class="row">
      <input id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='display:none;'></input>
      <button id="selectbtn" class="btn gfm-top-btn" style="width:20vw" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
           <span class="glyphicon glyphicon-file"></span> Select file to open for query</button>
     <div id="spinIconForListProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
      <div class="row" id="fileQuery" style="margin:0 0 0 0;display:">
        <div class="row" style="margin:0 0 0 0;display:inline-block">
          <div class="row" id="resultForMPQuery" style="margin:0 0 0 0;display:inline-block"></div>
<!--
          <button id="plotbtn" type="button" title="plot subset of region id"  class="gfm-top-small-btn" data-toggle="modal" data-target="#modalGM" style='border:none;display:none;'> <span class="glyphicon glyphicon-pencil"></span> </button>
-->
        </div>
      </div>
    </div>
  </div><!--- fileBlock --->

  </div>

</div><!--- queryBlock --->

 <div class="row" style="margin:10px 0px 10px 0px;width:90%;height:50%;" >
  <div class="row" id='GFM_view' style="margin:0px 0px 10px 0px;background-color:#DDDDDD;width:100%;height:100%;top:30vh;"></div>
 </div>

 <div class="row" id='resultBlock' style="margin:20px 0px 10px 0px;">
  <div id="searchResult" class="table-responsive"></div>
  <div id="phpResponseTxt"></div>
</div> <!--- result block --->

 <div class="row" id='tableBlock' style="margin:0px 0px 10px 0px; display:inline-block;">
  <div class="pull-left" id="parametersTable" style="display:inline-block"></div>
  <div class="pull-right" id="regionsTable" style="margin-left:3vw;display:inline-block;"></div>
</div> <!--- result block --->

<!--Modal: Name-->
<div class="modal" id="modalGM" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">

    <!--Content-->
    <div class="modal-content">
      <!--Header-->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!--Body-->
      <div class="modal-body">
  <div class="row col-12">
  <iframe id="plotIfram" src="" style="height:500px;width:100%;" frameborder="0" allowfullscreen> </iframe>
  </div>
<!--

<div id="map-container" class="z-depth-1-half map-container" style="height:500px">
  <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" allowfullscreen></iframe>
</div>

-->

      </div>

<!--Footer

      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
      </div>
-->
    </div>
    <!--/.Content-->

  </div>
</div>
<!--Modal: Name-->

</div><!-- container-fluid -->

</body>
</html>

