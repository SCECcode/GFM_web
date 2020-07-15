<?php
ini_set('include_path','site/gfm');
require_once("navigation.php");
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
<link rel="stylesheet" href="css/vendor/leaflet.awesome-markers.css">
<link rel="stylesheet" href="css/vendor/leaflet.css">

<link rel="stylesheet" href="css/vendor/jquery-ui.css">
<link rel="stylesheet" href="css/vendor/glyphicons.css">
<link rel="stylesheet" href="css/vendor/animation.css">
<link rel="stylesheet" href="css/gfm/ui.css">
<link rel="stylesheet" href="css/scec-ui.css">
<link rel="stylesheet" href="css/sidebar.css">


<script type="text/javascript" src="js/vendor/plotly.js"></script>

<script type="text/javascript" src="js/vendor/leaflet.js"></script>
<script type='text/javascript' src='js/vendor/leaflet.awesome-markers.js'></script>
<script type='text/javascript' src='js/vendor/jquery.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery.csv.js'></script>
<script type='text/javascript' src='js/vendor/popper.min.js'></script>
<script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
<script type='text/javascript' src='js/vendor/ersi-leaflet.js'></script>
<script type='text/javascript' src='js/vendor/FileSaver.js'></script>
<script type='text/javascript' src='js/vendor/jszip.js'></script>
<script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery.tabletojson.min.js'></script>
    <!--
    https://leaflet.github.io/Leaflet.draw/docs/Leaflet.draw-latest.html#l-draw
    this is for including the Leaflet.draw plugin
    -->
<link rel="stylesheet" href="plugin/Leaflet.draw/leaflet.draw.css">
<script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.draw.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.Draw.Event.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/Toolbar.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/Tooltip.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/ext/GeometryUtil.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/ext/LatLngUtil.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/ext/LineUtil.Intersect.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/ext/Polygon.Intersect.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/ext/Polyline.Intersect.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/ext/TouchEvents.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/DrawToolbar.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Feature.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.SimpleShape.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polyline.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Marker.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Circle.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.CircleMarker.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polygon.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Rectangle.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/EditToolbar.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Edit.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Delete.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/Control.Draw.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Poly.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.SimpleShape.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Rectangle.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Marker.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.CircleMarker.js"></script>
<script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Circle.js"></script>

<!-- gfm js -->
<script type="text/javascript" src="js/debug.js"></script>
<script type="text/javascript" src="js/gfm/util.js"></script>
<script type="text/javascript" src="js/gfm/main.js"></script>
<script type="text/javascript" src="js/gfm/query.js"></script>
<script type="text/javascript" src="js/gfm/viz.js"></script>
<script type="text/javascript" src="js/gfm/plotGFM.js"></script>
<script type="text/javascript" src="js/gfm/plotly.js"></script>
<script type="text/javascript" src="js/gfm/surface_plotly.js"></script>
<script type="text/javascript" src="js/gfm/gfm_region.js"></script>
<script type="text/javascript" src="js/gfm/region_util.js"></script>
<script type="text/javascript" src="js/gfm/ui.js"></script>
<script type="text/javascript" src="js/gfm/leaflet.js"></script>
<script type="text/javascript" src="js/gfm/layer.js"></script>
<script type="text/javascript" src="js/gfm/cxm_misc_util.js"></script>
</head>
<body>
<?php echo $header; ?>

<div id="viewPort" class="container main container-fluid">

    <div class="spinDialog" style="position:absolute;top:40%;left:50%; z-index:9999;">
        <div id="spinIconForRegion" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        <div id="spinIconForQuery" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        <div id="spinIconForListProperty" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
    </div>

    <div class="row">
	<div class="col-12">
<p>The <a href="https://www.scec.org/research/cxm">SCEC Geological Framework Model (GFM)</a> Viewer is a prototype that provides a browser access to GFM version 1.0 dataset. Users can query for properties from CVM-H v15.1 and GFM v1.0 and also generate a 3D visualization of the Geological Framework model.</p>
        </div>
    </div>

<!--- MISC --->
    <div id="miscTools">
        <button class="btn gfm-small-btn" title="display CFM5.2 faults" onclick='toggleShowCFM()'>
           <span id="gfm_cfm_btn" class="glyphicon glyphicon-ok-sign"></span>CFM5.2</button>
        <button class="btn gfm-small-btn" title="display CRM regions" onclick='toggleShowCRM()'>
           <span id="gfm_crm_btn" class="glyphicon glyphicon-ok-sign"></span>CRM</button>

        <button class="btn gfm-small-btn" style="margin-left:70%; padding:0px 0px;" title="display GFM 3D regions" onclick='plotRegionClick()' data-toggle="modal" data-target="#modal3DPoint">
           <span id="regionBtn" class="glyphicon glyphicon-ok-sign"></span>GFM3d</button>
        <button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalRegions"><span class="glyphicon glyphicon-info-sign"></span></button>
    </div>

    <div class="row" style="display:none;">
        <div class="col justify-content-end custom-control-inline">
            <div style="display:none;" id="external_leaflet_control"></div>
        </div>
    </div>

    <div id="content-container" class="row">
        <div id="control-container" class="col-5">
          <div class="col-12">
            <div class="input-group filters mb-1 mt-1">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="zModeType" >Select Z Mode</label>
                </div>
                <select id="ZmodeTxt" class="custom-select">
                    <option value="e">Elevation</option>
                    <option value="d">Depth</option>
                </select>&nbsp;<button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalzm"><span class="glyphicon glyphicon-info-sign"></span></button>
            </div> <!-- z mode select -->
            <div class="col input-group" style="background:whitesmoke;">
                <div class="row mt-1">
                  <div class="col-12">
                    <p>Enter latitude, longitude and Z below or upload a file with LatLngs and matching Z values</p>
                  </div>
                </div>
                <div class="row d-flex">
                  <div class="col-5 pr-0">
                      <input type="text"
                              id="LatTxt"
                              placeholder="Latitude"
                              title="lat"
                              value="34.30"
                              onfocus="this.value=''"
                              class="form-control">
                      <input type="text" 
                              id="LonTxt" 
                              placeholder="Longitude" 
                              title="lon"
                              value="-119.20"
                              onfocus="this.value=''" 
                              class="form-control mt-1">
                  </div>
                  <div class="col-5 pr-0">
                       <input type="text" 
                              id="ZTxt" 
                              placeholder="Z" 
                              title="Z"
                              value="-9700"
                              onfocus="this.value=''" 
                              class=" form-control">
                       <input type="text"
                              id="UIDTxt" 
                              placeholder="UID" 
                              title="Uniqued ID"
                              onfocus="this.value=''" 
                              class="form-control mt-1" style="display:none">
                  </div>
                  <div class="col-2 pl-1">
                        <button id="pointBtn" type="button" title="query with latlon"
                          class="btn btn-default gfm-small-btn " onclick="queryClick()">
                          <span class="glyphicon glyphicon-search"></span>
                        </button>
                  </div>
                </div>
                <div class="row d-flex mt-2">
                  <div class="col-10 pr-1 mb-2">
                    <input class="form-control" id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='display:none;'></input>
                    <button id="selectbtn" class="btn gfm-top-btn" style="width:85%" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
                    <span class="glyphicon glyphicon-file"></span> Select file to use</button>
<button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalFile"><span class="glyphicon glyphicon-info-sign"></span></button>
<!--
                    <div class="row" id="fileQuery" style="margin:0 0 0 0;display:"></div>
-->
                  </div>
                  <div class="col-2 pr-1">
                    <button onclick="resetAll();" class="btn btn-dark pl-4 pr-4" type="button">Reset</button>
                  </div>
                </div>
            </div> <!-- latlon/file input/reset --> 
            <div class="col input-group" style="border:1px solid blue">
                <div class="row mt-1">
                  <div class="row col-md-12 ml-auto" style="overflow:hidden;">
<!-- XXX --->
                      <div class="col-12" id="GFM_Table"></div>
                  </div>
                </div>
            </div> <!-- GFM/CRM all regions -->
          </div>
        </div> <!-- control-container -->

        <div id="map-container" class="col-7">
            <div class="col-8 d-flex offset-4 align-items-end mb-1">
                <div class="input-group input-group-sm" id="map-controls">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="mapLayer">Select Map Type</label>
                    </div>
                    <select id="mapLayer" class="custom-select custom-select-sm" onchange="switchBaseLayer(this.value);">
                        <option selected value="esri topo">ESRI Topographic</option>
                        <option value="esri NG">ESRI National Geographic</option>
                        <option value="esri imagery">ESRI Imagery</option>
                        <option value="otm topo">OTM Topographic</option>
                        <option value="osm street">OSM Street</option>
                    </select>
                </div>
            </div>
            <div class="row mapData">
                <div class="col-12 pr-0 pl-2 pt-1 ">
                    <div class="row w-100 mb-1" id='GFM_plot'
                         style="position:relative;border:solid 1px #ced4da; height:576px;"></div>
                </div>
            </div>
        </div> <!-- map-container -->
        <div id="result-container" class="col-12">
            <div class="row" id="mp-table">
                <div class="col-12" id="materialProperty-header-container">
                    <table id="mpHeaderTable" style="border:none">
                        <tbody>
                        <tr>
                            <td style="border:none"><b>Material Property</b>
                              <button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalParameters"><span class="glyphicon glyphicon-info-sign"></span></button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12" id="materialProperty-viewer-container" style="overflow:scroll;max-height:20vh">
                    <table id="materialPropertyTable">
                        <tbody>
                        <tr id="mp_placeholder-row">
                            <td colspan="12">Material Property for selected locations will appear here. </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div> <!-- mp-table -->
<div class="row mt-2 mb-4">
                <div class="col-12" id="result-header-container">
                    <table id="resultHeaderTable" style="border:none">
                        <tbody>
                        <tr>
                            <td style="border:none"><b>Result</b>&nbsp;<button class="btn gfm-top-small-btn" data-toggle="modal" data-target="#modalff"><span class="glyphicon glyphicon-info-sign"></span></button></td>

                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12" id="resultTable-container" style="overflow:scroll;max-height:30vh">
                    <table id="resultTable">
                        <tbody>
                        <tr id="placeholder-row">
                            <td colspan="12">Downloadable Result will appear here. </td>
                        </tr>
                        </tbody> </table>
                </div>
            </div> <!-- Result table -->

            <div id="phpResponseTxt"></div>

        </div> <!-- result-container -->
    </div> <!-- content-container -->

</div> <!-- container main -->

<!--Modal: ResultFormat -->
<div class="modal" id="modalff" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalffDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalffContent">
      <!--Body-->
      <div class="modal-body" id="modalffBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="fileFormatTable"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->


<!--Modal: ZMode -->
<div class="modal" id="modalzm" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalzmDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalzmContent">
      <!--Body-->
      <div class="modal-body" id="modalzmBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="zmodeTable"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->


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
  <div class="modal-dialog modal-dialog-centered modal-xlg" id="modalfileDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalfileContent">
      <!--Body-->
      <div class="modal-body" id="modalfileBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">

          <div class="col-10" id="file-container">
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

<!--Modal: 3Dpoint Plot -->
<div class="modal" id="modal3DPoint" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xlg" id="modal3DPointDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modal3DPointContent">

      <!--Body-->
      <div class="modal-body" id="modal3DPointBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="3DPointPlot" style="display:inline-block;"></div>
        </div>
      </div>

      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>


    </div> <!--Content-->
   </div>
</div> <!--Modal: Name-->

</body>
</html>

