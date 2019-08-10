/***
   gfm_query.js

***/

// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon() {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var firstzstr=document.getElementById("firstZTxt").value;
    var firstzmodestr=document.getElementById("firstZmodeTxt").value;

window.console.log("firstlatstr %s\n", firstlatstr);
window.console.log("firstlonstr %s\n", firstlonstr);
window.console.log("firstzstr %s\n", firstzstr);
window.console.log("firstzmodestr %s\n", firstzmodestr);

    if (firstlatstr == "" || firstlonstr=="") {
        document.getElementById("searchResult").innerHTML = "";
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
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        }
        xmlhttp.open("GET","php/getMaterialPropertyByLatlon.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&firstz="+firstzstr+"&firstzmode="+firstzmodestr,true);
        xmlhttp.send();
    }
}

function getCannedMaterialProperty() {
    clearResultTable();
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
//            document.getElementById("searchResult").innerHTML = makeResultTable(str);
        }
    }
    xmlhttp.open("GET","php/getMaterialPropertyByCan.php",true);
    xmlhttp.send();
}