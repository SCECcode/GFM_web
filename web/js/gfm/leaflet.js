/***
   gfm_leaflet.js
***/

var point_icon = L.AwesomeMarkers.icon({ icon: 'record', markerColor: 'blue'});
var point_options = { icon : point_icon };
var pointDrawer;

var myIcon = L.divIcon({className: 'blue-div-icon'});
var small_point_options = { icon : myIcon};

var mymap, baseLayers, layerControl, currentLayer;

function clear_popup()
{
  viewermap.closePopup();
}

function refresh_map()
{
  if (viewermap == undefined) {
    window.console.log("refresh_map: BAD BAD BAD");
    } else {
      viewermap.setView([33.3, -118.4], 6);
  }
}

function setup_viewer()
{
// esri
  var esri_topographic = L.esri.basemapLayer("Topographic");
  var esri_imagery = L.esri.basemapLayer("Imagery");
  var esri_ng = L.esri.basemapLayer("NationalGeographic");

// otm topo
  var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors,<a href=http://viewfinderpanoramas.org"> SRTM</a> | &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
 L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution})

  var otm_topographic = L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution});

// osm street
  var openURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var openAttribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var osm_street=L.tileLayer(openURL, {attribution: openAttribution});

  baseLayers = {
    "esri topo" : esri_topographic,
    "esri NG" : esri_ng,
    "esri imagery" : esri_imagery,
    "otm topo": otm_topographic,
    "osm street" : osm_street
  };
  var overLayer = {};
  var basemap = L.layerGroup();
  currentLayer = esri_topographic;

// ==> mymap <==
  mymap = L.map('GFM_plot', { drawControl:false, layers: [esri_topographic, basemap], zoomControl:true} );
  mymap.setView([33.3, -118.4], 6);

// basemap selection
  var ctrl_div=document.getElementById('external_leaflet_control');

// ==> layer control <==
// add and put it in the customized place
//  L.control.layers(baseLayers, overLayer).addTo(mymap);
  layerControl = L.control.layers(baseLayers, overLayer,{collapsed: true });
  layerControl.addTo(mymap);
  var elem= layerControl._container;
  elem.parentNode.removeChild(elem);

  ctrl_div.appendChild(layerControl.onAdd(mymap));
  // add a label to the leaflet-control-layers-list
  var forms_div=document.getElementsByClassName('leaflet-control-layers-list');
  var parent_div=forms_div[0].parentElement;
  var span = document.createElement('span');
  span.style="font-size:14px;font-weight:bold;";
  span.className="leaflet-control-layers-label";
  span.innerHTML = 'Select background';
  parent_div.insertBefore(span, forms_div[0]);

// ==> scalebar <==
  L.control.scale({metric: 'false', imperial:'false', position: 'bottomleft'}).addTo(mymap);

  function onMapMouseOver(e) {
    if( in_drawing_point() ) {
      drawPoint();
      return;
    }
  }
  function onMapMouseOut(e) {
    if( in_drawing_point() ) {
      skipPoint();
      return;
    }
  }

  mymap.on('mouseover', onMapMouseOver);
  mymap.on('mouseout', onMapMouseOut);

  L.marker([-120,32], {icon: myIcon}).addTo(mymap);


// ==> point drawing control <==
  pointDrawer = new L.Draw.Marker(mymap, point_options);

  mymap.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {  // can be a point or a profile
        var sw=layer.getLatLng();
        if( in_drawing_profile() ) {
          add_bounding_profile_layer(layer,sw['lat'],sw['lng']);
          } else {
            add_bounding_point_layer(layer,sw['lat'],sw['lng']);
        }
    }
  });

// finally,
  return mymap;
}

function drawPoint(){ pointDrawer.enable(); }
function skipPoint(){ pointDrawer.disable(); }

// https://gis.stackexchange.com/questions/148554/disable-feature-popup-when-creating-new-simple-marker
function unbindPopupEachFeature(layer) {
    layer.unbindPopup();
    layer.off('click');
}

function addPointsLayerGroup(latlngs) {
  var cnt=latlngs.length;
  if(cnt < 1)
    return null;
  var group = L.layerGroup();
  var i;
  for(i=0;i<cnt;i++) {
     var item=latlngs[i];
     var lat=parseFloat(item['lat']);
     var lon=parseFloat(item['lon']);
     var bounds = [lat,lon ];
     var layer = L.marker(bounds, small_point_options);
     var icon = layer.options.icon;
     icon.options.iconSize = [10, 10];
     layer.setIcon(icon);
     group.addLayer(layer);
  }
  mymap.addLayer(group);
  return group;
}

function addPointLayerGroup(lat,lon) {
  var bounds = [lat, lon];
  var layer = L.marker(bounds,point_options);
  var group = L.layerGroup([layer]);
  mymap.addLayer(group);
  return group;
}

function switchBaseLayer(layerString) {
    mymap.removeLayer(currentLayer);
    mymap.addLayer(baseLayers[layerString]);
    currentLayer = baseLayers[layerString];
}

