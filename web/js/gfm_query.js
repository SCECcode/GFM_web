/***
   gfm_query.js

***/

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
                document.getElementById('spinIconForProperty').style.display = "none";
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

