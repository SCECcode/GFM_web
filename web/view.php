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
<!-- for aws
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
-->

<link rel="stylesheet" href="css/vendor/bootstrap.css">
<link rel="stylesheet" href="css/vendor/jquery-ui.css">
<link rel="stylesheet" href="css/vendor/animation.css">
<link rel="stylesheet" href="css/vendor/fontello.css">
<link rel="stylesheet" href="css/gfm-ui.css">

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
<script type="text/javascript" src="js/gfm_ui.js"></script>
<script type="text/javascript" src="js/gfm_main.js"></script>
<script type="text/javascript" src="js/gfm_query.js"></script>
<script type="text/javascript" src="js/gfm_viz.js"></script>
<script type="text/javascript" src="js/gfm_plotly.js"></script>
<script type="text/javascript" src="js/gfm_region.js"></script>
</head>
<body>
<?php echo $header; ?>

<div class="container-fluid">
  <div align="left" id="controlBlock" style="margin:10px 0px 10px 0px; width:100%;display:flex;">
    <div align="left" class="row col-md-3 col-xs-3" style="display:inline-block;">
      <button id="propertyBtn" class="btn gfm-top-btn" style="width:20vw" title="get material property" onclick="propertyClick();">
       <span class="glyphicon glyphicon-star"></span> Query material property</button>
       <div id="spinIconForProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
    </div>
    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <button id="regionBtn" class="btn gfm-top-btn" style="width:15vw" title="plot region data" onclick="plotRegionClick();">
       <span class="glyphicon glyphicon-star"></span> Show regions</button>
       <div id="spinIconForRegion" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
    </div>
   </div> <!-- controlBlock -->

<div class="row col-md-12 col-xs-12" style="position:absolute;display:inline-block;left:20px;top:22vh;">

  <div id='GFM_view' style="position:fixed; width:60%;height:75%;left:30%;border:solid 4px gray"></div>

  <div id='queryBlock' style="position:fixed; background-color:transparent;top:18vh; width:100%;">
 <div> Lat:<input type="text" id="firstLatTxt" title="first lat" value="34.30" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
 Lon:<input type="text" id="firstLonTxt" title="first lon" value="-119.20" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
Z:<input type="text" id="firstZTxt" title="first Z" value="-32000" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
Zmode:<select id="firstZmodeTxt" title="Z mode" class="custom-select" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="e">elevation</option>
             <option value="d">depth</option>
       </select>
        
</div>

  </div><!-- queryBlock -->

<div id='resultBlock' style="top:20vh; left:30px;width:24%;height:100%; border:none">
  <div id="searchResult" class="table-responsive"></div>
  <div id="phpResponseTxt"></div>
</div>

</div>
</div><!-- container-fluid -->

</body>
</html>

