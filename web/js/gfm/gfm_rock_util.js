/***

   gfm_rock_util.c

***/

function fillinRockName(jblob, regionid, depth) {
   var tb=GFM_rock_tb["regions"];
   var cnt=tb.length;
   for(var i=0; i<cnt; i++) {
      var item=tb[i];
      var idlist=item['domain_id'];
      if(idlist.includes(regionid)) {
         window.console.log("the point is in ",item["name"]);
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
              window.console.log("found the loc...",rockname);
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

