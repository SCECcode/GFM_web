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
<script type="text/javascript" src="js/gfm_plotly.js"></script>
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
<b>Query Material Properties:</b> Users can enter a latlon, elev/depth and the site will return the CVM-h and GFM properties for that point.
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
       <div id="spinIconForProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
       </div>
    </div>

    <div class="row col-md-4 col-xs-4" style="display:inline-block;">
      <div class="row">
       <button id="regionBtn" class="btn gfm-top-btn" style="width:20vw" title="plot region data" onclick="plotRegionClick();">
       <span class="glyphicon glyphicon-star"></span> Plot GFM Regions</button>
       <div id="spinIconForRegion" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>
    </div>

   </div> <!-- controlBlock -->

<div class="row" id="queryBlock" style="margin:10px 0px 30px 0px; width:100%;display:flex">
   <div class="row col-md-12 col-xs-12" style="display:inline-block;">
   <div> Lat:<input type="text" id="LatTxt" title="lat" value="34.30" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
 Lon:<input type="text" id="LonTxt" title="lon" value="-119.20" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
Z:<input type="text" id="ZTxt" title="Z" value="-32000" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
Zmode:<select id="ZmodeTxt" title="Z mode" class="custom-select custom-select-sm" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="e">Elevation</option>
             <option value="d">Depth</option>
       </select>
       <br>

<!---
color:<select id="colorTxt" title="color" class="custom-select custom-select-sm" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="r">Rough</option>
             <option value="f">Fine</option>
       </select>
    </div>
--->

<!--- file object --->
    <div class="row col-md-4 col-xs-4" style="display:inline-block;">
      <div class="row">
      <input id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='display: none;'></input>
      <button id="selectbtn" class="btn gfm-top-btn" style="width:20vw" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
           <span class="glyphicon glyphicon-file"></span> Select file to open</button>
       <div id="spinIconForFiles" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>

   </div>
</div><!--- queryBlock --->

 <div class="row" style="margin-left:5%;width:90%;height:50%;">
  <div class="row" id='GFM_view' style="background-color:#DDDDDD;width:100%;height:100%;top:30vh;"></div>
 </div>

 <div class="row" id='resultBlock' style="left:30px;margin-top:5vh;">
  <div id="searchResult" class="table-responsive"></div>
  <div id="phpResponseTxt"></div>
</div> <!--- result block --->

</div><!-- container-fluid -->

</body>
</html>

