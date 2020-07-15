/****

  gfm_region.js

****/

var GFM_tb={
"regions": [
{'id':1,'name':'Asthenosphere','sliver':0,'state':1,'color':'#786D5F'},
{'id':2,'name':'Upper Mantle','sliver':0,'state':1,'color':'#FF0000'},
{'id':3,'name':'Sierra Nevada(E)','sliver':0,'state':1,'color':'#B041FF'},
{'id':4,'name':'Colorado Plateau','sliver':0,'state':1,'color':'#614051'},
{'id':5,'name':'Sierra Nevada(W)','sliver':0,'state':1,'color':'#4A148C'},
{'id':6,'name':'Peninsular Range(W)','sliver':'0','state':1,'color':'#7B1FA2'},
{'id':7,'name':'Basin and Range','sliver':0,'state':1,'color':'#D84315'},
{'id':8,'name':'Peninsular Range(W)','sliver':1,'state':1,'color':'#9C27B0'},
{'id':9,'name':'Southern Walker Lane','sliver':0,'state':1,'color':'#FF6F00'},
{'id':10,'name':'Peninsular Range(E)','sliver':0,'state':1,'color':'#6A1B9A'},
{'id':11,'name':'Gulf Rifted Margin','sliver':1,'state':1,'color':'#D84315'},
{'id':12,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':13,'name':'Mojavia','sliver':0,'state':1,'color':'#3090C7'},
{'id':14,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':15,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':16,'name':'Salinia','sliver':0,'state':1,'color':'#3090C7'},
{'id':17,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':18,'name':'Great Valley','sliver':0,'state':1,'color':'#FFD801'},
{'id':19,'name':'San Gabriel','sliver':0,'state':1,'color':'#3090C7'},
{'id':20,'name':'Santa Maria Rift','sliver':0,'state':1,'color':'#FFA62F'},
{'id':21,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':22,'name':'Gulf Rifted Margin','sliver':0,'state':1,'color':'#EF6C00'},
{'id':23,'name':'Western Transverse Ranges','sliver':0,'state':1,'color':'#FFD801'},
{'id':24,'name':'Santa Maria Rift','sliver':1,'state':1,'color':'#FFA62F'},
{'id':25,'name':'Inner Borderland Rift','sliver':0,'state':1,'color':'#FFA62F'},
{'id':26,'name':'Western Transverse Ranges','sliver':1,'state':1,'color':'#FFD801'},
{'id':27,'name':'Nicolas Terrane','sliver':0,'state':1,'color':'#FFD801'},
{'id':28,'name':'Rift Axis 2','sliver':0,'state':1,'color':'#D462FF'},
{'id':29,'name':'San Francisco Bay','sliver':0,'state':1,'color':'#347C17'},
{'id':30,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#9172EC'},
{'id':31,'name':'Rift Axis 1','sliver':0,'state':1,'color':'#D462FF'},
{'id':32,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#7F38EC'},
{'id':33,'name':'Rift Axis 3','sliver':0,'state':1,'color':'#D462FF'},
{'id':34,'name':'Accretionary Prism(S)','sliver':0,'state':1,'color':'#347C17'},
{'id':35,'name':'Accretionary Prism(N)','sliver':0,'state':1,'color':'#347C17'},
{'id':36,'name':'Oceanic Crust','sliver':0,'state':1,'color':'#6C2DC7'},
{'id':37,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':38,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':39,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':40,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':41,'name':'Above Ground','sliver':0,'state':1,'color':'#FFFFFF'} 
],
"descript": [
{'id':'X','label':'X','show':1,'descript':'Input X (longitude or UTM coordinate)'},
{'id':'Y','label':'Y','show':1,'descript':'Input Y (latitude or UTM coordinate)'},
{'id':'Z','label':'Z','show':1,'descript':'Input Z (elevation - meters above sea level. Positive numbers above sea-level)<br>(depth - meters below ground surface. Positive numbers below ground surface)'},
{'id':'utmX','label':'utmX','show':0,'descript':'UTM coordinate (zone 11), easting'},
{'id':'utmY','label':'utmY','show':0,'descript':'UTM coordinate (zone 11), northing'},
{'id':'elevX','label':'elevX','show':0,'descript':'X coordinate of center of the cell which provided data value for elevations'},
{'id':'elevY','label':'elevY','show':0,'descript':'Y coordinate of center of the cell which provided data value for elevations'},
{'id':'topo','label':'topo','show':1,'descript':'Topographic/bathymetric elevation in meters'},
{'id':'mtop','label':'mtop','show':1,'descript':'Top of model in meters, below this depth there are data'},
{'id':'base','label':'base','show':1,'descript':'Basement elevation in meters (generaly negative)'},
{'id':'moho','label':'moho','show':1,'descript':'Moho elevation in meters (always negative)'},
{'id':'src','label':'hr/lr/cm/nr','show':1,'descript':'Flag to indicate whetehr high-resolution(hr), low-resolution(lr) or <br>lower crust.mantle voxet was used(cm); or if no data available(nr)'},
{'id':'cellX','label':'cellX','show':0,'descript':'X coordinate of center of cell which provided velocity data value'},
{'id':'cellY','label':'cellY','show':0,'descript':'Y coordinate of center of cell which provided velocity data value'},
{'id':'cellZ','label':'cellZ','show':0,'descript':'Z coordinate of center of cell which provided velocity data value'},
{'id':'tg','label':'tg','show':0,'descript':'Provenance of data point'},
{'id':'vp','label':'vp','show':1,'descript':'Compressional wave velocity in meters/sec'},
{'id':'vs','label':'vs','show':1,'descript':'Shear wave velocity in meters/sec'},
{'id':'rho','label':'rho','show':1,'descript':'Density in kg/m^3'},
{'id':'regionID','label':'regionID','show':1,'descript':'ID of the geological framework model region name as defined in GFM v1.0 Region Name Table'},
{'id':'temp','label':'temp','show':1,'descript':'GFM v1.0 Temperature in degree Celsius'}
],
"zmodes": [
{'id':1, 'mode name':'Depth', 'value':'d', 'description':'0 at surface and positive depth value'},
{'id':2, 'mode name':'Elevation', 'value':'e', 'description':'0 at sealevel and positive value toward the air and negative value toward the center of the earth'}
]
};

function showInTable(key) {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     if(label == key) {
       return item['show'];
     }
  }
  window.console.log("ERROR, showInTable, no such key",key);
  return 0;
}

function makeParametersTable() {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">CVMH+GFM v1.0 Parameters Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:10vw\">Parameter</td><td style=\"width:45vw\">Description</td></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     var descript=item['descript'];
     if( item['show'] ) {
       var t="<tr><td style=\"width:10vw\">"+label+"</td><td style=\"width:45vw\">"+descript+"</td></tr>";
       tbhtml=tbhtml+t;
     }
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


function makeRegionsTable() {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">GFM v1.0 Region Name Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:5vw\">ID</td><td style=\"width:30vw\">Region Name</td><td style=\"width:8vw\">sliver</td></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var id=item['id']
     var name=item['name'];
     var sliver=item['sliver'];
     var t="<tr><td style=\"width:5vw\">"+id+"</td><td style=\"width:30vw\">"+name+"</td><td style=\"width:8vw\">"+sliver+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function makeZModeTable() {
   var tb=GFM_tb['zmodes'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">Z Mode Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ucvm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:8vw\"><b>Mode</b></td><td style=\"width:40vw\"><b>Description</b></td></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['mode name'];
     var descript=item['description'];
     var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


function getRegionNameWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) {
        var n= region['name']+'['+id+']';
        if(region['sliver'])
            n=n+"*";
        return n;
      }
   }
   return undefined;
}

function getRegionNameWithID2(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) {
        var n= region['name'];
        return n;
      }
   }
   return undefined;
}

function getRegionColorWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        return region['color'];
   }
   return undefined;
}

function getRegionColorWithName(name) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['name'] == name) 
        return region['color'];
   }
   return undefined;
}

function getRegionStateWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        return region['state'];
   }
   return undefined;
}

function setRegionStateWithID(id,state) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        region['state']=state;
   }
}


function getDescriptWithLabel(label) {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   var i;
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['descript'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}

function getDescriptWithLabelAndVal(label,val) {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   var i;
   // special case for regionID
   if(label == 'regionID') {
      var n=getRegionNameWithID2(val);
      return n;
   }
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['descript'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}
