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

var MAX_CHUNKS_TO_DISPLAY=1;
function getMaterialPropertyByLatlonList(ulabel,dataarray,current_chunk, total_chunks, chunk_step) {

    window.console.log("----- ulabel is ", ulabel);
    if(current_chunk == total_chunks) 
        return;
    var cnt=dataarray.length;
    // start and last data
    var start_idx=current_chunk * chunk_step;
    var end_idx=current_chunk * chunk_step + chunk_step;
    if(end_idx > cnt)
        end_idx=cnt;

    var i;
    var dataset=[];
    for( i=start_idx; i<end_idx; i++) {
// collect up the string
        dataset.push(dataarray[i]);
    }
    var datastr=dataset.toString();

    var skip=0; // skip the transfer of the result
    if( current_chunk >= MAX_CHUNKS_TO_DISPLAY)
      skip=1;

    _getMaterialPropertyByLatlonChunk(skip,ulabel,datastr, dataarray, current_chunk, total_chunks,chunk_step);
           
}

// to be called by getMaterialPropertyByLatlonList
// this is to process the data file that were created in earlier call and
// selective extract values to be brought back to be plotted.
function getValuesFromJsonBlob(plotID,ulabel,xstr, ystr, zstr, targetstr) {

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
//            $('#plotIfram').attr('src', "viz.html?ulabel="+ulabel);
            plotMaterialProperty(plotID,str);
        }
    }
    xmlhttp.open("GET","php/gfm/getValuesFromJsonBlob.php?ulabel="+ulabel+"&xheader="+xstr+"&yheader="+ystr+"&zheader="+zstr+"&target="+targetstr, true);
    xmlhttp.send();
}



// to be called by getMaterialPropertyByLatlonList
function _getMaterialPropertyByLatlonChunk(skip,ulabel,datastr, dataarray, current_chunk, total_chunks, chunk_step) {
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
/* don't put the data in the table since it is from a file
               makeMPTable_chunk(ulabel,str);
*/
               getMaterialPropertyByLatlonList(ulabel,dataarray, current_chunk+1, total_chunks, chunk_step);
            } else {
// try to limit the size of the table..
/*
               if( current_chunk < MAX_CHUNKS_TO_DISPLAY) {
                   makeMPTable_chunk(ulabel,str);
               } 
*/
               getMaterialPropertyByLatlonList(ulabel, dataarray, current_chunk+1, total_chunks, chunk_step);
            }
            if(current_chunk==(total_chunks-1)) { // last one
               document.getElementById('spinIconForListProperty').style.display = "none";
//XXX create a download link to the actual data file
              var zstr=getGFMZModeNameWithType(zmodestr);
              var mstr="CVM-H 15.1";
              var uname="GFM_"+ulabel;
              var mpname=uname+".json";
              var note="Material Property with "+mstr + " search by "+zstr;
              insertResultTable(note, uname, {"materialproperty":mpname});
/* XXX
              if( dataarray.length < MAX_FILEPOINTS) {
                reset_point_UID();
                toggle_a_layergroup(ulabel);
              }
***/

              set_ULABEL(ulabel);

            }
       }
    }
    xmlhttp.open("GET","php/gfm/getMaterialPropertyByLatlonChunk.php?datastr="+datastr+"&zmode="+zmodestr+"&chunkid="+current_chunk+"&ulabel="+ulabel+"&chunks="+total_chunks+"&skip="+skip, true);
    xmlhttp.send();
}


// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon(ulabel) {
    var latstr=document.getElementById("LatTxt").value;
    var lonstr=document.getElementById("LonTxt").value;
    var zstr=document.getElementById("ZTxt").value;
    var zmodestr=document.getElementById("ZmodeTxt").value;

    if (latstr == "" || lonstr=="") {
        return;
    } else {

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
                document.getElementById("searchResult").innerHTML = makeMPTable(ulabel,str);
            }
        }
        xmlhttp.open("GET","php/gfm/getMaterialPropertyByLatlon.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr, true);
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
