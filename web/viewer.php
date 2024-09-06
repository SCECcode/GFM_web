<?php
ini_set('include_path','site/gfm');
require_once("navigation.php");
$header=getHeader("Viewer")
?>
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html lang="en">
<head>

<title>Geological Framework Model Viewer (Provisional)</title>

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
<link rel="stylesheet" href="css/gfm/gfm-ui.css">
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
<script type='text/javascript' src='js/vendor/jquery.tabletojson.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>

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
<script type="text/javascript" src="js/gfm/gfm_util.js"></script>
<script type="text/javascript" src="js/gfm/gfm_main.js"></script>
<script type="text/javascript" src="js/gfm/gfm_query.js"></script>
<script type="text/javascript" src="js/gfm/viz.js"></script>
<script type="text/javascript" src="js/gfm/plotGFM.js"></script>
<script type="text/javascript" src="js/gfm/plotly.js"></script>
<script type="text/javascript" src="js/gfm/surface_plotly.js"></script>
<script type="text/javascript" src="js/gfm/crm_region.js"></script>
<script type="text/javascript" src="js/gfm/crm_region_util.js"></script>
<script type="text/javascript" src="js/gfm/gfm_region.js"></script>
<script type="text/javascript" src="js/gfm/gfm_region_util.js"></script>
<script type="text/javascript" src="js/gfm/gfm_ui.js"></script>
<script type="text/javascript" src="js/gfm/gfm_leaflet.js"></script>
<script type="text/javascript" src="js/gfm/gfm_layer.js"></script>
<script type="text/javascript" src="js/gfm/gfm_layer_util.js"></script>
<script type="text/javascript" src="js/gfm/gfm_view3d_util.js"></script>
<script type="text/javascript" src="js/gfm/view3d.js"></script>
<script type="text/javascript" src="js/gfm/cxm_misc_util.js"></script>
<script type="text/javascript" src="js/gfm/gfm_rock.js"></script>
<script type="text/javascript" src="js/gfm/gfm_rock_util.js"></script>
<script type="text/javascript" src="js/gfm/ctm_region.js"></script>
<script type="text/javascript" src="js/gfm/ctm_region_util.js"></script>
    <script type="text/javascript">
        $ = jQuery;
        var tableLoadCompleted = false;

        $(document).on("tableLoadCompleted", function () {
            tableLoadCompleted = true;
            var $gfm_table = $('#gfm-table');
            $gfm_table.floatThead({
                scrollContainer: function ($table) {
                    return $table.closest('div#gfm-table-container');
                },
            });

        });
    </script>

</head>
<body>
<?php echo $header; ?>

<div id="viewPort" class="container main">

    <div class="row" style="position:absolute;top:40%;left:50%; z-index:9999;">
        <div id="spinIconForRegion" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        <div id="spinIconForQuery" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        <div id="spinIconForListProperty" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
    </div>

    <div class="row">
	<div class="col-12">
<p>
The SCEC Geological Framework Model (GFM) viewer provides researchers with access to two components of the 
<a href="https://www.scec.org/research/crm">
SCEC Community Rheology Model (CRM)</a>. This viewer provides a graphic-based query interface to the three-dimensional Geological Framework Model (GFM) of the southern California crust and to the <a href="https://www.scec.org/research/ctm">SCEC Community Thermal Model (CTM)</a> which models temperatures and pressure in the region. The viewer allows users to view and download material properties from CVM-H v15.1, geological regions and rock types from the SCEC GFM v1.0 and smoothed temperature from the SCEC CTM.
</p>
        </div>
    </div>

<!--- MISC --->
    <div id="row">
      <div class="d-flex flex-row justify-content-end">
        <button class="btn gfm-small-btn" title="display GFM regions" onclick='toggleShowGFM()'>
           <span id="gfm_gfm_btn" class="glyphicon glyphicon-remove-sign"></span>GFM1.0</button>
        <button class="btn gfm-small-btn" title="display CTM regions" onclick='toggleShowCTM()'>
           <span id="gfm_ctm_btn" class="glyphicon glyphicon-ok-sign"></span>CTM</button>
        <button class="btn gfm-small-btn" title="display CFM7.0 faults" onclick='toggleShowCFM()'>
           <span id="gfm_cfm_btn" class="glyphicon glyphicon-ok-sign"></span>CFM7.0</button>
        <button class="btn gfm-small-btn" title="display GFM 3D regions" onclick='plotRegionClick()' data-toggle="modal" data-target="#modal3DPoint">
           <span id="regionBtn" class="glyphicon glyphicon-ok-sign"></span>GFM3dMesh</button>
      </div>
    </div>

    <div class="justify-content-end custom-control-inline" style="display:none">
      <div style="display:none;" id="external_leaflet_control"></div>
    </div>

    <div id="content-container" class="row flex-row flex-wrap">
        <div id="control-container" class="col-5" style="height:630px;" >
          <div class="row" style="height:5%!important">
          </div>
          <div class="row mt-1" style="height:45%!important;">
          <div class="col-12">
            <div class="col input-group h-100" style="background:whitesmoke;border:1px solid rgb(206,212,218)">
                <div class="row mt-2">
                  <div class="col-9">
                   Enter latitude, longitude, Z value and<br>Z mode below, upload a file with LatLngs and matching Z values or pick a point on map <button class="btn gfm-small-btn" title="enable Map selection" onclick='pointClick()'><span id="pointBtn" class="glyphicon glyphicon-ok-sign"></span>useMap</button>
                  </div>

                  <div class="col-3">
                    <button onclick="resetAll();" class="btn btn-dark"
                     style="margin-right:8vw" type="button">Reset</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5 pr-0">
                      <input type="text"
                              id="LatTxt"
                              placeholder="Latitude"
                              title="lat"
                              value="31.70"
                              onfocus="this.value=''"
                              class="form-control">
                      <input type="text" 
                              id="LonTxt" 
                              placeholder="Longitude" 
                              title="lon"
                              value="-116.20"
                              onfocus="this.value=''" 
                              class="form-control mt-1">
                  </div>
                  <div class="col-5 pr-0" style="margin-left: -6px">
                       <input type="text" 
                              id="ZTxt" 
                              placeholder="Z" 
                              title="Z"
                              value="-9700"
                              onfocus="this.value=''" 
                              class=" form-control">
                       <select id="ZmodeTxt" class="custom-select mt-1">
                              <option value="e">by Elevation</option>
                              <option value="d">by Depth</option>
                       </select>
                       <input type="text"
                              id="UIDTxt" 
                              placeholder="UID" 
                              title="Uniqued ID"
                              onfocus="this.value=''" 
                              class="form-control mt-1" style="display:none">
                  </div>
                  <div class="col-2 pr-0">
                        <button id="queryBtn" type="button" title="query with latlon"
                          style="margin-left:-10px"
                          class="btn btn-default gfm-small-btn " onclick="queryClick()">
                          <span class="glyphicon glyphicon-search"></span>
                        </button>
                        <button class="btn gfm-top-small-btn mt-2" title="definition of different Z mode"
                          style="margin-left:-5px"
                          data-toggle="modal" data-target="#modalzm">
                          <span class="glyphicon glyphicon-info-sign"></span>
                        </button>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-10 pr-1">
                    <input class="form-control" id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='display:none;'></input>
                    <button id="selectbtn" class="btn gfm-top-btn" style="width:200px;height:3vh;" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
                    <span class="glyphicon glyphicon-file"></span>Select file to use</button>
                  </div>
                  <div class="col-2 mt-1">
                    <button class="btn gfm-top-small-btn" title="about batch file mode" data-toggle="modal" style="margin-left:-10px" data-target="#modalFile"><span class="glyphicon glyphicon-info-sign"></span></button>
                  </div>
                </div>
            </div> <!-- latlon/file input/reset --> 
          </div>
          </div>
          <div class="row">
          <div class="col-12 mt-3" id="gfm-table-wrap" style="height:40%!important;overflow:hidden" >
              <div id="gfm-table-container" style="max-height:300px">
                <table id="gfm-table">
                  <thead>
                    <tr style="background:#F2F2F2">
                       <th style="width:35px"> 
                          <button id="allBtn" class="btn btn-sm gfm-small-btn" title="select all available regions" onclick="toggleAll();"> <span id="toggle_all" class="glyphicon glyphicon-ok-sign"></span></button>
                       </th>
                       <th style="border-right:0">
                          <b>GFM Geological Regions</b>
                      </th>
                      <th style="width:50px;border-left:0;padding:3px 13px 3px 44px;">
                          <button id="plot3d-all" class="btn btn-dark" title="plot selected regions in 3D viewer" onclick="executePlot3d()" disabled>Plot3D<span id="plot-counter"></span></button>
                       </th>
                    </tr>
                  </thead>
                  <tbody id="gfm-table-body">
                  </tbody>
                </table> <!-- gfm-table -->
             </div> <!-- gfm-table-container --> 
          </div>
          </div>
        </div> <!-- control-container -->

        <div id="map-container" class="col-7">
            <div class="row">
            <div class="col-8 mb-1" style="margin-left:31%">
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
            </div>
            <div class="row">
            <div class="mapData col-12">
                <div class="row w-100" id='GFM_plot'
                     style="position:relative;border:solid 1px #ced4da; min-height:600px;">     
                </div>
            </div>
            </div>
        </div> <!-- map-container -->

        <div class="mt-0" style="width:95%;margin-left:30px">

        <div id="result-container" class="row d-flex flex-column">
           <div class="col-12 flex-row" align="end">
               <button class="btn gfm-top-small-btn" title="download all the material property in the table" onclick="downloadMPTable()" ><span class="glyphicon glyphicon-download"></span></button>
               <button class="btn gfm-top-small-btn" title="GFM parameters displayed in the table" data-toggle="modal" data-target="#modalParameters"><span class="glyphicon glyphicon-info-sign"></span></button></td>
            </div>
            <div class="col-12 mb-0" id="mp-table">
                <div id="materialPropertyTable-container" style="overflow:auto;max-height:20vh;margin:0px 0px 0px 0px;">
                    <table id="materialPropertyTable">
                        <tr id="placeholder-row">
                            <td colspan="11">Material Property for selected locations will appear here </td>
                        </tr>
                    </table>
                </div>
            </div> <!-- mp-table -->
            <div class="col-12 mt-1 mb-4" id="result-table">
                <div id="resultTable-container" style="overflow:auto;max-height:30vh;margin:0px 0px 10px 0px;">
                    <table id="resultTable">
                        <tbody>
                        <tr id="placeholder-row">
                            <td colspan="12">Downloadable Batch Result will appear here </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div> <!-- Result table -->
            </div>

            <div id="phpResponseTxt"></div>
        </div> <!-- result-container -->
    </div> <!-- content-container -->

</div> <!-- container main -->

<!--Modal: Name-->
<div class="modal" id="modal3D" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="modal3D" aria-hidden="true">
  <div class="modal-dialog modal-xlg" id="modal3DDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modal3DContent">
      <!--Header-->
      <div class="modal-header">
        <button id="view3DToggleReprbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleRepr3Dview(this)">Show Wireframe</button>
        <button id="view3DToggleTracebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleTrace3Dview(this)">Show Traces</button>
        <button id="view3DToggleShorebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleShore3Dview(this)">Hide Coastline</button>
        <button id="view3DToggleBoundsbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleBounds3Dview(this)">Show Bounds</button>
        <button id="view3DToggleLegendbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleLegend3Dview(this)">Hide Legend</button>
        <button id="view3DToggleNorthbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleNorth3Dview(this)">Show Mapview</button>
      </div>

      <!--Body-->
      <div class="modal-body" id="modal3DBody">
        <div id="iframe-container" class="row col-12" style="overflow:hidden">
          <iframe id="view3DIfram" src="" onload="setIframHeight(this.id)" height="10" width="100%" allowfullscreen></iframe>
        </div>
      </div>

      <div class="modal-footer justify-content-center" id="modal3DFooter">
        <div class="row" style="position:absolute;top:40%;left:50%; z-index:9999;">
          <div id="spinIconFor3D" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        </div>

        <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">Close</button>
<!--
        <button id="view3DExpandbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleExpand3Dview(this)">Expand</button>
-->
        <button id="view3DRefreshbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="refresh3Dview()">Reset</button>
        <button id="view3DSavebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="save3Dview()">Save Image</button>
        <button class="btn btn-outline-primary btn-sm" title="start 3d viewer" data-toggle="modal" data-target="#modalinfo3d" onclick="$('#modal3D').modal('hide');">Help</button>
       <button id="view3DWarnbtn" class="btn btn-outline-primary btn-sm" style="display:none" data-toggle="modal" data-target="#modalwarn3d"></button>
      </div> <!-- footer -->

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->

<!--Modal: ModelType -->
<div class="modal" id="modalwarn3d" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalwarn3dDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalwarn3dContent">
      <!--Body-->
      <div class="modal-body" id="modalwarn3dBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="warn3dTable-container"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->

<!--Modal: ModelType -->
<div class="modal" id="modalinfo3d" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalinfo3dDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalinfo3dContent">
      <!--Body-->
      <div class="modal-body" id="modalinfo3dBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="info3dTable-container"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal" onclick="$('#modal3D').modal('show');"
>Close</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->


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

<!--Modal: Rock Type Table -->
<div class="modal" id="modalRockType" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalRockTypeDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalRockTypeContent">
      <!--Body-->
      <div class="modal-body" id="modalRockTypeBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="rockTypeTable" style="display:inline-block;"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->



<!--Modal: Heatflow Regions Table -->
<div class="modal" id="modalHeatRegions" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalHeatRegionsDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalHeatRegionsContent">
      <!--Body-->
      <div class="modal-body" id="modalHeatRegionsBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="heatRegionsTable" style="display:inline-block;"></div>
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
<h5>Local input file format is 3 columns of Longitude, Latitude and Z separated by a comma or a space </h5>
<pre>
lon1 lat1 z1             lon1,lat1,z1
lon2 lat2 z2      or     lon2,lat2,z2
</pre>
<h5>Z value should match the Z mode selection from the main viewer </h5>
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
          <div class="col-12" id="threeDPointPlot" style="display:inline-block;"></div>
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


