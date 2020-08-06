/***

   gfm_rock_util.c

***/

function makeRockTypeInfoTable() {
   var tb=GFM_rock_tb['lithos'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border-top:1px solid white;border-left:1px solid white;border-right:1px solid white;\">GFM Lithology Type Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-info-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:15vw\">Name</th><th style=\"width:60vw;\" colspan=6>Composition in percentage (%)</th></tr>";
   tbhtml=tbhtml+"<tr><th style=\"width:15vw\">&nbsp</th><th style=\"width:8vw;\">Quartz</th><th style=\"width:8vw;\">Feldspar</th><th style=\"width:8vw;\">Mica</th><th style=\"width:8vw;\">Pyroxene</th><th style=\"width:8vw;\">Amphibole</th><th style=\"width:8vw;\">Olilvine</th></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var name=item['name'];
     var quartz=item['Quartz'];
     var feldspar=item['Feldspar'];
     var mica=item['Mica'];
     var pyroxene=item['Pyroxene'];
     var amphibole=item['Amphibole'];
     var olilvine=item['Olilvine'];
     var t="<tr><td style=\"width:15vw\">"+name+"</td><td style=\"width:8vw\">"+quartz+"</td><td style=\"width:8vw\">"+feldspar+"</td><td style=\"width:8vw\">"+mica+"</td><td style=\"width:8vw\">"+pyroxene+"</td><td style=\"width:8vw\">"+amphibole+"</td><td style=\"width:8vw\">"+olilvine+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


function fillinRockName(jblob, regionid, depth) {
   var tb=GFM_rock_tb["regions"];
   var cnt=tb.length;
   for(var i=0; i<cnt; i++) {
      var item=tb[i];
      var idlist=item['domain_id'];
      if(idlist.includes(regionid)) {
//         window.console.log("the point is in ",item["name"]);
         var rocklist=item["rock"];
         var rcnt=rocklist.length;
         if(rcnt == 0)
           return "NA";
         for(var j=0; j<rcnt; j++) {
           var rockitem=rocklist[j];
           var start=rockitem['start'];
           var end=rockitem['end'];
           var rockname=rockitem["type"];
           var rockid=rockitem["rock_id"];
           // depth is in meter, start and end is in km
           var kdepth=depth/1000;
           if(kdepth >= start && kdepth <= end) {
//              window.console.log("found the loc...",rockname);
              jblob['rock']=rockname;
              jblob['rock_id']=rockid;
              return;
           }
         }
         jblob['rock']="NA";
         jblob['rock_id']="NA";
         return;
      }
   }
   jblob['rock']="NA";
   jblob['rock_id']="NA";
   return;
}

function makeLithoInfoTable() {
   var tb=GFM_rock_tb["regions"];
   var cnt=tb.length;
   for(var i=0; i<cnt; i++) {
      var item=tb[i];
   }
   return;

}
