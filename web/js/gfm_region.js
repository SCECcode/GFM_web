/****

  gfm_region.js

****/

var GFM_tb={
"regions": [
{'id':1,'name':'Asthenosphere','sliver':0,'state':1,'color':'#786D5F'},
{'id':2,'name':'Upper Mantle','sliver':0,'state':1,'color':'#FF0000'},
/* purple */ {'id':3,'name':'Sierra Nevada(E)','sliver':0,'state':1,'color':'#B041FF'},
/* brown */ {'id':4,'name':'Colorado Plateau','sliver':0,'state':1,'color':'#614051'},
/* purple */ {'id':5,'name':'Sierra Nevada(W)','sliver':0,'state':1,'color':'#4A148C'},
/* purple */ {'id':6,'name':'Peninsular Range(W)','sliver':'0','state':1,'color':'#7B1FA2'},
/* dark orange */{'id':7,'name':'Basin and Range','sliver':0,'state':1,'color':'#D84315'},
/* purple */ {'id':8,'name':'Peninsular Range(W)','sliver':1,'state':1,'color':'#9C27B0'},
/* dark orange */{'id':9,'name':'Southern Walker Lane','sliver':0,'state':1,'color':'#FF6F00'},
/* purple */{'id':10,'name':'Peninsular Range(E)','sliver':0,'state':1,'color':'#6A1B9A'},
/* dark orange */{'id':11,'name':'Gulf Rifted Margin','sliver':1,'state':1,'color':'#D84315'},
/* Cyan */{'id':12,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* Cyan */{'id':13,'name':'Mojavia','sliver':0,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':14,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':15,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':16,'name':'Salinia','sliver':0,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':17,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* yellow */ {'id':18,'name':'Great Valley','sliver':0,'state':1,'color':'#FFD801'},
/* Cyan */ {'id':19,'name':'San Gabriel','sliver':0,'state':1,'color':'#3090C7'},
/* light orange */ {'id':20,'name':'Santa Maria Rift','sliver':0,'state':1,'color':'#FFA62F'},
/* Cyan */ {'id':21,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* dark orange */ {'id':22,'name':'Gulf Rifted Margin','sliver':0,'state':1,'color':'#EF6C00'},
/* yellow */ {'id':23,'name':'Western Transverse Ranges','sliver':0,'state':1,'color':'#FFD801'},
/* light orange */{'id':24,'name':'Santa Maria Rift','sliver':1,'state':1,'color':'#FFA62F'},
/* light orange */ {'id':25,'name':'Inner Borderland Rift','sliver':0,'state':1,'color':'#FFA62F'},
/* yellow */{'id':26,'name':'Western Transverse Ranges','sliver':1,'state':1,'color':'#FFD801'},
/* yellow */ {'id':27,'name':'Nicolas Terrane','sliver':0,'state':1,'color':'#FFD801'},
/* violet */ {'id':28,'name':'Rift Axis 2','sliver':0,'state':1,'color':'#D462FF'},
/* green */ {'id':29,'name':'San Francisco Bay','sliver':0,'state':1,'color':'#347C17'},
/* purple */ {'id':30,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#9172EC'},
/* violet */ {'id':31,'name':'Rift Axis 1','sliver':0,'state':1,'color':'#D462FF'},
/* purple */ {'id':32,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#7F38EC'},
/* violet */ {'id':33,'name':'Rift Axis 3','sliver':0,'state':1,'color':'#D462FF'},
/* green */ {'id':34,'name':'Accretionary Prism(S)','sliver':0,'state':1,'color':'#347C17'},
/* green */ {'id':35,'name':'Accretionary Prism(N)','sliver':0,'state':1,'color':'#347C17'},
/* dark purple */ {'id':36,'name':'Oceanic Crust','sliver':0,'state':1,'color':'#6C2DC7'},
/* Cyan */ {'id':37,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':38,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':39,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
/* Cyan */ {'id':40,'name':'San Gabriel','sliver':1,'state':1,'color':'#3090C7'},
{'id':41,'name':'Above Ground','sliver':0,'state':1,'color':'#FFFFFF'} 
],
"units": [
{'id':'X','label':'X','units':'Input X (longitude or UTM coordinate)'},
{'id':'Y','label':'Y','units':'Input Y (latitude or UTM coordinate)'},
{'id':'Z','label':'Z','units':'Input Z (elevation, meters above sea level,ie.,positive up)<br>(depth, meters below surface, i.e., negative down)'},
{'id':'utmX','label':'utmX','units':'UTM coordinate (zone 11), easting'},
{'id':'utmY','label':'utmY','units':'UTM coordinate (zone 11), northing'},
{'id':'elevX','label':'elevX','units':'X coordinate of center of the cell which provided data value for elevations'},
{'id':'elevY','label':'elevY','units':'Y coordinate of center of the cell which provided data value for elevations'},
{'id':'topo','label':'topo','units':'Topographic/bathymetric elevation in meters'},
{'id':'mtop','label':'mtop','units':'Top of model in meters, below this depth there are data'},
{'id':'base','label':'base','units':'Basement elevation in meters (generaly negative)'},
{'id':'moho','label':'moho','units':'Moho elevation in meters (always negative)'},
{'id':'src','label':'hr/lr/cm/nr','units':'Flag to indicate whetehr high-resolution(hr), low-resolution(lr) or <br>lower crust.mantle voxet was used(cm); or if no data available(nr)'},
{'id':'cellX','label':'cellX','units':'X coordinate of center of cell which provided velocity data value'},
{'id':'cellY','label':'cellY','units':'Y coordinate of center of cell which provided velocity data value'},
{'id':'cellZ','label':'cellZ','units':'Z coordinate of center of cell which provided velocity data value'},
{'id':'tg','label':'tg','units':'Provenance of data point'},
{'id':'vp','label':'vp','units':'Compressional wave velocity in meters/sec'},
{'id':'vs','label':'vs','units':'Shear wave velocity in meters/sec'},
{'id':'rho','label':'rho','units':'Density in kg/m^3'},
{'id':'regionID','label':'regionID','units':'ID of the geological framework model region name as defined in GFM v1.0 Region Name Table'},
{'id':'temp','label':'temp','units':'GFM v1.0 Temperature in degree Celsius'}
]};

function makeParametersTable() {
   var tb=GFM_tb['units'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">CVMH+GFM v1.0 Parameters Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:6vw\">Parameter</td><td style=\"width:40vw\">Description</td></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     var units=item['units'];
     var t="<tr><td style=\"width:6vw\">"+label+"</td><td style=\"width:40vw\">"+units+"</td></tr>";
     tbhtml=tbhtml+t;
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
   tbhtml=tbhtml+"<tr><td style=\"width:10px\">ID</td><td style=\"width:20vw\">Region Name</td><td style=\"width:5px\">sliver</td></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var id=item['id']
     var name=item['name'];
     var sliver=item['sliver'];
     var t="<tr><td style=\"width:10px\">"+id+"</td><td style=\"width:20vw\">"+name+"</td><td style=\"width:5px\">"+sliver+"</td></tr>";
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


function getUnitsWithLabel(label) {
   var tb=GFM_tb['units'];
   var cnt=tb.length;
   var i;
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['units'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}

function getUnitsWithLabelAndVal(label,val) {
   var tb=GFM_tb['units'];
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
          var n=u['units'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}
