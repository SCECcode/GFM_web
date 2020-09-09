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
    <title>Geological Framework Model Viewer (Beta): User Guide</title>
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
            <h4>Geological Framework Model (GFM) Viewer Overview</h4>
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
               This “Plot3D” option is intended to provide potential GFM users with a quick and convenient way to view geological regions in their native 3D environment (UTM zone 11s).  This tool currently does not have the ability to plot 3D axes, and a map scale in 3D is not useful because any scale would only be valid at one given distance from the viewer. 
             </p>
             <p>The coastline and state boundaries in black. In the bottom right corner, the green arrow points North, pink points East, and yellow points up vertically.
             </p>
             <p> 
                 Learning to navigate in 3D takes some practice, so if you get lost or disoriented, try clicking on the “Show Mapview” button in the top right corner to reset to the original mapview.
             </p>

            <h4>Browser Requirements</h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <h4>About the SCEC Geological Framework Model (GFM) </h4>
<p>
The SCEC Geologic Framework Model (GFM) viewer provides researchers with access to two 
essential components of the SCEC Community Rheology model. The current GFM viewer 
displays two components that include a three-dimensional geologic framework model (GFM) of 
southern California's crust, and the SCEC Community Thermal Model (CTM) which provide a 
model of temperatures and pressure in the region. This information provides essential 
components for a model of southern California's ductile rheology. By combining these model 
parameters with given strain rate(s), the SCEC CRM will be able to calculate effective viscosity 
and differential stress throughout the region.
</p>
<p>
The preliminary GFM comprises 23 provinces, each with a set of lithologic layers. It is shared as 
lat-lon files of province boundaries, tables with depth intervals and rock types for each 
province, and petrological descriptions for each rock type.
This GFM model is based on an initial definition of 23 lithotectonic units separated by 
major faults or contrasts in basement lithology and tectonic affinity. In addition, 
several lateral interfaces are represented: topography/bathymetry, base of basins,
base of seismogenic zone, the Moho, and the lithosphere-asthenosphere boundary (LAB).
The base of model is the 100km depth level. The surfaces defining the GFM regions can be
viewed using the webviewers 3D plotting capabilities.
</p>
<p>
From the GFM bounding surfaces, a gridded GFM volume was subdivided into regions. The grid 
has about 900K 10km x 10km x 1km large cells. This gridded volume is accessible through the 
GFM Webviewer under the GFM3dMesh display options. The gridded volume currently has 
three layers: crust, upper mantle and asthenosphere. The crustal layer contains all 23 
lithotectonic units. Each cell is parameterized with a region identification number 
from 1 to 41 which is mapped to region name. The large number of regions stems from 
separation of small slivers at acute corner points of blocks. 
</p>
<p>
The GFM viewer allows users to query 3D points in southern California for lithology 
type (rock type) based on the GFM region and the depth in the region. 
</p>
<p>
This GFM viewer also provides access to a SCEC CTM that provides estimates of temperatures 
and thermal properties of the southern California lithosphere. The CTM model accessible 
through the viewer is described by Thatcher and Chapman (2020), and comprises a suite of 
geotherms for fourteen distinct heat flow regions (HFRs).  These heat flow regions have been 
extended into to 24 regions to ensure the coverage regions for the GFM and CTM models are 
equivalent.
</p>
<p>
CTM data include longitude-latitude coordinates of the heatflow region (HFR) boundaries, and 
within each HFR, temperatures as a function of depth at 1 km increments from the surface 
to 100 km. The CTM values returned by the viewer are smoothed to reduce lateral 
discontinuities in temperature between adjoining HFR's using Gaussian kernels.
</p>

            <h4>References</h4>
            <ul class="references">
                <li><a href="https://www.scec.org/user/plesch">Plesch, A.</a>,
                    <a href="https://www.scec.org/user/jshaw">Shaw, J. H.</a>,
                    <a href="https://www.scec.org/user/oskin">Oskin,M.E.</a>, &
                    <a href="https://www.scec.org/user/maechlin">Maechling, P. J.</a> (2019,08).
                    A volumetric, CFM compatible, Geologic Framework Model (GFM) . Poster Presentation at 2019 SCEC Annual Meeting.
                    <a href="https://www.scec.org/publication/9706">SCEC Contribution 9706</a>
                </li>
                <li>Shinevar, W. J., Behn, M. D., 
                    <a href="https://www.scec.org/user/hirth">Hirth, G.</a>,
                    & Jagoutz, O. (2018). 
                    Inferring crustal viscosity from seismic velocity: Application to the lower crust of Southern California. Earth and Planetary Science Letters, 494, 83-91. 
                    <a href="https://www.scec.org/publication/8944">SCEC Contribution 8944</a>
                </li>
                <li><a href="https://www.scec.org/user/thatcher">Thatcher, W.</a> 
                    and Chapman, D. (2020), The SCEC Community Thermal Model, in preparation for J. Geophys. Res.
                <li><a href="https://www.scec.org/user/thatcher">Thatcher, W.</a>, 
                     <a href="https://www.scec.org/user/ehearn">Hearn, E. H.</a>,
                     <a href="https://www.scec.org/user/oskin">Oskin, M. E.</a>,
                     <a href="https://www.scec.org/user/montesi">Montesi, L. G.</a>,
                     <a href="https://www.scec.org/user/hirth">Hirth, G.</a>, 
                     <a href="https://www.scec.org/user/behr">Behr, W. M.</a>,
                     <a href="https://www.scec.org/user/plesch">Plesch, A.</a>, &
                     <a href="https://www.scec.org/user/jshaw">Shaw, J. H.</a> (2019, 08). 
                     Preliminary SCEC Community Rheology Model. Poster Presentation at 2019 SCEC Annual Meeting.
                    <a href="https://www.scec.org/publication/9833">SCEC Contribution 9833</a>
                </li>
                <li><a href="https://www.scec.org/user/jshaw">Shaw, J. H.</a>,
                    <a href="https://www.scec.org/user/plesch">Plesch, A.</a>,
                    <a href="https://www.scec.org/user/carltape">Tape, C.</a>,
                    Suess, M.,
                    <a href="https://www.scec.org/user/tjordan">Jordan, T. H.</a>,
                    <a href="https://www.scec.org/user/gely">Ely, G.</a>,
                    <a href="https://www.scec.org/user/hauksson">Hauksson, E.</a>,
                    <a href="https://www.scec.org/user/jtromp">Tromp, J.</a>,
                    <a href="https://www.scec.org/user/toshiro">Tanimoto, T.</a>,
                    <a href="https://www.scec.org/user/rgraves">Graves, R.</a>,
                    <a href="https://www.scec.org/user/kbolsen">Olsen, K.</a>,
                    <a href="https://www.scec.org/user/nicholson"> Nicholson, C.</a>,
                    <a href="https://www.scec.org/user/machelin">Maechling, P. J.</a>,
                    <a href="https://www.scec.org/user/rivero">Rivero, C.</a>,
                    <a href="https://www.scec.org/user/plovely">Lovely, P.</a>,
                    <a href="https://www.scec.org/user/brankman">Brankman, C. M.</a>,
                    & Munster, J. (2015). 
                    Unified Structural Representation of the southern California crust and upper mantle. Earth and Planetary Science Letters, 415, 1-15.
                    <a href="https://dx.doi.org/10.1016/j.epsl.2015.01.016">doi: 10.1016/j.epsl.2015.01.016</a>.  
                    <a href="https://www.scec.org/publication/2068">SCEC Contribution 2068</a>
                </li>
            </ul>
        </div>
    </div>
</body>
</html>
