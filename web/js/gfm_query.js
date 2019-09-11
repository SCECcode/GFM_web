/***
   gfm_query.js

***/
var hold_htmlstr="";
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

    _getMaterialPropertyByLatlonChunk(ulabel,datastr, dataarray, current_chunk, total_chunks,chunk_step);
           
}

// to be called by getMaterialPropertyByLatlonList
function _getMaterialPropertyByLatlonChunk(ulabel,datastr, dataarray, current_chunk, total_chunks, chunk_step) {
    if(current_chunk == 0)
        clearSearchResult();
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
               htmlstr = makeHorizontalResultTable_start(str);
               hold_htmlstr=hold_htmlstr+htmlstr;
               getMaterialPropertyByLatlonList(ulabel,dataarray, current_chunk+1, total_chunks, chunk_step);
            } else {
// try to limit the size of the table..
               if( current_chunk < MAX_CHUNKS_TO_DISPLAY) {
                   htmlstr = makeHorizontalResultTable_next(str);
                   hold_htmlstr=hold_htmlstr+htmlstr;
               }
               getMaterialPropertyByLatlonList(ulabel,dataarray, current_chunk+1, total_chunks, chunk_step);
            }
            if(current_chunk==(total_chunks-1)) { // last one
               htmlstr=makeHorizontalResultTable_last();
               hold_htmlstr=hold_htmlstr+htmlstr;
               document.getElementById("searchResult").innerHTML = hold_htmlstr;
               document.getElementById('spinIconForListProperty').style.display = "none";
// XXX create a download link to the actual data file
               document.getElementById('resultForMPQuery').innerHTML=linkDownload("GFM_"+ulabel+".json");
               setup_tables();
            }
       }
    }
    xmlhttp.open("GET","php/getMaterialPropertyByLatlonChunk.php?datastr="+datastr+"&zmode="+zmodestr+"&chunkid="+current_chunk+"&ulabel="+ulabel+"&chunks="+total_chunks, true);
    xmlhttp.send();
}


// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon() {
    clearSearchResult();
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
                var str=processSearchResult("getMaterialPropertyByLatlon");
                document.getElementById("searchResult").innerHTML = makeHorizontalResultTable(str);
                document.getElementById('spinIconForQuery').style.display = "none";
                // display static tables
                setup_tables();
            }
        }
        xmlhttp.open("GET","php/getMaterialPropertyByLatlon.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr, true);
        xmlhttp.send();
    }
}

function getCannedMaterialProperty() {
    clearSearchResult();
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
    xmlhttp.open("GET","php/getMaterialPropertyByCan.php",true);
    xmlhttp.send();
}

