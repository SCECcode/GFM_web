<?php
require_once(dirname(__FILE__)."/navigation.php");
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
<link rel="stylesheet" href="css/gfm/ui.css">
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
<script type="text/javascript" src="js/gfm/util.js"></script>
<script type="text/javascript" src="js/gfm/main.js"></script>
<script type="text/javascript" src="js/gfm/query.js"></script>
<script type="text/javascript" src="js/gfm/viz.js"></script>
<script type="text/javascript" src="js/gfm/plotGFM.js"></script>
<script type="text/javascript" src="js/gfm/plotly.js"></script>
<script type="text/javascript" src="js/gfm/surface_plotly.js"></script>
<script type="text/javascript" src="js/gfm/region.js"></script>
<script type="text/javascript" src="js/gfm/ui.js"></script>
</head>
<body>
<?php echo $header; ?>

<div class="container main container-fluid">

    <div class="spinDialog" style="position:absolute;top:40%;left:50%; z-index:9999;">
        <div id="spinIconForRegion" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        <div id="spinIconForQuery" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        <div id="spinIconForListProperty" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
    </div>

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
       <button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalParameters"><span class="glyphicon glyphicon-info-sign"></span></button>
      </div>
    </div>

    <div class="row col-md-4 col-xs-4" style="display:inline-block;">
      <div class="row">
       <button id="regionBtn" class="btn gfm-top-btn" style="width:20vw" title="plot region data" onclick="plotRegionClick();">
       <span class="glyphicon glyphicon-star"></span> Plot GFM Regions</button>
       <button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalRegions"><span class="glyphicon glyphicon-info-sign"></span></button>
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
       </div>
    </div>
  </div><!--- pointBlock --->

  <div class="row col-md-6 col-xs-6" id="fileBlock" style="margin-top:1vw; display:none"><!---XXX--->
    <div class="row">
      <input id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='display:none;'></input>
      <button id="selectbtn" class="btn gfm-top-btn" style="width:23vw" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
           <span class="glyphicon glyphicon-file"></span> Select file to open for query</button>
       <button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalFile"><span class="glyphicon glyphicon-info-sign"></span></button>

      <div class="row" id="fileQuery" style="margin:0 0 0 0;display:">
<!--
        <div class="row" style="margin:0 0 0 0;display:inline-block">
          <div class="row" id="resultForMPQuery" style="margin:0 0 0 0;display:inline-block"></div>
        </div>
-->

      </div>
    </div>
  </div><!--- fileBlock --->

  </div>

</div><!--- queryBlock --->

 <div class="row" style="margin:10px 0px 10px 0px;width:100%;height:50%;" >
  <div class="row" id='GFM_view' style="margin:0px 0px 10px 0px;background-color:#DDDDDD;width:100%;height:100%;top:30vh;"></div>
 </div>

 <div class="row" id='resultBlock' style="margin:10px 0px 10px 0px;">
   <div class="row col-10"
     <div class="row" style="margin:0 0 0 0;display:inline-block">
          <div class="row" id="resultForMPQuery" style="margin:0 0 0 0;display:inline-block"></div>
     </div>
     <div id="searchResult" class="table-responsive"></div>
  </div>
  <div id="phpResponseTxt"></div>
</div> <!--- result block --->

<!--- going into modal body
 <div class="row" id='tableBlock' style="margin:0px 0px 10px 0px; display:inline-block;">
  <div class="pull-left" id="parametersTable" style="display:inline-block"></div>
  <div class="pull-right" id="regionsTable" style="margin-left:3vw;display:inline-block;"></div>
</div> 
--->

<!--Modal: Parameters Table -->
<div class="modal" id="modalParameters" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalParametersDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalParametersContent">
      <!--Body-->
      <div class="modal-body" id="modalParametersBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="parametersTable" style="display:inline-block"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->

<!--Modal: Regions Table -->
<div class="modal" id="modalRegions" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalRegionsDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalRegionsContent">
      <!--Body-->
      <div class="modal-body" id="modalRegionsBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="regionsTable" style="display:inline-block;"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->

<!--Modal: ModelType -->
<div class="modal" id="modalFile" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalfileDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalfileContent">
      <!--Body-->
      <div class="modal-body" id="modalfileBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">

          <div class="col-12" id="file-container">
<p>
Format of input file :
<pre>
      lon1 lat1 z1
      lon2 lat2 z1

or
      lon1,lat1,z1
      lon2.lat2,z1

</pre>

</p>
          </div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->

</div><!-- container-fluid -->

</body>
</html>

