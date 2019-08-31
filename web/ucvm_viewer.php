<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>

<title>UCVMC Viewer</title>
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
</head>
<body>
<div class="container-fluid">

  <div class="row col-12">
            <p>The <a href="https://www.scec.org/research/ucvm">SCEC Unified Community Velocity Model (UCVM)</a> Viewer provides a browser access to UCVMC 19.4. It allows users query for material property and it also can generate Elevation or Depth Profile plot, Cross Section plot, Horizontal Slice plot on demand using the plotting tools packaged within the UCVMC release.</p>
  </div>

  <div class="row" align="left" id="controlBlock" style="margin:10px 0px 10px 0px; width:100%;display:flex;">
    <div class="row col-md-3 col-xs-3" style="display:inline-block; border:solid 2px re;d">
      <div class="row">
        <button id="propertyUCVMCBtn" class="btn gfm-top-btn" style="border:solid 4px blue" title="get UCVMC" onclick="propertyUCVMCClick();">
        <span class="glyphicon glyphicon-star"></span> ucvmc</button>
        <div id="spinIconForUCVMCProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>
    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div>
        <button id="verticalProfileUCVMCBtn" class="btn gfm-top-btn" style="width:10vw" title="depth profile/UCVMC" onclick="verticalProfileUCVMCClick();">
        <span class="glyphicon glyphicon-star"></span> profile</button>
        <div id="spinIconForUCVMCVertical" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>
    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div class="row">
        <button id="crossSectionUCVMCBtn" class="btn gfm-top-btn" title="cross section/UCVMC" onclick="crossSectionUCVMCClick();">
        <span class="glyphicon glyphicon-star"></span> cross</button>
        <div id="spinIconForUCVMCCross" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>
    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div class="row">
        <button id="horizontalSliceUCVMCBtn" class="btn gfm-top-btn" "width:10vw" title="horizontal slice/UCVMC" onclick="horizontalSliceUCVMCClick();">
        <span class="glyphicon glyphicon-star"></span> horizontal</button>
        <div id="spinIconForUCVMCHorizontal" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>
   </div> <!-- controlBlock -->

<div class="row" id='queryBlock' style="background-color:transparent;top:40vh; width:100%; border:solid 1 green;">
  <div class="row" > Lat:<input type="text" id="firstLatTxt" title="first lat" value="34.30" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:orange; text-align:center;"><input type="text" id="secondLatTxt" title="second lat" value='35.6' onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:orange; text-align:center;"> Lon:<input type="text" id="firstLonTxt" title="first lon" value="-119.20" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:orange; text-align:center;"><input type="text" id="secondLonTxt" title="second lat" value='-117.5' onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:orange; text-align:center;"> Z:<input type="text" id="firstZTxt" title="first Z" value="-32000" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:orange; text-align:center;">

Zmode:<select id="firstZmodeTxt" title="Z mode" class="custom-select custom-select-sm" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="d">Depth</option>
             <option value="e">Elevation</option>
       </select>
  </div>
</div><!-- queryBlock -->

<div class="row" id='resultBlock' style="position:fixed; top:15vh; left:30px;width:24%;height:100%;">
  <div id="searchResult" class="table-responsive"></div>
  <div id="phpResponseTxt"></div>
</div>

</div>
</div><!-- container-fluid -->

</body>
</html>

