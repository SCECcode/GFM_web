/***
   gfm_query.js

***/
//
// get a data array
//    [[lat1,lon1,z1],...,[latn,lonn,zn]]
// compose a json structure:
//    { "1": { "lat":latval1,"lon":lonval1; "z":z1 },
//     ...,
//      "n": { "lat":latvaln,"lon":lonvaln; "z":zn } }
// get the material properties of the latlon locations
//

function _getSubset(inarray,current_chunk, total_chunks, chunk_step) {

    if(current_chunk == total_chunks) 
        return "";
    var cnt=inarray.length;
    // start and last data
    var start_idx=current_chunk * chunk_step;
    var end_idx=current_chunk * chunk_step + chunk_step;
    if(end_idx > cnt)
        end_idx=cnt;

    var i;
    var dataset=[];
    for( i=start_idx; i<end_idx; i++) {
// collect up the string
        dataset.push(inarray[i]);
    }
    return dataset.toString();
}

function getMaterialPropertyByFileList(uid,filearray,current_chunk, total_chunks, chunk_step) {

    var datastr=_getSubset(filearray,current_chunk, total_chunks, chunk_step);

    if(datastr != "") {
      _getMaterialPropertyByFileChunk(uid,datastr, filearray, current_chunk, total_chunks,chunk_step);
    }       
}

function getMaterialPropertyByLatlonList(uid,dataarray,current_chunk, total_chunks, chunk_step) {

    var datastr=_getSubset(dataarray,current_chunk, total_chunks, chunk_step);

    if(datastr != "") {
      _getMaterialPropertyByLatlonChunk(uid,datastr, dataarray, current_chunk, total_chunks,chunk_step);
           
    }
}

// to be called by getMaterialPropertyByLatlonList
// this is to process the data file that were created in earlier call and
// selective extract values to be brought back to be plotted.
function getValuesFromJsonBlob(plotID,uid,xstr, ystr, zstr, targetstr) {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("getValuesFromJsonBlob");
// XXX need to trigger a download then do the processing
//            window.console.log("set the src on iframe..first");
//            $('#plotIfram').attr('src', "viz.html?uid="+uid);
            plotMaterialProperty(plotID,str);
        }
    }
    xmlhttp.open("GET","php/gfm/getValuesFromJsonBlob.php?uid="+uid+"&xheader="+xstr+"&yheader="+ystr+"&zheader="+zstr+"&target="+targetstr, true);
    xmlhttp.send();
}



// to be called by getMaterialPropertyByLatlonList
function _getMaterialPropertyByLatlonChunk(uid,datastr, dataarray, current_chunk, total_chunks, chunk_step) {
    // extract content of a file
    var zmodestr=document.getElementById("ZmodeTxt").value;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("getMaterialPropertyByLatlonChunk");
           
            if(current_chunk==0) { // first one
//               makeMPResult_chunk(uid,current_chunk,str,true);
               getMaterialPropertyByLatlonList(uid,dataarray, current_chunk+1, total_chunks, chunk_step);
            } else {
//               makeMPResult_chunk(uid,current_chunk, str,false);
               getMaterialPropertyByLatlonList(uid, dataarray, current_chunk+1, total_chunks, chunk_step);
            }
            if(current_chunk==(total_chunks-1)) { // last one
               document.getElementById('spinIconForListProperty').style.display = "none";
               var zstr=getZModeNameWithType(zmodestr);
               var mstr="CVM-H 15.1";
               var uname="GFM_"+uid;
               var mpname=uname+".csv";
               var note="Material Property with "+mstr + " search by "+zstr;
               insertResultTable(note, uname, {"materialproperty":mpname});
 
               set_ULABEL(uid);
               reset_point_UID();
            }
       }
    }
    xmlhttp.open("GET","php/gfm/getMaterialPropertyByLatlonChunk.php?datastr="+datastr+"&zmode="+zmodestr+"&chunkid="+current_chunk+"&uid="+uid+"&chunks="+total_chunks, true);
    xmlhttp.send();
}


// to be called by getMaterialPropertyByLatlonList
function _getMaterialPropertyByFileChunk(uid,datastr,dataarray, current_chunk, total_chunks, chunk_step) {
    // extract content of a file
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("getMaterialPropertyByFiles");
           
            if(current_chunk==0) { // first one
               makeMPResult_chunk(uid,current_chunk,str,true);
               getMaterialPropertyByFileList(uid,dataarray, current_chunk+1, total_chunks, chunk_step);
            } else {
               makeMPResult_chunk(uid,current_chunk, str,false);
               getMaterialPropertyByFileList(uid, dataarray, current_chunk+1, total_chunks, chunk_step);
            }
            if(current_chunk==(total_chunks-1)) { // last one
               document.getElementById('spinIconForDownloadMPTable').style.display = "none";
            }
       }
    }
    xmlhttp.open("GET","php/gfm/getMaterialPropertyByFiles.php?uidlist="+datastr, true);
    xmlhttp.send();
}


// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon() {
    var latstr=document.getElementById("LatTxt").value;
    var lonstr=document.getElementById("LonTxt").value;
    var zstr=document.getElementById("ZTxt").value;
    var zmodestr=document.getElementById("ZmodeTxt").value;
    var uid=document.getElementById("UIDTxt").value;

    if (latstr == "" || lonstr=="") {
        reset_point_UID();
        return;
    } else {
        if(uid == '') {
          uid=getRnd();
          window.console.log("making uid -- ",uid);
          set_point_UID(uid);
          // must be coming from the sidebar and so need to plot on map..
          add_bounding_point(uid,latstr,lonstr);
        } else {
          reset_dirty_uid();
        }

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                document.getElementById('spinIconForQuery').style.display ="none";
                var str=processSearchResult("getMaterialPropertyByLatlon");
                makeMPTable(uid,str);
                reset_point_UID();
            }
        }
        xmlhttp.open("GET","php/gfm/getMaterialPropertyByLatlon.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr+"&uid="+uid, true);
        xmlhttp.send();
    }
}

function getCannedMaterialProperty() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("getCanMaterialProperty");
            document.getElementById('spinIconForRegion').style.display = "none";
        }
    }
    xmlhttp.open("GET","php/gfm/getMaterialPropertyByCan.php",true);
    xmlhttp.send();
}

