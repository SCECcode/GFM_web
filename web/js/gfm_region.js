/****

  gfm_region.js

****/

var GFM_tb={
"regions": [
{'id':1,'name':'Asthenosphere','sliver':0,'state':1},
{'id':2,'name':'Upper Mantle','sliver':0,'state':1},
{'id':3,'name':'Sierra Nevada(E)','sliver':0,'state':1},
{'id':4,'name':'Colorado Plateau','sliver':0,'state':1},
{'id':5,'name':'Sierra Nevada(W)','sliver':0,'state':1},
{'id':6,'name':'Peninsular Range(W)','sliver':'0','state':1},
{'id':7,'name':'Basin and Range','sliver':0,'state':1},
{'id':8,'name':'Peninsular Range(W)','sliver':1,'state':1},
{'id':9,'name':'Southern Walker Lane','sliver':0,'state':1},
{'id':10,'name':'Peninsular Range(E)','sliver':0,'state':1},
{'id':11,'name':'Gulf Rifted Margin','sliver':1,'state':1},
{'id':12,'name':'San Gabriel','sliver':1,'state':1},
{'id':13,'name':'Mojavia','sliver':0,'state':1},
{'id':14,'name':'San Gabriel','sliver':1,'state':1},
{'id':15,'name':'San Gabriel','sliver':1,'state':1},
{'id':16,'name':'Salinia','sliver':0,'state':1},
{'id':17,'name':'San Gabriel','sliver':1,'state':1},
{'id':18,'name':'Great Valley','sliver':0,'state':1},
{'id':19,'name':'San Gabriel','sliver':0,'state':1},
{'id':20,'name':'Santa Maria Rift','sliver':0,'state':1},
{'id':21,'name':'San Gabriel','sliver':1,'state':1},
{'id':22,'name':'Gulf Rifted Margin','sliver':0,'state':1},
{'id':23,'name':'Western Transverse Ranges','sliver':0,'state':1},
{'id':24,'name':'Santa Maria Rift','sliver':1,'state':1},
{'id':25,'name':'Inner Borderland Rift','sliver':0,'state':1},
{'id':26,'name':'Western Transverse Ranges','sliver':1,'state':1},
{'id':27,'name':'Nicolas Terrane','sliver':0,'state':1},
{'id':28,'name':'Rift Axis 2','sliver':0,'state':1},
{'id':29,'name':'San Francisco Bay','sliver':0,'state':1},
{'id':30,'name':'Peninsular Range(E)','sliver':1,'state':1},
{'id':31,'name':'Rift Axis 1','sliver':0,'state':1},
{'id':32,'name':'Peninsular Range(E)','sliver':1,'state':1},
{'id':33,'name':'Rift Axis 3','sliver':0,'state':1},
{'id':34,'name':'Accretionary Prism(S)','sliver':0,'state':1},
{'id':35,'name':'Accretionary Prism(N)','sliver':0,'state':1},
{'id':36,'name':'Oceanic Crust','sliver':0,'state':1},
{'id':37,'name':'San Gabriel','sliver':1,'state':1},
{'id':38,'name':'San Gabriel','sliver':1,'state':1},
{'id':39,'name':'San Gabriel','sliver':1,'state':1},
{'id':40,'name':'San Gabriel','sliver':1,'state':1},
{'id':41,'name':'Above Ground','sliver':0,'state':1} 
] };


function getRegionNameWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        return region['name'];
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


