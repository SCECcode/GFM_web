/****

  gfm_region.js

****/

var GFM_tb={
"regions": [
{'id':1,'name':'Asthenosphere','sliver':0,'state':1,'color':'#786D5F'},
{'id':2,'name':'Upper Mantle','sliver':0,'state':1,'color':'#FF0000'},
{'id':3,'name':'Sierra Nevada(E)','sliver':0,'state':1,'color':'#BCE954'},
{'id':4,'name':'Colorado Plateau','sliver':0,'state':1,'color':'#FBEBD7'},
{'id':5,'name':'Sierra Nevada(W)','sliver':0,'state':1,'color':'#41A317'},
{'id':6,'name':'Peninsular Range(W)','sliver':'0','state':1,'color':'#348071'},
{'id':7,'name':'Basin and Range','sliver':0,'state':1,'color':'#59E817'},
{'id':8,'name':'Peninsular Range(W)','sliver':1,'state':1,'color':'#EEDA74'},
{'id':9,'name':'Southern Walker Lane','sliver':0,'state':1,'color':'#48CCCD'},
{'id':10,'name':'Peninsular Range(E)','sliver':0,'state':1,'color':'#728C00'},
{'id':11,'name':'Gulf Rifted Margin','sliver':1,'state':1,'color':'#348781'},
{'id':12,'name':'San Gabriel','sliver':1,'state':1,'color':'#FFA62F'},
{'id':13,'name':'Mojavia','sliver':0,'state':1,'color':'#FFCBA4'},
{'id':14,'name':'San Gabriel','sliver':1,'state':1,'color':'#FFD017'},
{'id':15,'name':'San Gabriel','sliver':1,'state':1,'color':'#FBB917'},
{'id':16,'name':'Salinia','sliver':0,'state':1,'color':'#C19A6B'},
{'id':17,'name':'San Gabriel','sliver':1,'state':1,'color':'#CD7F32'},
{'id':18,'name':'Great Valley','sliver':0,'state':1,'color':'#iC9BE62'},
{'id':19,'name':'San Gabriel','sliver':0,'state':1,'color':'#966F33'},
{'id':20,'name':'Santa Maria Rift','sliver':0,'state':1,'color':'#C36241'},
{'id':21,'name':'San Gabriel','sliver':1,'state':1,'color':'#CC6600'},
{'id':22,'name':'Gulf Rifted Margin','sliver':0,'state':1,'color':'#48CCDD'},
{'id':23,'name':'Western Transverse Ranges','sliver':0,'state':1,'color':'#437C17'},
{'id':24,'name':'Santa Maria Rift','sliver':1,'state':1,'color':'#008080'},
{'id':25,'name':'Inner Borderland Rift','sliver':0,'state':1,'color':'#3EA99F'},
{'id':26,'name':'Western Transverse Ranges','sliver':1,'state':1,'color':'#347C2C'},
{'id':27,'name':'Nicolas Terrane','sliver':0,'state':1,'color':'#FF00FF'},
{'id':28,'name':'Rift Axis 2','sliver':0,'state':1,'color':'#617C58'},
{'id':29,'name':'San Francisco Bay','sliver':0,'state':1,'color':'#4EE2EC'},
{'id':30,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#667C26'},
{'id':31,'name':'Rift Axis 1','sliver':0,'state':1,'color':'#99C68E'},
{'id':32,'name':'Peninsular Range(E)','sliver':1,'state':1,'color':'#41A317'},
{'id':33,'name':'Rift Axis 3','sliver':0,'state':1,'color':'#7F5217'},
{'id':34,'name':'Accretionary Prism(S)','sliver':0,'state':1,'color':'#C04000'},
{'id':35,'name':'Accretionary Prism(N)','sliver':0,'state':1,'color':'#7D0552'},
{'id':36,'name':'Oceanic Crust','sliver':0,'state':1,'color':'#6698FF'},
{'id':37,'name':'San Gabriel','sliver':1,'state':1,'color':'#FFA500'},
{'id':38,'name':'San Gabriel','sliver':1,'state':1,'color':'#FF8040'},
{'id':39,'name':'San Gabriel','sliver':1,'state':1,'color':'#306754'},
{'id':40,'name':'San Gabriel','sliver':1,'state':1,'color':'#6AA121'},
{'id':41,'name':'Above Ground','sliver':0,'state':1,'color':'#ADD8E6'} 
],
"units": [
{'id':'X','units':'decimal degree'},
{'id':'Y','units':'decimal degree'},
{'id':'Z','units':'meters below surface/relative to sealevel'},
{'id':'utmX','units':'NA'},
{'id':'utmY','units':'NA'},
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
{'id':'rho','units':'meters/sec'},
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


function getUnitsWithLabel(label,val) {
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
