/***
   gfm_layer.js
***/

// control whether the main mouseover control should be active or not
var skipPopup=false;

/***
   tracking data structure
***/

// leaflet layer for gfm model boundaries
// oidx is the order index, when there are more than 1 model visible, the oidx 
// denotes the ordering. 1,2,3 etc
// [ { "model": modelname, "layer": layer, "style":styleblob, 'visible':1, 'oidx':v }, ... ]
var gfm_model_list =[];

// material properties returned from backend per lat lon point
// mpblob is what gfm_query returns
// [ { "uid": uid, "mp": mpblob }, ... ]
var gfm_mp_list=[];

// meta list for a query, per job,
// meta is a json blob for timestamp, mode..
var gfm_meta_list=[];
// [ { "uid":uid, "meta": metablob }, ... ]


// for tracking uid that did not get 'used'
var dirty_layer_uid=0;
const POINT_ENUM=1;

const EYE_NORMAL=0,
      EYE_HIGHLIGHT=1,
      EYE_HIDE=2;

// leaflet layer for query, group=LayerGroup
// [ { "uid": uid, "type": type_enum, "group":group, 'highlight':0/1/2 }, ... ]
var gfm_layer_list =[];

// { { "uid":uid, "filename":filename}]}
var gfm_point_file_list=[];

// material property point
// { { "uid":uid, "latlngs":[{"lat":a,"lon":b}]}
var gfm_point_list=[];

// material property by file
// { { "uid":uid, "latlngs":[{"lat":a,"lon":b},...,{"lat":c,"lon":d}]}
var gfm_file_points_list=[];

/*****************************************************************
*****************************************************************/
// see how many mp from points is there right now
function get_points_mp() {
  var len1=gfm_point_list.length;
  return len1;
}

function get_materialproperty(target_uid) {
  var cnt=gfm_mp_list.length;
  for(var i=0; i<cnt; i++) {
    var element=gfm_mp_list[i];
    if (target_uid == element['uid']) {
       var mp=element["mp"];
       return mp;
    }
  }
  return {};
}

/* return meta item if id is in the meta list */
function find_meta_from_list(target_uid) {
   var found=0;
   gfm_meta_list.forEach(function(element) {
     if ( element['uid'] == target_uid )
        found=element;
   });
   return found;
}

function get_leaflet_id(layer) {
   var id=layer['layer']._leaflet_id;
   return id;
}

function find_layer_from_list(target_uid)
{
   var found=0;
   gfm_layer_list.forEach(function(element) {
     if ( element['uid'] == target_uid )
        found=element;
   });
   return found;
}

function remove_all_layers() {
   gfm_layer_list.forEach(function(element) {
     var uid=element['uid'];
     var type=element['type'];
     var group=element['group'];
     switch (type)  {
       case POINT_ENUM: removeFromList(gfm_point_list,uid); break;
     };
     group.eachLayer(function(layer) {
       viewermap.removeLayer(layer);
     });
   });
   gfm_layer_list=[];
}

function reset_dirty_uid() {
   dirty_layer_uid=0;
}

function remove_a_layer(uid) {
   var t=find_layer_from_list(uid);
   if(t) {
     var type=t['type'];
     switch (type)  {
       case POINT_ENUM: removeFromList(gfm_point_list,uid); break;
     };
     var group=t['group'];
     group.eachLayer(function(layer) {
         viewermap.removeLayer(layer);
     });
     var idx = gfm_layer_list.indexOf(t);
     if (idx > -1) {
       gfm_layer_list.splice(idx, 1);
     }
  }
}

function load_a_layergroup(uid,type,group,highlight) {
   var t=find_layer_from_list(uid);
   if(t) {
     window.console.log("already plotted this layer ",uid);
     return;
   }
   gfm_layer_list.push({"uid":uid, "type":type, "group": group,"highlight":highlight});
}

function add_a_layer(uid,layer) {
   var t=find_layer_from_list(uid);
   if(!t) {
     window.console.log("should have a related layer group already ",uid);
     return;
   }
   var group=t["group"];
   group.addLayer(layer); 
}

/* LayerGroup */
function highlight_layergroup(group) {
    if(!viewermap.hasLayer(group)) {
       window.console.log("ERROR, layer is not on map\n");
       return;
    }
    viewermap.removeLayer(group);
    group.eachLayer(function(layer) {
       var op=layer.options;
       if(op.icon != undefined) {
          var iop=op.icon.options;
          if(iop['className']=='blue-div-icon') {
            iop['className']='red-div-icon';
            viewermap.addLayer(group);
            } else { 
// set it when adding this one and then reset to default
// this has to do the awesome marker problem..
            iop.markerColor="red";
            viewermap.addLayer(group);
            iop.markerColor="blue";
          }
          } else {
            op.color="red";
            viewermap.addLayer(group);
       } 
    });
}

function unhighlight_layergroup(group) {
    if(viewermap.hasLayer(group)) {
       viewermap.removeLayer(group);
    }
    group.eachLayer(function(layer) {
       var op=layer.options;
       if(op.icon != undefined) {
          var iop=op.icon.options;
          if(iop['className']=='red-div-icon') {
            iop['className']='blue-div-icon';
            } else { 
              iop.markerColor="blue";
          }
          } else {
            op.color="blue";
       } 
    });
    viewermap.addLayer(group);
}

function hide_layergroup(group) {
    if(viewermap.hasLayer(group)) {
        viewermap.removeLayer(group);
    }
}

function isLayergroupHigh(uid) {
   var found=find_layer_from_list(uid);
   if(found) {
      var h=found['highlight'];
      if(h==EYE_HIGHLIGHT) {
        return 1;
      }
   }
   return 0;
}

// highlight = 0, 1, 2, => normal, highlight, hide
function toggle_a_layergroup(uid) {
   var i;
   var found=find_layer_from_list(uid);
   if(found) {
      var group=found['group'];
      var h=found['highlight'];
      if(h==EYE_NORMAL) {
        highlight_layergroup(group);
        found['highlight']=EYE_HIGHLIGHT;
        $('#gfm_layer_'+uid).addClass('gfm-active');
      } else if (h==EYE_HIGHLIGHT) {
        hide_layergroup(group);
        found['highlight']=EYE_HIDE;
        $('#gfm_layer_'+uid).removeClass('gfm-active');
        $('#gfm_layer_'+uid).removeClass('glyphicon-eye-open');
        $('#gfm_layer_'+uid).addClass('glyphicon-eye-close');
      } else if (h==EYE_HIDE) {
        unhighlight_layergroup(group);
        found['highlight']=EYE_NORMAL;
        $('#gfm_layer_'+uid).addClass('glyphicon-eye-open');
        $('#gfm_layer_'+uid).removeClass('glyphicon-eye-close');
      }
   }
}


/*** special handle for a file of points ***/
function add_file_of_point(uid, fobj) {
  var tmp={"uid":uid,"file":fobj.name};
  gfm_point_file_list.push(tmp);
}

function add_bounding_file_points(uid, darray) {
   var latlngs=makeLatlngs(darray);
   var group=addPointsLayerGroup(latlngs);
   var tmp={"uid":uid, "latlngs":latlngs};
   gfm_file_points_list.push(tmp);
   load_a_layergroup(uid, POINT_ENUM, group, EYE_HIGHLIGHT);
}

function add_bounding_point(uid,a,b) {
  if(dirty_layer_uid) {
    remove_a_layer(dirty_layer_uid);
  }
  var group=addPointLayerGroup(a,b);
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b}]};
  gfm_point_list.push(tmp);
  load_a_layergroup(uid,POINT_ENUM,group, EYE_NORMAL);
}

function add_bounding_point_layer(layer,a,b) {
  if(dirty_layer_uid) {
    remove_a_layer(dirty_layer_uid);
  }
  var uid=getRnd();
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b}]};
  set_point_latlons(uid,a,b);
  gfm_point_list.push(tmp);
  var group=L.layerGroup([layer]);
  viewermap.addLayer(group);

  load_a_layergroup(uid,POINT_ENUM,group, EYE_NORMAL);
  dirty_layer_uid=uid;
}

function remove_bounding_point_layer(uid) {
  remove_a_layer(uid);
}
