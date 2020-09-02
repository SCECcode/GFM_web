<?php
require_once(dirname(__FILE__)."/navigation.php");
$header = getHeader("User Guide");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="../../css/vendor/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="../../css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="../../css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="../../css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="../../css/vendor/glyphicons.css">
    <link rel="stylesheet" href="../../css/gfm/gfm-ui.css">
    <link rel="stylesheet" href="../../css/scec-ui.css">
    <link rel="stylesheet" href="../../css/sidebar.css">

    <script type='text/javascript' src='../../js/vendor/popper.min.js'></script>
    <script type='text/javascript' src='../../js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='../../js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='../../js/vendor/jquery-ui.js'></script>
    <title>Geologic Framework Model Viewer (Beta): User Guide</title>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container guide">

    <h1>User Guide</h1>

    <div class="row">
        <div class="col-12">
            <figure class="scec-interface figure float-lg-right">
                <img src="../../img/gfm-viewer.png" class="figure-img img-fluid" alt="Screen capture of GFM Viewer interface">
                <figcaption class="figure-caption">Screen capture of GFM Viewer interface</figcaption>
            </figure>
            <h4>Geologic Framework Model (GFM) Viewer Overview</h4>
            <p>The GFM Viewer provides a map-based view of <a href="https://www.scec.org/research/gfm">GFM version 1.0</a> dataset. The pages on this site are the <a href="<?php echo $host_site_actual_path; ?>">GFM viewer page</a>, this user guide, <a href="disclaimer">a disclaimer</a>, and a <a href="contact">contact information</a> page.
            </p>

            <p>The main interface is on the <a href="<?php echo $host_site_actual_path; ?>">Viewer Page</a>. When it is
               first loaded, Upper left is a query dashboard for query material properties. All available geological regions are listed in the box on the lower left and displayed on the 2D map. Click on the checkboxes in the region table to select region to plot in the 3D plotting tool.
            </p>
            <p><i>This site is a beta version undergoing active testing and review by the GFM community. To report any bugs or issues, please see the <a href="contact">contact page</a>.</i></p>

            <h4>Query for Material Properties</h4>
            <p>
                The site provides two search methods: search by latitude/longitude and Z (depth or elevation) interactively or by selecting a local input file composed of multiples of data points.
                 </p>
            <p>
                When performing a latitude/longitude search, there are two search methods. The first method is to
                enter the latitude/longitude values into the text boxes, then clicking the search icon <span style="white-space: nowrap;">(<span style="color:#990000;font-size:20px" class="glyphicon glyphicon-search"></span>).</span>
                The second method is to activate <span style="color:#990000" class="glyphicon glyphicon-ok-sign"><b>useMap</b></span> and proceed to drop the marker (<span style="color:#53A2BE;font-size:20px" class="glyphicon glyphicon-map-marker"></span>) on a location on the 2D map and click the search icon.
            </p>

            <p>To return to the initial view , click the "RESET" button.</p>

            <h4>Viewing and Downloading Data</h4>

            <p>
              Complete material properties in CSV format are available for download from this site. After retrieved materials properties of desired locations, click on <span style="font-size:20px" class="glyphicon glyphicon-download"></span> to save locally. For material properties retrieved using input file, there is a special <span style="color:#990000;font-size:20px" class="glyphicon glyphicon-download-alt"></span> for each file request for this purpose.
            </p>

            <h4>Viewing in 3D and the Plot3D tool</h4>
            <p>
               This “Plot3D” option is intended to provide potential GFM users with a quick and convenient way to view Geologic regions in their native 3D environment (UTM zone 11s).  This tool currently does not have the ability to plot 3D axes, and a map scale in 3D is not useful because any scale would only be valid at one given distance from the viewer. 
             </p>
             <p>The coastline and state boundaries in black. In the bottom right corner, the green arrow points North, pink points East, and yellow points up vertically.
             </p>
             <p> 
                 Learning to navigate in 3D takes some practice, so if you get lost or disoriented, try clicking on the “Show Mapview” button in the top right corner to reset to the original mapview.
             </p>

            <h4>Browser Requirements</h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <h4>About the SCEC Geologic Framework Model (GFM) </h4>
        </div>
    </div>
</body>
</html>
