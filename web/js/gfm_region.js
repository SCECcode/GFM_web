/****

  gfm_region.js

****/

var GFM_tb={
"regions": [
{'id':1,'name':'Asthenosphere','sliver':0,'state':1,'color':'#786D5F'},
{'id':2,'name':'Upper Mantle','sliver':0,'state':1,'color':'#FF0000'},
/* purple */ {'id':3,'name':'Sierra Nevada(E)','sliver':0,'state':1,'color':'#B041FF'},
/* brown */ {'id':4,'name':'Colorado Plateau','sliver':0,'state':1,'color':'#614051'},
/* purple */ {'id':5,'name':'Sierra Nevada(W)','sliver':0,'state':1,'color':'#B041FF'},
/* purple */ {'id':6,'name':'Peninsular Range(W)','sliver':'0','state':1,'color':'#B041FF'},
/* dark orange */{'id':7,'name':'Basin and Range','sliver':0,'state':1,'color':'#F88017'},
/* purple */ {'id':8,'name':'Peninsular Range(W)','sliver':1,'state':1,'color':'#B041FF'},
/* dark orange */{'id':9,'name':'Southern Walker Lane','sliver':0,'state':1,'color':'#F88017'},
/* purple */{'id':10,'name':'Peninsular Range(E)','sliver':0,'state':1,'color':'#B041FF'},
/* dark orange */{'id':11,'name':'Gulf Rifted Margin','sliver':1,'state':1,'color':'#F88017'},
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
/* dark orange */ {'id':22,'name':'Gulf Rifted Margin','sliver':0,'state':1,'color':'#F88017'},
/* yellow */ {'id':23,'name':'Western Transverse Ranges','sliver':0,'state':1,'color':'#FFD801'},
/* light orange */{'id':24,'name':'Santa Maria Rift','sliver':1,'state':1,'color':'#FFA62F'},
/* light orange */ {'id':25,'name':'Inner Borderland Rift','sliver':0,'state':1,'color':'#FFA62F'},
/* yellow */{'id':26,'name':'Western Transverse Ranges','sliver':1,'state':1,'color':'#FFD801'},
/* yellow */ {'id':27,'name':'Nicolas Terrane','sliver':0,'state':1,'color':'#FFD801'},
/* violet */ {'id':28,'name':'Rift Axis 2','sliver':0,'state':1,'color':'#D462FF'},
/* green */ {'id':29,'name':'San Francisco Bay','sliver':0,'state':1,'color':'#347C17'},
/* purple */ {'id':30,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#B041FF'},
/* violet */ {'id':31,'name':'Rift Axis 1','sliver':0,'state':1,'color':'#D462FF'},
/* purple */ {'id':32,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#B041FF'},
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
{'id':'X','units':'decimal degree'},
{'id':'Y','units':'decimal degree'},
{'id':'Z','units':'meters below surface/relative to sealevel'},
{'id':'utmX','units':'UTM_Zone_11'},
{'id':'utmY','units':'UTM_Zone_11'},
{'id':'elevX','units':'NA'},
{'id':'elevY','units':'NA'},
{'id':'topo','units':'meters relative to sealevel'},
{'id':'mtop','units':'NA'},
{'id':'base','units':'meters relative to sealevel'},
{'id':'moho','units':'meters relative to sealevel'},
{'id':'src','units':'model name'},
{'id':'cellX','units':'NA'},
{'id':'cellY','units':'NA'},
{'id':'cellZ','units':'NA'},
{'id':'tg','units':'NA'},
{'id':'vp','units':'meters/sec'},
{'id':'vs','units':'meters/sec'},
{'id':'rho','units':'kg/m^3'},
{'id':'regionID','units':'NA'},
{'id':'temp','units':'degree C'}
]};

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
