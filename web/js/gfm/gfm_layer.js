/***
   gfm_layer.js
***/

/***
   tracking data structure
***/

// material properties returned from backend per lat lon point
// mpblob is what gfm_query returns
// [ { "uid": uid, "mp": mpblob }, ... ]
var gfm_mp_list=[];

// for tracking uid that did not get 'used'
var dirty_layer_uid=0;
const POINT_ENUM=1;

const EYE_NORMAL=0,
      EYE_HIGHLIGHT=1,
      EYE_HIDE=2;

// leaflet layer for query, group=LayerGroup
// [ { "uid": uid, "type": type_enum, "group":group, 'highlight':0/1/2 }, ... ]
var gfm_layer_list =[];

// [{ "uid":uid, "filename":filename}]
var gfm_point_file_list=[];

// material property point
// [{ "uid":uid, "latlngs":[{"lat":a,"lon":b}]} ]
var gfm_point_list=[];

// material property by file
// [ { "uid":uid, "latlngs":[{"lat":a,"lon":b},...,{"lat":c,"lon":d}]} ]
var gfm_file_points_list=[];


// track the gfm polygon being loaded into viewer via group-layer
// using domain_id as gid as if it is objgid
// [ { "uid":duid, "name":dname, "layer":layer, "layer_id":lid, "highlight":0 } ]
var gfm_id2id_list=[];
var gfm_region_highlight=0;

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


function make_id2id_list(group) {
  group.eachLayer(function(layer) {
    var id=layer._leaflet_id;
    var layer_id=id -1;
    var tmp=layer._layers[layer_id];
    var feature=tmp['feature'];
    var d_id=feature.id;
    var d_name=feature.properties['name'];
    var item={"uid":d_id,"name":d_name, "layer":layer,"layer_id":layer_id, "highlight":0 };
    gfm_id2id_list.push(item);
    window.console.log("id2id ",d_name);
  });
}

// it is possible that there is no id2id entry per table
function toggle_id2id_highlight(gid) {
   var item=getFromList(gfm_id2id_list,gid);
   if(item != undefined) {
     var $btn=$(`#highlight_id2id_${gid}`);
     _toggle_id2id(item,gid);
   }
}

function _toggle_id2id(item, gid) {
   item['highlight']=!item['highlight'];
   var layer=item['layer'];
   var $btn=$(`#highlight_id2id_${gid}`);
   if(item['highlight'] == 1) {
     layer.setStyle({weight:5});
     gfm_region_highlight++;
     setSkipPopup(true);
     $btn.removeClass('glyphicon-unchecked').addClass('glyphicon-check');
     } else {
        $btn.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        gfm_region_highlight--;
        layer.setStyle({weight:1});
        if(gfm_region_highlight == 0) {
          setSkipPopup(false);
        }
   }
} 


// [ { "uid":duid, "name":dname, "layer":layer, "layer_id":lid, "highlight":0 } ]
function select_all_id2id(state) {
   var $bbtn=$(`#toggle_all`);
   var cnt=gfm_id2id_list.length;
   var item;
   for(var i=0; i<cnt; i++) {
     item=gfm_id2id_list[i]; 
     var gid=item['uid'];     
     var $btn=$(`#highlight_id2id_${gid}`);
     if($btn != undefined ) { // skip if undefined
       var highlight=item['highlight'];     
       if(state && !highlight) { // highlight it
         _toggle_id2id(item, gid);
         $bbtn.removeClass('glyphicon-ok-sign').addClass('glyphicon-remove-sign');
       } else if(!state && highlight) { // unhighlight it
         _toggle_id2id(item, gid);
         $bbtn.removeClass('glyphicon-remove-sign').addClass('glyphicon-ok-sign');
       }
     }
   }
}

function get_active_id2id() {
   var alist=[]; 
   var cnt=gfm_id2id_list.length;
   var item; 
   for(var i=0; i<cnt; i++) {
     item=gfm_id2id_list[i];
     gid=item['uid'];
     if(item['highlight'])
       alist.push(gid);
   }
   return alist;
}
