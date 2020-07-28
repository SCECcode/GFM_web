/****

  gfm_region.js

****/
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

// create a table with all gfm regions  GFM_tb['regions']
function makeRegionResultTable()
{
    var regions=GFM_tb['regions'];

    var table=document.getElementById("gfmTable");
    var row;

    var cnt=0;
    var sz=regions.length;
    for( var i=0; i< sz; i++) {
       var s=regions[i];
       var name=s['name'];
       var gid=s['domain_id'];
       var ts=s['ts_files'];
       var sliver=s['sliver'];
       if(sliver == 0 ) {
         var t;
       /* if there is a ts file, then make it selectable */
         if(ts == undefined) {
            window.console.log("did not set ts.length for ", name);
         }
         if(ts.length > 0) {
t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm gfm-small-btn\" id=\"button_id2id_"+gid+"\" title=\"highlight the region\" onclick=toggle_id2id_highlight("+gid+")><span id=\"highlight_id2id_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button><td><label for=\"button_id2id_"+gid+"\">" + name + "</label></td></tr>";
         } else  {
t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm gfm-small-fix-btn\" id=\"button_id2id_"+gid+"\" title=\"unselectable region\"><span id=\"highlight_id2id_"+gid+"\" class=\"glyphicon glyphicon-remove-sign\"></span></button><td><label for=\"button_id2id_"+gid+"\">" + name + "</label></td></tr>";
         }

         row=table.insertRow();
         row.innerHTML=t;
         cnt++;
       }
    }

    if (visibleRegions.getBounds().isValid()) {
        viewermap.fitBounds(visibleRegions.getBounds());
    }
    window.console.log("GFM regions from table  ==>",cnt);
}

function makeTSList(activelist) {
    var rlist=GFM_tb['regions'];
    var rcnt=rlist.length;
    var tslist=[];
    var cnt=activelist.length;
    for(var i=0; i<rcnt; i++) {
      var item=rlist[i]; 
      var gid=item['domain_id'];
      if(activelist.includes(gid)) {
         var ts=item['ts_files'];
         var nlist=tslist.concat(ts);
         tslist=nlist;
      }
    }
    return tslist;
}

function makeFileFormatTable() {
   var tb=GFM_tb['fileformats'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">File Format Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:18vw\"><b>Format</b></td><td style=\"width:4vw\"><b>suffix</b></td><td style=\"width:40vw\"><b>Description</b></td></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var fname=item['format name'];
     var suffix=item['suffix'];
     var descript=item['description'];
     var t="<tr><td style=\"width:18vw\">"+fname+"</td><td style=\"width:4vw\">"+suffix+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
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
     var id=item['domain_id']
     var name=item['name'];
     var sliver=item['sliver'];
     var t="<tr><td style=\"width:5vw\">"+id+"</td><td style=\"width:30vw\">"+name+"</td><td style=\"width:8vw\">"+sliver+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function getZModeNameWithType(z)
{
   var tb=GFM_tb['zmodes'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     if(item['value'] == z) 
       return item['mode name']; 
   }
   return "UNKNOWN";
}

function makeZModeTable() {
   var tb=GFM_tb['zmodes'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">Z Mode Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
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
      if(region['domain_id'] == id) {
        var n= region['name'];
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
      if(region['domain_id'] == id) {
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
      if(region['domain_id'] == id) 
        return region['color'];
   }
   return undefined;
}

function getRegionIDWithName(n) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      var nn=region['name'];
      if( nn.replace(/\s+/g, '') == n.replace(/\s+/g, ''))
        return region['domain_id'];
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
      if(region['domain_id'] == id) 
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
      if(region['domain_id'] == id) 
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