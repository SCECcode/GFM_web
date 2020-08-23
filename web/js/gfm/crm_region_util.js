/****
  
  crm_region_util.js

****/
function getCRMgid(target_gfm_id) {
   var tb=CRM_tb['regions'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var gfm_id=item['gfm_id'];
     var gid=item['domain_id'];
     if(gfm_id == target_gfm_id) {
       return gid;
     }
  }
//  window.console.log("ERROR, getCRMgid, no such gfm_id found ",target_gfm_id);
  return 0;
}

function getGFMgid(target_crm_id) {
   var tb=CRM_tb['regions'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var gfm_id=item['gfm_id'];
     var gid=item['domain_id'];
     if(gid == target_crm_id) {
       return gfm_id;
     }
  }
//  window.console.log("ERROR, getGFMgid, no such crm_id found ",target_crm_id);
  return 0;
}

